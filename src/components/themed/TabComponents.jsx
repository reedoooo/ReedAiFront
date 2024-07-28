'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from 'utils/index';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
        className
      )}
      {...rest}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
        className
      )}
      {...rest}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    />
  );
});

TabsContent.displayName = TabsPrimitive.Content.displayName;

export default Tabs;
