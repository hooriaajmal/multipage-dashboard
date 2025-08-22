import { useState } from 'react'

function Profile() {
  const [name, setName] = useState('Hooria')
  const [email, setEmail] = useState('hooriaajmal9@gmail.com')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.includes('@')) e.email = 'Valid email required'
    return e
  }

  function onSubmit(evn) {
    evn.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      alert('Profile saved (mock)')
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile-first stacked layout, side-by-side on larger screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Profile Picture Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">Profile Picture</div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-indigo-500 flex-shrink-0" />
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <button className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800">
                Upload Photo
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG, PNG up to 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form Section */}
        <form 
          className="xl:col-span-2 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950" 
          onSubmit={onSubmit}
        >
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Profile Information</div>
          
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input 
                id="name"
                type="text"
                className={`w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`} 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input 
                id="email"
                type="email"
                className={`w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="Enter new password (optional)" 
                className="w-full rounded-md border px-3 py-2 text-sm bg-white border-gray-300 dark:bg-gray-950 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Leave blank to keep current password
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button 
              type="button"
              className="w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile