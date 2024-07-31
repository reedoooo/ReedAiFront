import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from 'utils/index';

const labelVariants = className => {
  const baseClass =
    'text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
  return [baseClass, className].filter(Boolean).join(' ');
};

const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(className))}
      {...rest}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
