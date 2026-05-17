'use client'

export function StudioNavbar(props: any) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '64px',
            padding: '0 24px',
            background: '#ffffff', // Light header as in references
            borderBottom: '1px solid #E2E8F0',
            position: 'sticky',
            top: 0,
            zIndex: 9999,
            boxSizing: 'border-box',
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                div[data-ui="Navbar"] {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    width: 100% !important;
                }
                div[data-ui="Navbar"] > div {
                    background: transparent !important;
                }
                div[data-ui="NavbarButton"] {
                    border-radius: 4px !important;
                    transition: all 0.15s ease !important;
                    font-weight: 600 !important;
                    color: #4a4453 !important;
                    font-family: "IBM Plex Sans", sans-serif !important;
                }
                div[data-ui="NavbarButton"]:hover {
                    background: #F8FAFC !important;
                    color: #151c26 !important;
                }
            `}} />
            <div style={{ width: '100%' }}>
                {props.renderDefault(props)}
            </div>
        </div>
    )
}
