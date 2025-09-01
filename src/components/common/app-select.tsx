import * as React from 'react'
import { cn } from '@/lib/utils'
import './app-text-field.css'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'outline' | 'soft' | 'underline'
type LabelStyle = 'none' | 'stacked' | 'floating'

type Option = { value: string; label: string; disabled?: boolean }

export type AppSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  label?: string
  description?: string
  error?: string
  size?: Size
  variant?: Variant
  labelStyle?: LabelStyle
  status?: 'default' | 'error' | 'success'
  fullWidth?: boolean
  options?: Option[]
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  containerClassName?: string
  inputClassName?: string
}

export const AppSelect = React.forwardRef<HTMLSelectElement, AppSelectProps>(
  function AppSelect(
    {
      label,
      description,
      error,
      size = 'lg',
      variant = 'outline',
      labelStyle = 'none',
      status = 'default',
      fullWidth = true,
      options,
      placeholder,
      prefix,
      suffix,
      containerClassName,
      inputClassName,
      className,
      id,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    const hasPrefix = Boolean(prefix)
    const reactId = React.useId()
    const controlId = id ?? `sel-${reactId}`
    const errorId = `${controlId}-error`
    const descId = `${controlId}-desc`

    const currentValue = (value ?? defaultValue ?? '') as string
    const hasValue = currentValue !== ''
    const invalid = Boolean(error) || status === 'error'
    const success = status === 'success'

    const wrapperClass = cn('tf', `tf--${variant}`, fullWidth && 'w-full')
    const showChevron = suffix === undefined

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {labelStyle === 'stacked' && label && (
          <>
            <div className="text-sm font-medium text-foreground">{label}</div>
            {description && (
              <div id={descId} className="text-xs text-muted-foreground">{description}</div>
            )}
          </>
        )}
        <div
          className={wrapperClass}
          data-state={invalid ? 'error' : success ? 'success' : 'default'}
          data-size={size}
          data-has-prefix={hasPrefix ? 'true' : 'false'}
          data-has-suffix={(showChevron || suffix) ? 'true' : 'false'}
        >
          {hasPrefix && <span className="tf__prefix">{prefix}</span>}
          <select
            ref={ref}
            id={controlId}
            value={value as any}
            defaultValue={defaultValue as any}
            aria-invalid={invalid || undefined}
            aria-describedby={error ? errorId : description && labelStyle !== 'stacked' ? descId : undefined}
            className={cn('tf__control tf__control--select', inputClassName, className)}
            {...rest}
          >
            {placeholder !== undefined && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))
              : rest.children}
          </select>
          {suffix}
          {showChevron && (
            <span className="tf__suffix" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>
        <div className="tf__row">
          {error ? (
            <div id={errorId} className="tf__error">{error}</div>
          ) : (
            labelStyle !== 'stacked' && description ? (
              <div id={descId} className="tf__desc">{description}</div>
            ) : (
              <span className="text-[11px] text-muted-foreground" />
            )
          )}
        </div>
      </div>
    )
  }
)

export default AppSelect

