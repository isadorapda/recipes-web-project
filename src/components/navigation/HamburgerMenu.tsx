interface Props {
  isNavOpen: boolean
}

export function HamburgerMenu({ isNavOpen }: Props) {
  return (
    <div className="block h-4 w-8 cursor-pointer top-4 left-9 fixed z-[1001]">
      <span
        className={`toggle-menu-btn left-0 ${isNavOpen ? 'rotate-45' : null} ${
          isNavOpen ? 'top-[13px]' : 'top-0'
        }`}
      />
      <span
        className={`toggle-menu-btn top-[7px] left-0 ${
          isNavOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`toggle-menu-btn left-0 ${
          isNavOpen ? 'rotate-[-45deg]' : null
        } ${isNavOpen ? 'top-[13px]' : 'bottom-0'} `}
      />
    </div>
  )
}
