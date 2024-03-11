import React, { HTMLAttributes, forwardRef } from "react";
import { twMerge, ClassNameValue } from "tailwind-merge";

interface CardContainerProps {
  children: React.ReactNode;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  tabIndex?: HTMLAttributes<HTMLDivElement>['tabIndex'];
  className?: ClassNameValue;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

const CardContainer = forwardRef<HTMLDivElement, CardContainerProps>((
  {
    children,
    className,
    onFocus,
    onBlur,
    tabIndex,
    onMouseDown,
  },
  ref
) => {
  return (
    <div
      ref={ref}
      tabIndex={tabIndex}
      onMouseDown={onMouseDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={twMerge(
        "p-4 bg-403-btn-gradient-hover rounded-2xl bg-opacity-15 shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
});

CardContainer.displayName = 'CardContaienr'

export default CardContainer;
