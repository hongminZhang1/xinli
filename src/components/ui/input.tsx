import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "modern-input w-full transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "modern-input",
        large: "large-input",
        ghost: "bg-transparent border-none focus:ring-0 focus:border-transparent px-0",
        underline: "bg-transparent border-0 border-b border-border/40 rounded-none px-0 focus:border-primary focus:ring-0",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1 text-xs rounded-lg",
        lg: "h-12 px-4 py-3 text-base rounded-xl",
        xl: "h-14 px-6 py-4 text-lg rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  isLoading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", startIcon, endIcon, isLoading, ...props }, ref) => {
    if (startIcon || endIcon || isLoading) {
      return (
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              startIcon && "pl-10",
              (endIcon || isLoading) && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {(endIcon || isLoading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                endIcon
              )}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// 搜索输入框组件
export interface SearchInputProps extends Omit<InputProps, 'startIcon' | 'type'> {
  onSearch?: (value: string) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, placeholder = "搜索...", ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value)
      }
    }

    return (
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        startIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        className={className}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

// 文本域组件
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = true, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "modern-input w-full min-h-[80px] resize-y transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50",
          !resize && "resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Input, SearchInput, Textarea, inputVariants }