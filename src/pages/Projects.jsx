import { useMemo, useState } from 'react'
import { Plus, Filter, SortAsc, X, Calendar, Activity } from 'lucide-react'
import { projects as initialProjects } from '../data/mock.js'

function Projects() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('deadline')
  const [openProject, setOpenProject] = useState(null)
  const [projects, setProjects] = useState(initialProjects)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...projects]
    if (statusFilter !== 'All') list = list.filter((p) => p.status === statusFilter)
    if (sortBy === 'deadline') list.sort((a, b) => a.deadline.localeCompare(b.deadline))
    if (sortBy === 'status') list.sort((a, b) => a.status.localeCompare(b.status))
    return list
  }, [projects, statusFilter, sortBy])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 sm:px-4 sm:py-2 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
          <Plus size={16} />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Filters - Mobile Toggle */}
      <div className="flex items-center justify-between sm:justify-start gap-3">
        <button 
          className="sm:hidden inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          Filters
        </button>

        {/* Desktop Filters */}
        <div className="hidden sm:flex gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select 
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              aria-label="Filter by status"
            >
              {['All', 'Active', 'Completed', 'Pending'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <SortAsc size={16} className="text-gray-500" />
            <select 
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              aria-label="Sort projects"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      {showFilters && (
        <div className="sm:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Status</label>
            <select 
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {['All', 'Active', 'Completed', 'Pending'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort by</label>
            <select 
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="deadline">Deadline</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 sm:py-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
            <Activity size={48} />
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first project</p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
            <Plus size={16} />
            Create Project
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filtered.map((p) => (
                    <tr 
                      key={p.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors" 
                      onClick={() => setOpenProject(p)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {p.deadline}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[3rem]">{p.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {filtered.map((p) => (
              <div 
                key={p.id} 
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setOpenProject(p)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white pr-2">{p.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar size={14} />
                  <span>Due: {p.deadline}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Project Detail Modal */}
      {openProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{openProject.name}</h3>
                <button 
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setOpenProject(null)}
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500 dark:text-gray-400 mb-1">Status</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(openProject.status)}`}>
                    {openProject.status}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500 dark:text-gray-400 mb-1">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">{openProject.progress}%</span>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="block text-gray-500 dark:text-gray-400 mb-1">Deadline</span>
                <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                  <Calendar size={14} />
                  {openProject.deadline}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Progress Overview</span>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-indigo-600 h-3 rounded-full transition-all duration-300" style={{ width: `${openProject.progress}%` }} />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Project details and updates will appear here. You can manage tasks, update status, and track progress.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <button 
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setOpenProject(null)}
                >
                  Close
                </button>
                <button className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                  Edit Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects