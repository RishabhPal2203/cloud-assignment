const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export async function fetchData(url) {
  const res = await fetch(`${base}${url}`)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json()
}
