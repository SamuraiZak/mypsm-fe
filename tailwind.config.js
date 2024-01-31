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
                    blue: '#94DCF7',
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
                ios: {
                    basic: {
                        white: '#FFFFFF',
                        black: '#000000',
                        lightBackgroundGray: '#E5E5EA',
                        extraLightBackgroundGray: '#EFEFF4',
                        darkBackgroundGray: '#171717',
                        inactiveGray: '#999999',
                        destructiveRed: '#FF3B30',
                    },
                    activeColors: {
                        activeBlue: {
                            light: '#007AFF',
                            dark: '#0A84FF',
                        },
                        activeGreen: {
                            light: '#34C759',
                            dark: '#30D158',
                        },
                        activeOrange: {
                            light: '#FF9500',
                            dark: '#FF9F0A',
                        },
                    },
                    systemColors: {
                        systemRed: {
                            light: '#FF3B30',
                            dark: '#FF453A',
                        },
                        systemOrange: {
                            light: '#FF9500',
                            dark: '#FF9F0A',
                        },
                        systemYellow: {
                            light: '#FFCC00',
                            dark: '#FFD60A',
                        },
                        systemGreen: {
                            light: '#34C759',
                            dark: '#30D158',
                        },
                        systemMint: {
                            light: '#00C7BE',
                            dark: '#63E6E2',
                        },
                        systemTeal: {
                            light: '#5AC8FA',
                            dark: '#64D2FF',
                        },
                        systemCyan: {
                            light: '#32ADE6',
                            dark: '#64D2FF',
                        },
                        systemBlue: {
                            light: '#007AFF',
                            dark: '#0A84FF',
                        },
                        systemIndigo: {
                            light: '#5856D6',
                            dark: '#5E5CE6',
                        },
                        systemPurple: {
                            light: '#AF52DE',
                            dark: '#BF5AF2',
                        },
                        systemPink: {
                            light: '#FF2D55',
                            dark: '#FF375F',
                        },
                        systemBrown: {
                            light: '#A2845E',
                            dark: '#AC8E68',
                        },
                        systemFill: {
                            light: '#E4E4E6',
                            dark: '#CFCFD2',
                        },
                        secondarySystemFill: {
                            light: '#EAEAEB',
                            dark: '#D4D4D7',
                        },
                        tertiarySystemFill: {
                            light: '#EFEFF0',
                            dark: '#DEDEE1',
                        },
                        quaternarySystemFill: {
                            light: '#F4F4F5',
                            dark: '#E7E7E9',
                        },
                        systemGrey: {
                            light: '#8E8E93',
                            dark: '#8E8E93',
                        },
                        systemGrey2: {
                            light: '#AEAEB2',
                            dark: '#636366',
                        },
                        systemGrey3: {
                            light: '#C7C7CC',
                            dark: '#48484A',
                        },
                        systemGrey4: {
                            light: '#D1D1D6',
                            dark: '#3A3A3C',
                        },
                        systemGrey5: {
                            light: '#E5E5EA',
                            dark: '#2C2C2E',
                        },
                        systemGrey6: {
                            light: '#F2F2F7',
                            dark: '#1C1C1E',
                        },
                    },
                    labelColors: {
                        label: {
                            light: '#000000',
                            dark: '#FFFFFF',
                        },
                        secondaryLabel: {
                            light: '#8A8A8E',
                            dark: '#F3F3F9',
                        },
                        tertiaryLabel: {
                            light: '#C5C5C7',
                            dark: '#F9F9FC',
                        },
                        quaternaryLabel: {
                            light: '#DDDDDE',
                            dark: '#FCFCFD',
                        },
                        placeholderText: {
                            light: '#C5C5C7',
                            dark: '#F9F9FC',
                        },
                        separator: {
                            light: '#E5E7EB',
                            dark: '#98989B',
                        },
                        opaqueSeparator: {
                            light: '#C6C6C8',
                            dark: '#38383A',
                        },
                        link: {
                            light: '#007AFF',
                            dark: '#0984FF',
                        },
                    },
                    backgroundColors: {
                        systemBackground: {
                            light: '#FFFFFF',
                            dark: '#000000',
                        },
                        secondarySystemBackground: {
                            light: '#F2F2F7',
                            dark: '#1C1C1E',
                        },
                        tertiarySystemBackground: {
                            light: '#FFFFFF',
                            dark: '#2C2C2E',
                        },
                        systemGroupedBackground: {
                            light: '#F2F2F7',
                            dark: '#000000',
                        },
                        secondarySystemGroupedBackground: {
                            light: '#FFFFFF',
                            dark: '#1C1C1E',
                        },
                        tertiarySystemGroupedBackground: {
                            light: '#F2F2F7',
                            dark: '#2C2C2E',
                        },
                    },
                    ui: {
                        sidebarItem: {
                            light: {
                                active: '#E9F2FF',
                                inactive: '#FFFFFF',
                                hover: '#F1F2F4',
                            },
                        },
                    },
                },
            },
        },
    },
    plugins: [require('flowbite/plugin'), require('autoprefixer')],
};
