import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GrNext as IconNext, GrPrevious as IconPrevious } from 'react-icons/gr'
import { assertNever } from '../utils/assertNever'

export enum Variant {
  SlideA,
  SlideB,
  SlideC,
  SlideD,
  SlideE,
}

export interface Target {
  url: JSX.Element
  title: string
  subTitle: string
  buttonTitle: string
  additionalComponent?: JSX.Element
  variant: Variant
  linkTo: string
}

interface Props {
  targets: Target[]
}

interface StylesHeader {
  title: string
  subTitle: string
  button?: string
}

const CHANGE_IMAGE_INTERVAL = 2500

export function Carousel({ targets }: Props) {
  const navigate = useNavigate()
  const [displayIndex, setDisplayIndex] = useState<number>(0)
  const currentTarget = targets[displayIndex]

  const styles = getStyles(currentTarget.variant)

  function getStyles(variant: Variant): StylesHeader {
    switch (variant) {
      case Variant.SlideA:
        return {
          title:
            'text-xl md:text-3xl lg:text-5xl top-30 md:top-68 lg:top-52 md:left-48 lg:left-[23%]',
          subTitle:
            'font-bold text-xl md:text-3xl lg:text-5xl top-56 md:top-80 lg:top-68 md:left-48 lg:left-[23%]',
        }
      case Variant.SlideB:
        return {
          title: 'titleB top-5 md:top-32 laptopL:top-24 xl:left-[30%]',
          subTitle:
            'titleB top-12 md:top-40 lg:top-44 laptopL:top-36 laptopL:left-44',
          button: 'top-[83%] md:top-[76%] lg:left-[70%] laptopL:left-[60%]',
        }
      case Variant.SlideC:
        return {
          title: 'titleT36L15 text-black',
          subTitle: 'subtitleCD ',
          button: 'buttonCD',
        }
      case Variant.SlideD:
        return {
          title: 'titleT36L15 text-red-500',
          subTitle: 'subtitleCD text-white',
          button: 'buttonCD',
        }
      case Variant.SlideE:
        return {
          title:
            'text-green-500 text-center md:text-left text-xl md:text-2xl lg:text-3xl top-20 md:top-44 lg:top-36 w-[60%] md:left-[45%] xl:left-[40%]',
          subTitle:
            'font-bold text-red-500 text-2xl md:text-4xl xl:text-5xl laptopL:w-1/3 top-40 md:top-56 lg:top-58 xl:top-52 text-center md:text-left w-[60%] md:w-60 md:left-[45%] xl:left-[40%] xl:leading-snug',
          button: 'top-[75%] md:top-[70%] md:left-[45%] xl:left-[40%]',
        }
      default:
        return assertNever(variant)
    }
  }

  useEffect(() => {
    const interval = setInterval(setNextDisplayIndex, CHANGE_IMAGE_INTERVAL)

    return () => clearInterval(interval)
  }, [currentTarget])

  function setNextDisplayIndex() {
    if (displayIndex === targets.length - 1) {
      setDisplayIndex(0)
      return
    }
    setDisplayIndex(displayIndex + 1)
  }

  function setPreviousDisplayIndex() {
    if (displayIndex === 0) {
      setDisplayIndex(targets.length - 1)
      return
    }
    setDisplayIndex(displayIndex - 1)
  }

  return (
    <div className="relative col-center w-screen h-96 md:h-[566px]">
      <button
        aria-label="Go to the previous slide"
        type="button"
        onClick={setPreviousDisplayIndex}
        className="hidden absolute bottom-5 left-7 md:right-7 md:top-[50%] xl:top-[45%] z-20 md:row-center md:visible bg-[#ffffffb5] rounded-full h-5 w-5 md:h-10 md:w-10 lg:h-16 lg:w-16"
      >
        <IconPrevious aria-hidden="true" className="h-[1rem] xl:h-[2rem]" />
      </button>
      {currentTarget.url}
      <h1 className={`absolute ${styles.title}`}>{currentTarget.title}</h1>
      {currentTarget.additionalComponent}
      <h2 className={`absolute ${styles.subTitle}`}>
        {currentTarget.subTitle}
      </h2>

      {currentTarget.buttonTitle ? (
        <button
          aria-label={`Go to ${currentTarget.buttonTitle}`}
          type="button"
          className={`buttonsCarousel ${styles.button}`}
          onClick={() => navigate(currentTarget.linkTo)}
        >
          {currentTarget.buttonTitle}
        </button>
      ) : null}
      <div className="absolute bottom-5 md:top-[90%] xl:top-[90%] w-screen flex justify-center gap-2 lg:gap-4">
        {targets.map((_, index) => (
          <span
            aria-label={`Go to slide number ${index}`}
            onClick={() => setDisplayIndex(index)}
            key={index}
            className={`rounded-full h-2 w-2 xl:h-3 xl:w-3 cursor-pointer  ${
              index === displayIndex ? 'bg-red-100' : 'bg-red-500'
            }`}
          />
        ))}
      </div>
      <button
        aria-label="Go to the next slide"
        type="button"
        onClick={setNextDisplayIndex}
        className="rounded-full bg-[#ffffffb5] hidden md:visible md:row-center absolute bottom-5 md:top-[50%] xl:top-[45%] right-20 md:right-7 z-20 h-5 w-5 md:h-10 md:w-10 lg:h-16 lg:w-16"
      >
        <IconNext aria-hidden="true" className="h-[1rem] xl:h-[2rem]" />
      </button>
    </div>
  )
}
