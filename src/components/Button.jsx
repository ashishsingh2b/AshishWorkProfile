import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  download,
  target,
  rel,
  className = '',
  icon: Icon,
  iconClassName = '',
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2 shadow-sm',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-md',
  };

  const variantStyles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-brand-600/20 hover:shadow-brand-600/30 hover:-translate-y-0.5',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-850 hover:-translate-y-0.5',
    brandOutline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:-translate-y-0.5',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
    white: 'bg-white text-slate-900 hover:bg-slate-50 shadow-md hover:-translate-y-0.5 border border-slate-200/80',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        download={download}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />}
    </button>
  );
}
