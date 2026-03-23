/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#f0eeea',
        ink:    '#111110',
        muted:  '#6b6b6b',
        border: '#dddad5',
        rose:   '#f2b8c6',
        'rose-s':'#e8547a',
        plum:   '#d4bcf5',
        'plum-s':'#7c3aed',
        sage:   '#b8f0cf',
        'sage-s':'#16a34a',
        sky:    '#b8e4fd',
        'sky-s':'#0284c7',
        surface:'#ffffff',
        dark:   '#111110',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        ko:      ['var(--font-ko)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
    },
  },
  plugins: [],
}
