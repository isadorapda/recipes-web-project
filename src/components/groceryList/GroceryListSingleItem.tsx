import { useState } from 'react'

import { RiMoreLine as IconMore } from 'react-icons/ri'
import { BsCheckLg as IconCheck } from 'react-icons/bs'

import { IngredientsDetails } from '../../types/models'
import useMenuVisible from '../../hooks/useMenuVisible'
import useWindowWidth from '../../hooks/useWindowWidth'
import { RenderMobile } from '../RenderMobile'
import { RenderDasktop } from '../RenderDasktop'
import { ActionsListItem } from './ActionsListItem'
import { SetAmountInput } from './SetAmountInput'

interface Props {
  handleDeleteIngredientItem: (item: any) => void
  item: IngredientsDetails
  isAccordionOpen: boolean
}

export function GroceryListSingleItem({
  handleDeleteIngredientItem,
  item,
  isAccordionOpen,
}: Props) {
  const { ref, isMenuVisible, setIsMenuVisible } = useMenuVisible(false)
  const width = useWindowWidth()
  const [check, setCheck] = useState(false)
  const [edit, setEdit] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [unit, setUnit] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [amountFraction, setAmountFraction] = useState<string>('')

  return (
    <div
      className={`${
        isAccordionOpen
          ? 'h-auto animate-fadeInDown'
          : 'h-0 hidden lg:grid lg:grid-cols-[2fr,_1fr]'
      } ${
        edit ? 'bg-[rgba(97,97,97,0.2)] italic my-1' : ''
      } relative grid grid-cols-[2fr,_1.7fr,_0.3fr] py-[5px] px-2 border-b border-b-gray-100 transition-all text-smaller md:text-median xl:text-lg text-gray-600 md:h-max`}
    >
      <ul className="flex items-center">
        <li className="flex items-center cursor-pointer gap-2 lg:gap-3">
          <button
            aria-label="This ingredient is unticked. Click to tick this ingredient as already bought"
            aria-hidden={`${check ? true : false}`}
            type="button"
            disabled={edit}
            onClick={() => setCheck(true)}
            className={`${
              check ? 'hidden h-0' : 'block h-3 w-3'
            } rounded-full bg-transparent border border-gray-400`}
          />
          <button
            aria-label="Ingredient ticked. Click to untick"
            aria-hidden={`${check ? false : true}`}
            type="button"
            disabled={edit}
            onClick={() => setCheck(false)}
            className={`${
              check
                ? 'flex items-center h-4 w-4 text-lg'
                : 'hidden h-0 opacity-0'
            } text-green-100`}
          >
            <IconCheck className="animate-appear2 transition-opacity ease-in" />
          </button>

          <button
            aria-label={`${
              check
                ? 'Click to untick this ingredient'
                : 'Click to tick this ingredient'
            }`}
            type="button"
            disabled={edit}
            onClick={() => setCheck(!check)}
            className={`${
              check ? 'italic relative' : ''
            }  first-letter:uppercase `}
          >
            {' '}
            {item.name}
            <span
              aria-hidden="true"
              className={`${
                check
                  ? 'absolute left-0 top-[10px] xl:top-[13px] h-[1px] bg-gray-500 w-full transition-[width] animate-check ease-in'
                  : 'hidden h-0 opacity-0'
              } `}
            />
          </button>
        </li>
      </ul>
      <ul className="py-1 flex justify-end items-center">
        <li
          className={`${
            showMore && isMenuVisible
              ? 'transition-transform translate-x-[-15px] duration-200 ease-linear'
              : ''
          } `}
        >
          <span className="row-center gap-1 mr-2 lg:mr-0">
            {amount ? amount : item.amount.toFixed(1)}{' '}
            <small>
              {amountFraction ? amountFraction : item.amountFraction}
            </small>{' '}
            {unit ? unit : item.unit}
          </span>
        </li>
      </ul>
      <RenderMobile width={width}>
        {
          <>
            <div>
              <button
                aria-label="Show actions for this ingredient"
                aria-hidden={`${showMore && isMenuVisible ? true : false}`}
                type="button"
                onClick={() => {
                  setShowMore(true)
                  setIsMenuVisible(true)
                }}
                className={`${
                  showMore && isMenuVisible
                    ? 'hidden h-0'
                    : 'absolute right-3 top-0 flex items-center justify-end h-full bg-white text-lg text-green-100 hover:text-green-500'
                } `}
              >
                <IconMore />
              </button>
            </div>
            <div
              aria-hidden={`${showMore && isMenuVisible ? true : false}`}
              ref={ref}
              className={`${
                showMore
                  ? 'absolute right-2 top-0 flex items-center z-30 h-full bg-white transition-opacity animate-appear2'
                  : 'hidden h-0'
              } `}
            >
              {isMenuVisible && (
                <ActionsListItem
                  setEdit={setEdit}
                  setShowMore={setShowMore}
                  handleDeleteIngredientItem={handleDeleteIngredientItem}
                  id={item.id}
                />
              )}
            </div>
          </>
        }
      </RenderMobile>
      <RenderDasktop width={width}>
        {
          <div className="absolute right-0 top-0 flex items-center justify-end w-1/2 h-full bg-white opacity-0 hover:transition-opacity hover:ease-in hover:duration-300 hover:opacity-100">
            <ActionsListItem
              setEdit={setEdit}
              setShowMore={setShowMore}
              handleDeleteIngredientItem={handleDeleteIngredientItem}
              id={item.id}
            />
          </div>
        }
      </RenderDasktop>
      <div
        className={`${
          edit
            ? 'flex items-center justify-end lg:gap-x-4 w-[80%] md:w-[70%] lg:w-2/3 h-full absolute right-0 top-0 z-50 px-1 lg:px-4 py-2 bg-white shadow-30 rounded scale-110 opacity-100 transition-opacity animate-appear2 md:text-sm'
            : 'hidden h-0 '
        }`}
      >
        <SetAmountInput
          setAmount={setAmount}
          setAmountFraction={setAmountFraction}
          setUnit={setUnit}
          setEdit={setEdit}
        />
      </div>
    </div>
  )
}
