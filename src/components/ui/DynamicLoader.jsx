import Card from '../ui/Card'
import Table from '../ui/Table'
import ChartComponent from '../ui/ChartComponent'
import { useFetch } from '../../hooks/useFetch'

function ComponentSlot({ type, dataUrl }) {
  const { data, loading, error } = useFetch(dataUrl)

  if (loading) return (
    <div className="flex items-center gap-2 text-sm text-gray-400 py-6">
      <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      Loading...
    </div>
  )

  if (error) return (
    <p className="text-sm text-red-500 py-4">⚠ {error}</p>
  )

  if (!data) return null

  if (type === 'Card') return <Card {...data} />
  if (type === 'Table') return <Table {...data} />
  if (type === 'Chart') return <ChartComponent {...data} />

  return <p className="text-sm text-gray-400">Unknown component type: {type}</p>
}

export default function DynamicLoader({ components }) {
  return (
    <div className="flex flex-col gap-6">
      {components.map((item) => (
        <ComponentSlot key={item.dataUrl} type={item.type} dataUrl={item.dataUrl} />
      ))}
    </div>
  )
}
