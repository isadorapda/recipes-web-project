/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          100: '#f9d2d2',
          300: 'rgba(176,67,66,0.9)',
          500: '#B04342',
        },
        green: {
          500: '#476548',
          100: '#B0C3B5',
        },
        black: {
          500: '#1C1617',
        },
        gray: {
          600: '#4A4A4A',
          500: '#616161',
          100: '#EEEFEE',
        },
        glass: 'rgba(255, 255, 255, 0.6)',
      },

      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(300px,1fr))',
      },
      height: {
        '5v': '50vh',
        '7v': '70vh',
      },
      boxShadow: {
        20: '0 0.5px 15px -3px #8181814b',
        10: '0 0 10px -2px rgba(0,0,0,0.1)',
        30: '0 4px 10px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.05) inset',
        marked: '0 0.2em 1em rgba(0,0,0,0.18)',
      },
      borderRadius: {
        '4xl': '50px',
      },
      fontFamily: {
        primary: ['Dosis', 'sans-serif'],
        secondary: ['ABeeZee', 'sans-serif'],
      },
      fontSize: {
        smallest: '10px',
        smaller: '12px',
        median: '15px',
        heading1: [
          '25px',
          {
            lineHeight: '33px',
            fontWeight: '600',
          },
        ],
        heading2: [
          '20px',
          {
            lineHeight: '30px',
            fontWeight: '600',
          },
        ],
      },
      screens: {
        laptopL: '1440px',
      },
      transitionTimingFunction: {
        toggle: 'cubic-bezier(0.8, 0.5, 0.2, 1.4)',
      },
      keyframes: {
        slide: {
          from: {
            opacity: 0,
            transform: 'translateX(-10vw)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0%)',
          },
        },
        appear: {
          from: {
            opacity: 0,
            transform: 'scale(0)',
          },
          to: {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        rotate: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
            backgroundColor: 'white',
            color: 'green',
            border: '2px green',
          },
        },

        open: {
          from: {
            width: 'auto',
          },
          '50%': {
            padding: '0 20px 0 5px',
            maxWidth: '250px',
          },
          to: {
            width: 'auto',
          },
        },
        close: {
          from: {
            paddingLeft: '60px',
          },
          to: {
            paddingLeft: '0px',
            maxWidth: '48px',
          },
        },
        closeItem: {
          from: {
            marginRight: '0px',
          },
          to: {
            marginRight: '-80px',
            maxWidth: '48px',
          },
        },
        fadeInDown: {
          from: {
            transform: 'translateY(-1em)',
            opacity: 0,
          },
          to: {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        fadeInRight: {
          from: {
            marginRight: '-100%',
            opacity: 0,
          },
          to: {
            marginRight: '0%',
            opacity: 1,
          },
        },
        check: {
          from: {
            width: '0px',
          },
          to: {
            width: '100%',
          },
        },
      },
      animation: {
        appear: '1s ease-in-out appear',
        appear2: '400ms ease-in-out appear',
        slide: '1s ease-in-out slide',
        rotate: '2s rotate',
        open: '2s linear 0s alternate open',
        close: '1s ease-in-out close',
        closeItem: '1s ease-in-out closeItem',
        fadeInDown: '400ms ease 0s 1 normal none running fadeInDown',
        fadeInRight: '600ms ease 0s 1 normal none running fadeInRight',
        showTray: 'showTray 200ms ease-in-out',
        check: 'check 600ms ease',
      },
    },
  },
  plugins: [],
}
