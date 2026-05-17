'use client'

export function StudioLayout(props: any) {
    return (
        <div className="ap-dashboard-wrapper" style={{
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            backgroundColor: '#f8f9ff', // Architectural Precision background
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
        }}>
            {/* Render Default Sanity Studio Layout */}
            <div className="ap-dashboard-content" style={{
                position: 'relative',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {props.renderDefault(props)}
            </div>
        </div>
    )
}
