import * as React from 'react'

import { cn } from '@/lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement>

const NumberList = ({ className, children, ...props }: DivProps) => (
  <div
    className={cn(
      'rounded-full bg-primary/80 w-5 h-5 flex justify-center items-center',
      className
    )}
    {...props}
  >
    <p className="text-background text-xs">{children}</p>
  </div>
)

export { NumberList }
