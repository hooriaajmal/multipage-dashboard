import { ArrowDownRight, ArrowUpRight, Briefcase, DollarSign, ListCheck, Users } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { useMemo } from 'react'
import { earnings, tasksDist, activities } from '../data/mock.js'

function StatCard({ title, value, positive, delta, icon }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{title}</div>
          <div className="mt-1 text-xl sm:text-2xl font-semibold">{value}</div>
          <div className={`mt-1 inline-flex items-center gap-1 text-xs ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
            {positive ? <ArrowUpRight size={12} className="sm:w-4 sm:h-4" /> : <ArrowDownRight size={12} className="sm:w-4 sm:h-4" />}
            <span className="whitespace-nowrap">{delta}% vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0 p-2 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
          {icon}
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const pieColors = useMemo(() => ['#6366F1', '#22C55E', '#F59E0B'], [])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Total Projects" value="12" positive delta={8} icon={<Briefcase size={16} className="sm:w-5 sm:h-5" />} />
        <StatCard title="Earnings" value="$12,450" positive delta={12} icon={<DollarSign size={16} className="sm:w-5 sm:h-5" />} />
        <StatCard title="Tasks Due" value="7" positive={false} delta={-5} icon={<ListCheck size={16} className="sm:w-5 sm:h-5" />} />
        <StatCard title="Active Clients" value="4" positive delta={3} icon={<Users size={16} className="sm:w-5 sm:h-5" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <div className="xl:col-span-2 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Monthly earnings</div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earnings} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Task distribution</div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={tasksDist} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={40} 
                  outerRadius={70} 
                  paddingAngle={2}
                  className="sm:inner-radius-50 sm:outer-radius-80"
                >
                  {tasksDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend for mobile */}
          <div className="mt-2 sm:hidden">
            <div className="flex flex-wrap gap-2 justify-center">
              {tasksDist.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent activity</div>
        </div>
        {activities.length === 0 ? (
          <div className="py-8 sm:py-10 text-center text-sm text-gray-500 dark:text-gray-400">No recent activities.</div>
        ) : (
          <ul className="max-h-48 sm:max-h-60 overflow-auto divide-y divide-gray-200 dark:divide-gray-800">
            {activities.map((a) => (
              <li key={a.id} className="py-2 sm:py-3 flex items-start sm:items-center justify-between gap-2">
                <span className="text-xs sm:text-sm flex-1 min-w-0 leading-relaxed">{a.text}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 whitespace-nowrap">{a.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard