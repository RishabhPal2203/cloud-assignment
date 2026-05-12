import { useState } from 'react'

function AddBookModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', author: '', genre: '' })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.title || !form.author || !form.genre) return
    onAdd([form.title, form.author, form.genre, 'Available'])
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {['title', 'author', 'genre'].map(field => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
          <div className="flex gap-2 justify-end mt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Table({ headers, rows: initialRows }) {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState(initialRows)
  const [showModal, setShowModal] = useState(false)

  const isBookTable = headers[0] === 'Title'

  const filtered = rows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(query.toLowerCase()))
  )

  const statusStyle = val => {
    if (val === 'Available' || val === 'Active') return 'bg-green-100 text-green-700'
    if (val === 'Borrowed' || val === 'Inactive') return 'bg-red-100 text-red-700'
    if (val === 'Premium') return 'bg-indigo-100 text-indigo-700'
    return 'bg-gray-100 text-gray-600'
  }

  const badgeCols = new Set(isBookTable ? [3] : [2, 3])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {isBookTable && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Add Book
          </button>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-4 py-6 text-center text-gray-400">No results found</td></tr>
          ) : (
            filtered.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/60 hover:bg-gray-100'}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-gray-700">
                    {badgeCols.has(j) ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(cell)}`}>{cell}</span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showModal && (
        <AddBookModal
          onClose={() => setShowModal(false)}
          onAdd={row => setRows(r => [...r, row])}
        />
      )}
    </div>
  )
}
