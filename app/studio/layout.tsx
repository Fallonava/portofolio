export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage your portfolio content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
        {/* Hide brutalist elements via global css injection just for studio */}
        <style dangerouslySetInnerHTML={{ __html: `
          .whatsapp-button-container, #custom-cursor, .noise-overlay, .scroll-progress {
            display: none !important;
          }
          body { overflow: hidden !important; }
        `}} />
      {children}
    </div>
  )
}
