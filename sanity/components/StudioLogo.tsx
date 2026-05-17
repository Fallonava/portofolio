'use client'

export function StudioLogo() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            userSelect: 'none',
        }}>
            {/* Architectural Precision Primary Solid Icon */}
            <div style={{
                width: 28,
                height: 28,
                borderRadius: '4px', // Standard 0.25rem soft radius
                background: '#5b21b6', // Primary color
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffffff',
                }}>
                    P
                </span>
            </div>

            {/* Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#151c26', // on-surface
                    display: 'block',
                }}>
                    Project Alpha
                </span>
                <span style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: '#4a4453', // on-surface-variant
                    display: 'block',
                    textTransform: 'uppercase',
                }}>
                    Production Dataset
                </span>
            </div>
        </div>
    )
}
