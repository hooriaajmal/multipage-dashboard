function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900',
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button



