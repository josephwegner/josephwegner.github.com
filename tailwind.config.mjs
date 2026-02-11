/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'deep': '#1a1147',
        'coral': '#e85d50',
        'purple-accent': '#7c5cbf',
        'teal': '#2cb67d',
        'amber': '#f4a261',
        'surface': '#faf7f2',
        'surface-card': '#ffffff',
        'text-primary': '#2d2a3e',
        'text-secondary': '#6b6880',
        'lavender': '#ede8f5',
        'peach': '#fde8e4',
        'mint': '#e0f5ec',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-primary'),
            '--tw-prose-headings': theme('colors.deep'),
            '--tw-prose-links': theme('colors.coral'),
            '--tw-prose-code': theme('colors.deep'),
            'code': {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
            },
            'a': {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.coral'),
              textUnderlineOffset: '3px',
              '&:hover': {
                color: theme('colors.coral'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
