export default {
    darkMode: 'class',

    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            colors: {

                /* ========================
                   PRIMARY (modern green / tech)
                ======================== */
                primary: {
                    50: '#eafff3',
                    100: '#c8ffe1',
                    200: '#90f5c2',
                    300: '#4ee6a0',
                    400: '#22d38a',
                    500: '#16c47f', // more modern / distinct
                    600: '#10a96c',
                    700: '#0e8758',
                    800: '#0c6a46',
                    900: '#064a31'
                },

                /* ========================
                   SECONDARY (cool tech blue)
                ======================== */
                secondary: {
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb'
                },

                /* ========================
                   ACCENT (warm contrast highlight)
                ======================== */
                accent: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706'
                },

                /* ========================
                   SURFACES (more depth layering)
                ======================== */
                surface: {
                    background: '#050816', // deeper, richer base
                    sidebar: '#070b1a',
                    card: '#0b1226',
                    elevated: '#111a33',
                    hover: '#172554',
                    border: '#1e2a44'
                },

                /* ========================
                   TEXT (improved contrast hierarchy)
                ======================== */
                content: {
                    primary: '#f8fafc',
                    secondary: '#cbd5e1',
                    muted: '#94a3b8',
                    disabled: '#64748b'
                },

                /* ========================
                   STATUS COLORS (slightly refined)
                ======================== */
                success: {
                    500: '#22c55e',
                    600: '#16a34a'
                },

                warning: {
                    500: '#fbbf24',
                    600: '#f59e0b'
                },

                danger: {
                    500: '#ef4444',
                    600: '#dc2626'
                }
            }
        }
    },

    plugins: []
}