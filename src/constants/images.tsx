import React from 'react'
import { Target, Variant } from '../components/Carousel'
import { ICONS_FILTERS } from './iconsSlide2'
import Basil from '../assets/basil_leaf.svg'
import Plate1 from '../assets/plate1.svg'
import Plate2 from '../assets/plate2.svg'
import Slide2Food from '../assets/slide2_food.svg'
import Slide3Cooking from '../assets/slide3_cooking_photo.svg'
import Slide5Cooking from '../assets/slide5_cooking_photo.svg'
import Slide4Shopping from '../assets/slide4_shopping.svg'
import Blueberries from '../assets/blueberries.svg'
import OrangeLeaves from '../assets/orange_leaves.svg'

export const IMAGES_CAROUSEL: Target[] = [
  {
    url: (
      <div className="bg-[url(/assets/slide1.webp)] bg-center bg-img-header mt-0 justify-start">
        <img
          src={`${Plate2}`}
          alt=""
          className="absolute bottom-0 left-[-15px] w-32 md:opacity-0"
        />
      </div>
    ),
    title: 'Explore more than',
    subTitle: '5,000 delicious recipes!',
    buttonTitle: '',
    variant: Variant.SlideA,
    linkTo: '',
  },
  {
    url: (
      <div className="bg-redGradient bg-center bg-img-header mt-0  justify-start  ">
        <img
          src={`${Slide2Food}`}
          alt=""
          className="opacity-0 md:opacity-100 absolute top-0 right-[-5%] w-60 lg:w-80 laptopL:w-[450px]  "
        />
        <img
          src={`${Basil}`}
          alt=""
          className="absolute top-40  right-0 w-24 rotate-45 md:rotate-12  md:bottom-20 lg:bottom-24  md:left-[71%] md:w-20 lg:left-[64%] md:opacity-0"
        />
        <img
          src={`${Plate1}`}
          alt=""
          className="absolute top-48 right-[-10%] w-36  md:opacity-0"
        />
        <img
          src={`${OrangeLeaves}`}
          alt=""
          className="opacity-0 md:opacity-100 absolute bottom-2 left-0 w-60 lg:w-80"
        />
      </div>
    ),
    title: 'Search for personalised recipes',
    subTitle: ' according to',
    additionalComponent: (
      <div className="flex flex-col  md:flex-row md:justify-center items-start absolute  md:top-60  laptopL:top-56 left-10 md:left-[20%] lg:left-40 laptopL:left-60 gap-2 md:gap-x-5 laptopL:gap-x-10">
        {ICONS_FILTERS.map((icon) => {
          return (
            <div
              key={icon.title}
              className={`flex gap-x-5 md:gap-x-0 md:col-center md:w-20 lg:w-24 laptopL:w-32 transition md:duration-[1000ms] animate-slide md:animate-appear`}
            >
              <img
                src={icon.image}
                alt=""
                className="w-10 md:w-14 lg:w-16 laptopL:w-24 "
              />
              <h1 className="text-[12px] lg:text-base laptopL:text-xl  text-black md:text-center w-full first-letter:capitalize pt-2 font-bold font-secondary">
                {icon.title}
              </h1>
            </div>
          )
        })}
      </div>
    ),

    buttonTitle: 'Search by recipe name!',
    variant: Variant.SlideB,
    linkTo: 'search-recipes',
  },
  {
    url: (
      <div className="bg-greenGradient bg-center bg-img-header mt-0  justify-start  ">
        <img
          src={`${Plate2}`}
          alt=""
          className="absolute bottom-0 z-20 left-[-15px] w-32 md:opacity-0"
        />
        <img
          src={`${Slide3Cooking}`}
          alt=""
          className="opacity-0 md:opacity-100 absolute top-0 right-0 w-80 lg:w-[450px]"
        />
        <img
          src={`${Basil}`}
          alt=""
          className="absolute top-3 right-20 w-16 rotate-12 md:rotate-12 md:top-60 md:right-10 md:w-32 lg:w-64 lg:top-[56%]"
        />
        <img
          src={`${Plate1}`}
          alt=""
          className=" absolute top-2 right-[-15px] w-32 md:opacity-0"
        />
      </div>
    ),
    title: 'What ingredients do you have in your kitchen?',
    subTitle:
      'Get inspired by recipes you can make with ingredients that you already have at home!',
    buttonTitle: 'Search by ingredients!',
    variant: Variant.SlideC,
    linkTo: 'whats-in-your-fridge',
  },
  {
    url: (
      <div className="bg-redGradient bg-center bg-img-header mt-0  justify-start ">
        <img
          src={`${Blueberries}`}
          alt=""
          className="absolute top-[-5%] right-[-65px] w-60 md:opacity-0"
        />
        <img
          src={`${Slide4Shopping}`}
          alt=""
          className="opacity-0 md:opacity-100 absolute top-0 right-0 w-80 lg:w-[450px]"
        />
        <img
          src={`${Basil}`}
          alt=""
          className="opacity-0 md:opacity-100 absolute top-3  right-20 w-16 rotate-12 md:rotate-12 md:top-60 md:right-10 md:w-32 lg:w-64 lg:top-[56%]"
        />
        <img
          src={`${Plate2}`}
          alt=""
          className="absolute bottom-0 z-20 left-[-15px] w-32 md:opacity-0"
        />
      </div>
    ),
    title: 'Add missing ingredients to your grocery list ',
    subTitle:
      'Save time shopping! We create an organised shopping list by grouping igredients by aisles',
    buttonTitle: 'Go to your grocery list',
    variant: Variant.SlideD,
    linkTo: 'grocery-list',
  },
  {
    url: (
      <div className="bg-greenGradient bg-center bg-img-header mt-0 justify-start ">
        <img
          src={`${Slide5Cooking}`}
          alt=""
          className="opacity-0 w-0 md:opacity-100 md:absolute bottom-1 md:w-80 lg:w-96 laptopL:w-[450px]"
        />
        <img
          src={`${Basil}`}
          alt=""
          className="absolute bottom-24 md:top-0  xl:bottom-16  left-0 z-20 md:left-[75%] lg:left-[80%] w-16 md:w-40 xl:w-56 rotate-45 md:rotate-[75deg] "
        />
        <img
          src={`${Plate1}`}
          alt=""
          className=" absolute bottom-2 left-[-10%] w-32 z-20  md:opacity-0"
        />
      </div>
    ),
    title: 'Save your favorite recipes!',
    subTitle: 'Check them out whenever you want!',
    buttonTitle: 'Go to your saved recipes',
    variant: Variant.SlideE,
    linkTo: 'saved',
  },
]
