/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    ],
    theme: {
        fontFamily: {
            sans: ['"Inter var", sans-serif'],
        },
        fontSize: {
            sm: '11px',
            base: '12px',
            lg: '14px',
            xl: '16px',
        },
        extend: {
            colors: {
                system: {
                    primary: '#0070FF',
                    primaryHover: '#0067EB',
                    primaryTint: '#E1EBFF',
                    accent: '#3CAAE1',
                    neutral: '#44546F',
                    success: '#1F845A',
                    danger: '#CA3521',
                    dangerTint: '#FDF2F2',
                    warning: '#E2B203',
                    green: '#c0dd78',
                    red: '#FFC3C9',
                    blue: '#94DCF7'
                },
                bdr: {
                    primary: '#E6E6E6',
                },
                bgr: {
                    primary: '#FFFFFF',
                    secondary: '#F9F9F9',
                    tertiary: '#ECECEC',
                    forth: '#E6E6E6',
                },
                txt: {
                    primary: '#000000',
                    secondary: '#6B6B6B',
                    tertiary: '#A6A6A6',
                    blend: '#FFFFFF',
                    onGreen: '#365a08',
                    onRed: '#95242C',
                    onBlue: '#0E5495',
                },
                stepper: {
                    default: '#F9F9F9',
                    active: '#DAEAFF',
                },
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
