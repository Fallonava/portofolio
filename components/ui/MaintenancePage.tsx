export function MaintenancePage({ message }: { message?: string }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <span className="text-white text-3xl font-bold font-mono">F</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Coming Soon</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          {message ?? "We're working on something great. Check back shortly!"}
        </p>
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
