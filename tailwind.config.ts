export default {
    darkMode: 'class', // always dark

    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            colors: {

                /* ========================
                   PRIMARY (GREEN BRAND)
                ======================== */
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#22c55e', // main brand
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d'
                },

                /* ========================
                   SECONDARY
                ======================== */
                secondary: {
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7'
                },

                accent: {
                    500: '#f59e0b',
                    600: '#d97706'
                },

                /* ========================
                   DARK SURFACES
                ======================== */
                surface: {
                    background: '#020617', // page bg
                    sidebar: '#020617',
                    card: '#0f172a',
                    elevated: '#111827',
                    hover: '#1e293b',
                    border: '#1f2937'
                },

                /* ========================
                   TEXT COLORS
                ======================== */
                content: {
                    primary: '#f8fafc',
                    secondary: '#cbd5e1',
                    muted: '#64748b',
                    disabled: '#475569'
                },

                /* ========================
                   STATUS COLORS
                ======================== */
                success: {
                    500: '#22c55e',
                    600: '#16a34a'
                },

                warning: {
                    500: '#f59e0b',
                    600: '#d97706'
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