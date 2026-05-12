export default function Footer() {
  return (
    <footer className="h-10 flex items-center justify-center text-xs text-gray-400 border-t border-gray-100 bg-white">
      © {new Date().getFullYear()} Library Dashboard
    </footer>
  )
}
