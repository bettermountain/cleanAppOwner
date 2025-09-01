import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import './app-text-field.css'

type Size = 'sm' | 'md' | 'lg'
type LabelStyle = 'floating' | 'stacked' | 'none'
type Variant = 'outline' | 'soft' | 'underline'

type BaseProps = {
  label: string
  description?: string
  error?: string
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  requiredMark?: boolean
  size?: Size
  fullWidth?: boolean
  showCounter?: boolean
  labelStyle?: LabelStyle
  variant?: Variant
  status?: 'default' | 'error' | 'success'
  id?: string
  containerClassName?: string
  inputClassName?: string
  className?: string
  autoResize?: boolean // textarea only
}

type InputLikeProps = React.InputHTMLAttributes<HTMLInputElement> & {
  textarea?: false
}

type TextareaLikeProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true
}

export type AppTextFieldProps = BaseProps & (InputLikeProps | TextareaLikeProps)

export const AppTextField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AppTextFieldProps
>(function AppTextField(
  {
    label,
    description,
    error,
    placeholder,
    prefix,
    suffix,
    requiredMark,
    size = 'lg',
    fullWidth = true,
    showCounter = false,
    labelStyle = 'none',
    variant = 'outline',
    status = 'default',
    containerClassName,
    inputClassName,
    className,
    autoResize,
    textarea,
    id,
    ...rest
  },
  ref
) {
  const hasPrefix = Boolean(prefix)
  const hasSuffix = Boolean(suffix)

  const [length, setLength] = React.useState<number>(() => {
    const v = (rest as any)?.value ?? (rest as any)?.defaultValue
    return typeof v === 'string' ? v.length : 0
  })

  const [hasValue, setHasValue] = React.useState<boolean>(() => length > 0)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const len = e.target.value?.length ?? 0
    setLength(len)
    setHasValue(len > 0)
    ;(rest as any)?.onChange?.(e)
  }

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  React.useEffect(() => {
    if (textarea && autoResize && textareaRef.current) {
      const el = textareaRef.current
      const resize = () => {
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
      }
      resize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textarea, autoResize])

  React.useEffect(() => {
    // detect initial value for floating label
    const el = textarea ? textareaRef.current : inputRef.current
    if (el) setHasValue((el as HTMLInputElement).value?.length > 0)
  }, [textarea])

  const sizeClasses: Record<Size, string> = {
    sm: 'h-10 text-[14px]',
    md: 'h-11 text-[15px]',
    lg: 'h-12 text-[16px]',
  }

  const invalid = error || status === 'error'
  const success = status === 'success'
  const disabled = (rest as any)?.disabled ?? false
  const wrapperClass = cn('tf', `tf--${variant}`, fullWidth && 'w-full')

  // a11y ids
  const reactId = React.useId()
  const controlId = id ?? `tf-${reactId}`
  const errorId = `${controlId}-error`
  const descId = `${controlId}-desc`

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {labelStyle === 'stacked' && (
        <>
          <div className="flex items-baseline gap-1">
            <div className="text-sm font-medium text-foreground">
              {label}
              {requiredMark && <span className="ml-0.5 text-destructive">*</span>}
            </div>
          </div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </>
      )}
      <div
        className={wrapperClass}
        data-has-value={hasValue ? 'true' : 'false'}
        data-state={invalid ? 'error' : success ? 'success' : 'default'}
        data-disabled={disabled ? 'true' : 'false'}
        data-size={size}
        data-has-prefix={hasPrefix ? 'true' : 'false'}
        data-has-suffix={hasSuffix ? 'true' : 'false'}
        data-textarea={textarea ? 'true' : 'false'}
      >
        {hasPrefix && <span className="tf__prefix">{prefix}</span>}
        {textarea ? (
          <textarea
            ref={(node) => {
              textareaRef.current = node
              if (typeof ref === 'function') ref(node as any)
              else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
            }}
            placeholder={placeholder}
            onChange={handleChange}
            className={cn('tf__control', inputClassName, className)}
            id={controlId}
            aria-invalid={invalid || undefined}
            aria-describedby={
              error ? errorId : description && labelStyle !== 'stacked' ? descId : undefined
            }
            {...(rest as TextareaLikeProps)}
          />
        ) : (
          <Input
            ref={(node) => {
              inputRef.current = node
              if (typeof ref === 'function') ref(node as any)
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            placeholder={placeholder}
            onChange={handleChange as any}
            unstyled
            className={cn('tf__control', inputClassName, className)}
            id={controlId}
            aria-invalid={invalid || undefined}
            aria-describedby={
              error ? errorId : description && labelStyle !== 'stacked' ? descId : undefined
            }
            {...(rest as InputLikeProps)}
          />
        )}
        {hasSuffix && <span className="tf__suffix">{suffix}</span>}
        {labelStyle === 'floating' && (
          <label className="tf__label">
            {label}
            {requiredMark && <span style={{ color: 'var(--field-danger)' }}>*</span>}
          </label>
        )}
      </div>
      {labelStyle === 'stacked' && description && (
        <div id={descId} className="text-xs text-muted-foreground">{description}</div>
      )}
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
        {showCounter && (rest as any)?.maxLength && (
          <div className="tf__counter">
            {length}/{(rest as any).maxLength}
          </div>
        )}
      </div>
    </div>
  )
})

export default AppTextField
