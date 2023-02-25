import { useState } from 'react'

import useWindowWidth from '../hooks/useWindowWidth'
import { HamburgerMenu } from './HamburgerMenu'
import { RenderDasktop } from './RenderDasktop'
import { RenderMobile } from './RenderMobile'
import { Navigation } from './Navigation'

export function NavigationBar() {
  const width = useWindowWidth()
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <>
      <RenderMobile width={width}>
        <div className="bg-white shadow-lg justify-start items-center top-0 z-50 h-[50px] w-screen fixed">
          <button
            aria-label={`${
              isNavOpen ? 'Close navigation menu' : 'Open navigation menu'
            }`}
            type="button"
            className="w-9"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <HamburgerMenu isNavOpen={isNavOpen} />
          </button>
          <div
            aria-modal="true"
            className={`${
              isNavOpen
                ? 'absolute transition-all animate-fadeInRight z-[999]'
                : 'hidden'
            }  top-0 flex flex-col gap-5 pt-20 w-full md:min-w-[30vw] md:max-w-[50vw] h-screen bg-white shadow-20 uppercase `}
          >
            <Navigation setIsNavOpen={setIsNavOpen} />
          </div>
          <div
            aria-hidden="true"
            onClick={() => setIsNavOpen(false)}
            className={` ${
              isNavOpen
                ? 'md:bg-[rgba(0,0,0,0.3)] md:fixed md:z-[998]'
                : 'hidden'
            } md:w-screen md:h-screen top-0`}
          ></div>
        </div>
      </RenderMobile>
      <RenderDasktop width={width}>
        <div className="fixed top-0 z-[1000] py-5 px-10 row-center justify-evenly w-screen bg-white shadow-md uppercase text-base xl:text-lg">
          <Navigation setIsNavOpen={setIsNavOpen} />
        </div>
      </RenderDasktop>
    </>
  )
}
