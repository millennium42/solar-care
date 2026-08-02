import * as React from "react";

import { cn } from "@/modules/shared/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full rounded-md border border-[color:var(--line)] bg-white px-3 py-2 text-sm text-[color:var(--foreground)] shadow-sm transition placeholder:text-[color:var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
