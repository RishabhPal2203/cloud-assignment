import { NavLink } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export default function Sidebar() {
  const { data: navItems, loading } = useFetch('/data/navigation.json')

  return (
    <aside className="fixed top-14 left-0 w-56 h-[calc(100vh-3.5rem)] bg-slate-800 text-white flex flex-col py-6 px-3">
      {loading ? (
        <p className="text-slate-400 text-sm px-3">Loading...</p>
      ) : (
        <nav className="flex flex-col gap-1">
          {navItems?.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </aside>
  )
}
