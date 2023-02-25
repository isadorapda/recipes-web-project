interface Option {
  value: string
  label: string
}
const fractions = [
  '0',
  '1/8',
  '1/4',
  '1/3',
  '3/8',
  '1/2',
  '5/8',
  '2/3',
  '3/4',
  '7/8',
]

export const FRACTIONS: Option[] = fractions.map((f) => ({
  value: f,
  label: f,
}))
