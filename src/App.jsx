import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import DynamicLoader from './components/ui/DynamicLoader'
import { useFetch } from './hooks/useFetch'

function DynamicPage() {
  const { pathname } = useLocation()
  const { data: navItems, loading } = useFetch('/data/navigation.json')

  if (loading) return <p className="text-sm text-gray-400">Loading page...</p>

  const page = navItems?.find(item => item.path === pathname)

  if (!page) return <p className="text-sm text-red-400">Page not found.</p>

  return <DynamicLoader components={page.components} />
}

export default function App() {
  return (
    <BrowserRouter basename="/cloud-assignment">
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DynamicPage />} />
          <Route path="/books" element={<DynamicPage />} />
          <Route path="/members" element={<DynamicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
