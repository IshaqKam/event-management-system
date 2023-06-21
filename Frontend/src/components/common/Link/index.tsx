import NextLink from 'next/link';
import {
  memo,
  forwardRef,
  ForwardedRef,
  HTMLAttributeAnchorTarget,
} from 'react';

type Props = {
  as?: string;
  href: string;
  text?: string;
  shallow?: boolean;
  replace?: boolean;
  className?: string;
  children?: JSX.Element;
  target?: HTMLAttributeAnchorTarget;
};

function LinkComponent(
  {
    as,
    href,
    text,
    target,
    replace,
    shallow,
    children,
    className = 'text-blue-800 font-semibold',
  }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <span className={className}>
      <NextLink
        as={as}
        passHref
        ref={ref}
        target={target}
        href={href}
        shallow={shallow}
        replace={replace}
        className={className}
      >
        {children ?? text}
      </NextLink>
    </span>
  );
}

export default memo(forwardRef(LinkComponent));
