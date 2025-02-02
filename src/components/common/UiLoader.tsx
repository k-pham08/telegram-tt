import React, { useEffect } from '../../lib/teact/teact';
import { getActions, getGlobal, withGlobal } from '../../global';

import { ApiMediaFormat } from '../../api/types';
import type { TabState } from '../../global/types';
import type { FC } from '../../lib/teact/teact';

import { getChatAvatarHash } from '../../global/helpers/chats'; // Direct import for better module splitting
import { selectIsRightColumnShown, selectTabState } from '../../global/selectors';
import { pause } from '../../util/schedulers';
import { preloadImage } from '../../util/files';
import preloadFonts from '../../util/fonts';
import * as mediaLoader from '../../util/mediaLoader';
import { Bundles, loadModule } from '../../util/moduleLoader';
import buildClassName from '../../util/buildClassName';

import useFlag from '../../hooks/useFlag';
import useShowTransition from '../../hooks/useShowTransition';
import useEffectOnce from '../../hooks/useEffectOnce';

import styles from './UiLoader.module.scss';
import appStyles from '../App.module.scss';

// Workaround for incorrect bundling by Webpack: force including in the main chunk
import '../ui/Modal.scss';
import './Avatar.scss';

import telegramLogoPath from '../../assets/telegram-logo.svg';
import lockPreviewPath from '../../assets/lock.png';
import monkeyPath from '../../assets/monkey.svg';
import spoilerMaskPath from '../../assets/spoilers/mask.svg';
import { sendScreenName } from '../../util/tlCustomFunction';

export type UiLoaderPage =
  'main'
  | 'lock'
  | 'inactive'
  | 'authCode'
  | 'authPassword'
  | 'authPhoneNumber'
  | 'authQrCode';

type OwnProps = {
  page?: UiLoaderPage;
  children: React.ReactNode;
  isMobile?: boolean;
};

type StateProps = Pick<TabState, 'uiReadyState' | 'shouldSkipHistoryAnimations'> & {
  isRightColumnShown?: boolean;
  leftColumnWidth?: number;
};

const MAX_PRELOAD_DELAY = 700;
const SECOND_STATE_DELAY = 1000;
const AVATARS_TO_PRELOAD = 10;

function preloadAvatars() {
  const { listIds, byId } = getGlobal().chats;
  if (!listIds.active) {
    return undefined;
  }

  return Promise.all(listIds.active.slice(0, AVATARS_TO_PRELOAD).map((chatId) => {
    const chat = byId[chatId];
    if (!chat) {
      return undefined;
    }

    const avatarHash = getChatAvatarHash(chat);
    if (!avatarHash) {
      return undefined;
    }

    return mediaLoader.fetch(avatarHash, ApiMediaFormat.BlobUrl);
  }));
}

const preloadTasks = {
  main: () => Promise.all([
    loadModule(Bundles.Main)
      .then(preloadFonts),
    preloadAvatars(),
    preloadImage(spoilerMaskPath),
  ]),
  authPhoneNumber: () => Promise.all([
    preloadFonts(),
    preloadImage(telegramLogoPath),
  ]),
  authCode: () => preloadImage(monkeyPath),
  authPassword: () => preloadImage(monkeyPath),
  authQrCode: preloadFonts,
  lock: () => Promise.all([
    preloadFonts(),
    preloadImage(lockPreviewPath),
  ]),
  inactive: () => {
  },
};

const UiLoader: FC<OwnProps & StateProps> = ({
  page,
  children,
  isRightColumnShown,
  shouldSkipHistoryAnimations,
  leftColumnWidth,
}) => {
  const { setIsUiReady } = getActions();

  const [isReady, markReady] = useFlag();
  const {
    shouldRender: shouldRenderMask, transitionClassNames,
  } = useShowTransition(!isReady, undefined, true);

  useEffect(() => {
    switch (page) {
      case 'authPhoneNumber':
        sendScreenName('tl_navigation_authPhoneNumberScreen');
        break;
      case 'authCode':
        sendScreenName('tl_navigation_authCodeScreen');
        break;
      case 'authPassword':
        sendScreenName('tl_navigation_authPasswordScreen');
        break;
      case 'authQrCode':
        sendScreenName('tl_navigation_authQrCodeScreen');
        break;
      default:
        break;
    }
  }, [page]);

  useEffectOnce(() => {
    let timeout: number | undefined;

    const safePreload = async () => {
      try {
        await preloadTasks[page!]();
      } catch (err) {
        // Do nothing
      }
    };

    Promise.race([
      pause(MAX_PRELOAD_DELAY),
      page ? safePreload() : Promise.resolve(),
    ]).then(() => {
      markReady();
      setIsUiReady({ uiReadyState: 1 });

      timeout = window.setTimeout(() => {
        setIsUiReady({ uiReadyState: 2 });
      }, SECOND_STATE_DELAY);
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      setIsUiReady({ uiReadyState: 0 });
    };
  });

  return (
    <>
      {children}
      {shouldRenderMask && !shouldSkipHistoryAnimations && Boolean(page) && (
        <div className={buildClassName(styles.mask, transitionClassNames)}>
          {page === 'main' ? (
            <div className={styles.main}>
              <div
                className={styles.left}
                style={leftColumnWidth ? `width: ${leftColumnWidth}px` : undefined}
              />
              <div className={buildClassName(styles.middle, appStyles.bg)} />
              {isRightColumnShown && <div className={styles.right} />}
            </div>
          ) : (page === 'inactive' || page === 'lock') ? (
            <div className={buildClassName(styles.blank, appStyles.bg)} />
          ) : (
            <div className={styles.blank} />
          )}
        </div>
      )}
    </>
  );
};

export default withGlobal<OwnProps>(
  (global, { isMobile }): StateProps => {
    const tabState = selectTabState(global);

    return {
      shouldSkipHistoryAnimations: tabState.shouldSkipHistoryAnimations,
      uiReadyState: tabState.uiReadyState,
      isRightColumnShown: selectIsRightColumnShown(global, isMobile),
      leftColumnWidth: global.leftColumnWidth,
    };
  },
)(UiLoader);
