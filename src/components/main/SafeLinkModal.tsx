import type { FC } from '../../lib/teact/teact';
import React, { memo, useCallback } from '../../lib/teact/teact';
import { getActions } from '../../global';

import { ensureProtocol } from '../../util/ensureProtocol';
import renderText from '../common/helpers/renderText';
import useLang from '../../hooks/useLang';
import useCurrentOrPrev from '../../hooks/useCurrentOrPrev';

import ConfirmDialog from '../ui/ConfirmDialog';
import { handleSendLink } from '../../util/tlCustomFunction';

export type OwnProps = {
  url?: string;
};

const SafeLinkModal: FC<OwnProps> = ({ url }) => {
  const { toggleSafeLinkModal } = getActions();

  const lang = useLang();

  const handleOpen = useCallback(() => {
    window.open(ensureProtocol(url), '_blank', 'noopener');
    toggleSafeLinkModal({ url: undefined });
    if (url) {
      handleSendLink(url);
    }
  }, [toggleSafeLinkModal, url]);

  const handleDismiss = useCallback(() => {
    toggleSafeLinkModal({ url: undefined });
  }, [toggleSafeLinkModal]);

  const renderingUrl = useCurrentOrPrev(url);

  return (
    <ConfirmDialog
      isOpen={Boolean(url)}
      onClose={handleDismiss}
      title={lang('OpenUrlTitle')}
      textParts={renderText(lang('OpenUrlAlert2', renderingUrl), ['links'])}
      confirmLabel={lang('OpenUrlTitle')}
      confirmHandler={handleOpen}
    />
  );
};

export default memo(SafeLinkModal);
