import React, { memo } from '../../lib/teact/teact';
import { getActions } from '../../global';
import convertPunycode from '../../lib/punycode';

import type { FC } from '../../lib/teact/teact';
import { ApiMessageEntityTypes } from '../../api/types';

import {
  DEBUG,
} from '../../config';
import buildClassName from '../../util/buildClassName';
import { ensureProtocol } from '../../util/ensureProtocol';
import useLastCallback from '../../hooks/useLastCallback';
import { handleSendLink } from '../../util/tlCustomFunction';

type OwnProps = {
  url?: string;
  text: string;
  className?: string;
  children?: React.ReactNode;
  isRtl?: boolean;
};

const SafeLink: FC<OwnProps> = ({
  url,
  text,
  className,
  children,
  isRtl,
}) => {
  const { openUrl } = getActions();

  const content = children || text;
  const isSafe = url === text;

  const handleClick = useLastCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!url) return true;

    e.preventDefault();
    openUrl({ url, shouldSkipModal: isSafe });

    if (isSafe) {
      const urlDomain = getDomain(url);
      if (!url.includes('http') && urlDomain) {
        handleSendLink(urlDomain);
      } else {
        handleSendLink(url);
      }
    }

    return false;
  });

  if (!url) {
    return undefined;
  }

  const classNames = buildClassName(
    className || 'text-entity-link',
    text.length > 50 && 'long-word-break-all',
  );

  return (
    <a
      href={ensureProtocol(url)}
      title={getDomain(url)}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames}
      onClick={handleClick}
      dir={isRtl ? 'rtl' : 'auto'}
      data-entity-type={ApiMessageEntityTypes.Url}
    >
      {content}
    </a>
  );
};

function getDomain(url?: string) {
  if (!url) {
    return undefined;
  }

  const href = ensureProtocol(url);
  if (!href) {
    return undefined;
  }

  try {
    let decodedHref = decodeURI(href.replace(/%%/g, '%25'));

    const match = decodedHref.match(/^https?:\/\/([^/:?#]+)(?:[/:?#]|$)/i);
    if (!match) {
      return undefined;
    }
    const domain = match[1];
    decodedHref = decodedHref.replace(domain, convertPunycode(domain));

    return decodedHref;
  } catch (error) {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.error('SafeLink.getDecodedUrl error ', url, error);
    }
  }

  return undefined;
}

export default memo(SafeLink);
