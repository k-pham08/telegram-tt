import React, { memo, useEffect, useRef } from '../../lib/teact/teact';
import { getActions, getGlobal } from '../../global';

import type { FC } from '../../lib/teact/teact';
import type { LeftColumnContent, SettingsScreens } from '../../types';
import type { FolderEditDispatch } from '../../hooks/reducers/useFoldersReducer';
import type { GlobalState } from '../../global/types';

import buildClassName from '../../util/buildClassName';

import useLastCallback from '../../hooks/useLastCallback';
import useLang from '../../hooks/useLang';
import useHistoryBack from '../../hooks/useHistoryBack';
import useLeftHeaderButtonRtlForumTransition from './main/hooks/useLeftHeaderButtonRtlForumTransition';
import useShowTransition from '../../hooks/useShowTransition';
import useForumPanelRender from '../../hooks/useForumPanelRender';

import Button from '../ui/Button';
import ChatList from './main/ChatList';
import ForumPanel from './main/ForumPanel';
import DropdownMenu from '../ui/DropdownMenu';
import MenuItem from '../ui/MenuItem';

import './ArchivedChats.scss';
import { sendScreenName } from '../../util/tlCustomFunction';

export type OwnProps = {
  isActive: boolean;
  isForumPanelOpen?: boolean;
  archiveSettings: GlobalState['archiveSettings'];
  onReset: () => void;
  onTopicSearch: NoneToVoidFunction;
  onSettingsScreenSelect: (screen: SettingsScreens) => void;
  foldersDispatch: FolderEditDispatch;
  onLeftColumnContentChange: (content: LeftColumnContent) => void;
};

const ArchivedChats: FC<OwnProps> = ({
  isActive,
  isForumPanelOpen,
  archiveSettings,
  onReset,
  onTopicSearch,
  onSettingsScreenSelect,
  onLeftColumnContentChange,
  foldersDispatch,
}) => {
  const { updateArchiveSettings } = getActions();
  const lang = useLang();

  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  const handleDisplayArchiveInChats = useLastCallback(() => {
    updateArchiveSettings({ isHidden: false });
  });

  const {
    shouldDisableDropdownMenuTransitionRef,
    handleDropdownMenuTransitionEnd,
  } = useLeftHeaderButtonRtlForumTransition(isForumPanelOpen);

  const {
    shouldRender: shouldRenderTitle,
    transitionClassNames: titleClassNames,
  } = useShowTransition(!isForumPanelOpen);

  const {
    shouldRenderForumPanel, handleForumPanelAnimationEnd,
    handleForumPanelAnimationStart, isAnimationStarted,
  } = useForumPanelRender(isForumPanelOpen);
  const isForumPanelVisible = isForumPanelOpen && isAnimationStarted;

  const backHandler = () => {
    sendScreenName('tl_navigation_mainScreen');
    getGlobal().isArchivePrevious = false;
    onReset();
  };

  return (
    <div className="ArchivedChats">
      <div className="left-header">
        {lang.isRtl && <div className="DropdownMenuFiller" />}
        <Button
          round
          size="smaller"
          color="translucent"
          onClick={backHandler}
          ariaLabel="Return to chat list"
          className={buildClassName(
            lang.isRtl && 'rtl',
            isForumPanelVisible && lang.isRtl && 'right-aligned',
            shouldDisableDropdownMenuTransitionRef.current && lang.isRtl && 'disable-transition',
          )}
          onTransitionEnd={handleDropdownMenuTransitionEnd}
        >
          <i className="icon icon-arrow-left" />
        </Button>
        {shouldRenderTitle && <h3 className={titleClassNames}>{lang('ArchivedChats')}</h3>}
        {archiveSettings.isHidden && (
          <DropdownMenu
            className="archived-chats-more-menu"
            positionX="right"
            onTransitionEnd={lang.isRtl ? handleDropdownMenuTransitionEnd : undefined}
          >
            <MenuItem icon="archive-from-main" onClick={handleDisplayArchiveInChats}>
              {lang('lng_context_archive_to_list')}
            </MenuItem>
          </DropdownMenu>
        )}
      </div>
      <ChatList
        folderType="archived"
        isActive={isActive}
        isForumPanelOpen={isForumPanelVisible}
        onSettingsScreenSelect={onSettingsScreenSelect}
        onLeftColumnContentChange={onLeftColumnContentChange}
        foldersDispatch={foldersDispatch}
        archiveSettings={archiveSettings}
      />
      {shouldRenderForumPanel && (
        <ForumPanel
          isOpen={isForumPanelOpen}
          onTopicSearch={onTopicSearch}
          onOpenAnimationStart={handleForumPanelAnimationStart}
          onCloseAnimationEnd={handleForumPanelAnimationEnd}
        />
      )}
    </div>
  );
};

export default memo(ArchivedChats);
