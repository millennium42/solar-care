import * as React from "react";

import { cn } from "@/modules/shared/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full resize-y rounded-md border border-[color:var(--line)] bg-white px-3 py-2 text-sm text-[color:var(--foreground)] shadow-sm transition placeholder:text-[color:var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
