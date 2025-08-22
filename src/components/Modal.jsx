function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-sm" onClick={onClose}>Close</button>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {children}
        </div>
        {footer && (
          <div className="mt-4 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal



