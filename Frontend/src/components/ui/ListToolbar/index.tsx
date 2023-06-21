import { memo } from 'react';
import { AppButton } from 'components';
import Link from 'components/common/Link';

type Props = {
  url?: string;
  onPress?(): void;
  heading?: string;
  btnTitle?: string;
  placeholder?: string;
  showBtnTitle?: boolean;
};

function ListToolbar({
  url,
  onPress,
  heading,
  btnTitle,
  showBtnTitle = true,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between -m-1 flex-wrap">
        <h4 className="m-4 text-3xl font-bold">{heading}</h4>
        <div className="m-4">
          {showBtnTitle && url && (
            <Link href={url}>
              <AppButton title={btnTitle} sx={{ minWidth: '10rem' }} />
            </Link>
          )}
          {onPress && (
            <AppButton
              title={btnTitle}
              onClick={onPress}
              sx={{ minWidth: '10rem' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ListToolbar);
