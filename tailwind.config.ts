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
                   PRIMARY (slightly softened green)
                ======================== */
                primary: {
                    50: '#e9fff4',
                    100: '#c6ffe3',
                    200: '#8df5c5',
                    300: '#4de6a2',
                    400: '#22d38a',
                    500: '#14b87a', // slightly toned down
                    600: '#0f9a66',
                    700: '#0f7d55',
                    800: '#0e6144',
                    900: '#0a4632'
                },

                /* ========================
                   SECONDARY (muted tech blue)
                ======================== */
                secondary: {
                    400: '#5b9cf5',
                    500: '#3b82f6',
                    600: '#2563eb'
                },

                /* ========================
                   ACCENT
                ======================== */
                accent: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706'
                },

                /* ========================
                   SURFACES (KEY FIX: raised + less dark)
                ======================== */
                surface: {
                    background: '#0b1220', // was too close to black
                    sidebar: '#0e1726',
                    card: '#111a2e',
                    elevated: '#16213a',
                    hover: '#1d2a4a',
                    border: '#26324d'
                },

                /* ========================
                   TEXT (slightly softer contrast)
                ======================== */
                content: {
                    primary: '#f1f5f9',
                    secondary: '#cbd5e1',
                    muted: '#94a3b8',
                    disabled: '#64748b'
                },

                /* ========================
                   STATUS
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