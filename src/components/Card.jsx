function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 ${className}`}>
      {title && <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</div>}
      <div className={title ? 'mt-2' : ''}>{children}</div>
    </div>
  )
}

export default Card



