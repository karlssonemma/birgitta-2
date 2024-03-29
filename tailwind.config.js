/* We  */
/* Tailwind Configuration Docs: https://tailwindcss.com/docs/configuration */

function withOpacityValue(variable) {
  return ({opacityValue}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        contrast: withOpacityValue('--color-contrast'),
        notice: withOpacityValue('--color-accent'),
        shopPay: 'var(--color-shop-pay)',
        'gray-light': '#e6e6e6',
        'gray-medium': '#bfbfbf',
        'gray-dark': '#898989',
        'black': '#000000',
        'green-light': '#A5AB98',
        'green-dark': '#6e755a',
        'orange-light': '#C08773',
        'orange-dark': '#A5563C',
        'black': '#1B1B1B',
      },
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        'sm-max': {max: '48em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
        '2xl-only': {min: '96em'},
      },
      spacing: {
        nav: 'var(--height-nav)',
        screen: 'var(--screen-height, 100vh)',
      },
      height: {
        screen: 'var(--screen-height, 100vh)',
        'screen-no-nav':
          'calc(var(--screen-height, 100vh) - var(--height-nav))',
      },
      width: {
        mobileGallery: 'calc(100vw - 3rem)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Aleo', 'serif']
      },
      fontSize: {
        display: ['var(--font-size-display)', '1.1'],
        heading: ['var(--font-size-heading)', '1.25'],
        lead: ['var(--font-size-lead)', '1.333'],
        copy: ['var(--font-size-copy)', '1.5'],
        fine: ['var(--font-size-fine)', '1.333'],
      },
      maxWidth: {
        'prose-narrow': '45ch',
        'prose-wide': '80ch',
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
      keyframes: {
        textOut: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(40px)' }
        },
        textIn: {
          '0%': { transform: 'translateY(-40px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        fadeUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0%' },
          '100%': { transform: 'translateY(0px)', opacity: '100%' }
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        fadeInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0%' },
          '100%': { transform: 'translateX(0px)', opacity: '100%' }
        },
        zoomIn: {
          '0%': { transform: 'scale(80%)', opacity: '0%' },
          '100%': { transform: 'scale(100%)', opacity: '100%' }
        },
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }
        },
        btnClick: {
          '0%': { transform: 'scale(100%)' },
          '50%': { transform: 'scale(80%)' },
          '100%': { transform: 'scale(100%)' }
        }
        
      },
      animation: {
        textOut: 'textOut 0.5s ease-out 0.5s forwards',
        textIn: 'textIn 0.5s ease-out 1s forwards',
        fadeIn: 'fadeIn 0.2s ease-out 0.2s forwards',
        btnClick: 'btnClick 0.5s ease-in-out forwards'

      }
    },
  },
  // eslint-disable-next-line node/no-unpublished-require
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
