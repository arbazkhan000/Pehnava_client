import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationPrevious = ({ className, disabled, ...props }) => (
    <button
        aria-label="Go to previous page"
        disabled={disabled}
        className={cn(
            buttonVariants({
                variant: disabled ? "ghost" : "outline",
                size: "default",
            }),
            "gap-1 pl-2.5",
            className,
            disabled && "opacity-50 cursor-not-allowed"
        )}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
    </button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, disabled, ...props }) => (
    <button
        aria-label="Go to next page"
        disabled={disabled}
        className={cn(
            buttonVariants({
                variant: disabled ? "ghost" : "outline",
                size: "default",
            }),
            "gap-1 pr-2.5",
            className,
            disabled && "opacity-50 cursor-not-allowed"
        )}
        {...props}
    >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
    </button>
);
PaginationNext.displayName = "PaginationNext";

export { Pagination, PaginationPrevious, PaginationNext };
