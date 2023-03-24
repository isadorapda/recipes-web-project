import Select from 'react-select'

import { FRACTIONS } from '../../constants/fractions'
import { MEASURE_UNITS } from '../../constants/measureUnitsIngredients'
import { customStyles } from '../../styles/selectStyles'

interface Props {
  setAmount: (amount: number) => void
  setAmountFraction: (fraction: string) => void
  setUnit: (unit: string) => void
  setIsAccordionOpen?: (isOpen: boolean) => void
  setEdit?: (edit: boolean) => void
  handleAddNewListItem?: (e: React.MouseEvent<HTMLElement>) => void
  setShowMore?: (showMore: boolean) => void
}
const getIntegers = () => {
  let n = 0
  let x = [{ label: `${n}`, value: `${n}` }]
  while (n < 100) {
    n++
    x.push({ label: `${n}`, value: `${n}` })
  }
  return x
}

const INTEGERS = getIntegers()

export function SetAmountInput({
  setAmount,
  setAmountFraction,
  setUnit,
  setIsAccordionOpen,
  setEdit,
  handleAddNewListItem,
  setShowMore,
}: Props) {
  return (
    <>
      <Select
        options={INTEGERS}
        isMulti={false}
        styles={customStyles}
        defaultValue={INTEGERS[0]}
        onChange={(selected) =>
          selected ? setAmount(Number(selected.value)) : 0
        }
      />
      <Select
        options={FRACTIONS}
        styles={customStyles}
        defaultValue={FRACTIONS[0]}
        isMulti={false}
        onChange={(selected) =>
          selected ? setAmountFraction(selected.label) : ''
        }
      />

      <Select
        options={MEASURE_UNITS}
        styles={customStyles}
        placeholder="unit"
        isMulti={false}
        onChange={(selected) => (selected ? setUnit(selected.label) : '')}
      />

      <button
        aria-label="Add the ingredient's amount"
        type="button"
        title="Add"
        onClick={(e) => {
          setIsAccordionOpen ? setIsAccordionOpen(false) : null
          setEdit ? setEdit(false) : null
          setShowMore ? setShowMore(false) : null
          handleAddNewListItem ? handleAddNewListItem(e) : null
        }}
        className="block text-green-100 capitalize font-secondary tracking-wide px-[2px] md:px-1"
      >
        done
      </button>
    </>
  )
}
