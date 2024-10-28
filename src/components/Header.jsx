import React from 'react'

// import react icons
import { LuListTodo } from 'react-icons/lu'
import { MdLibraryAdd } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'


import { Link } from 'react-router-dom'
import { RiTodoFill } from 'react-icons/ri'

const Header = () => {
  return (
    <header className="border-b border-solid border-b-[#e7edf3] px-24 py-6">
      <div className="flex items-center justify-between whitespace-nowrap">
        {/* left section */}
      <div className="flex items-center gap-4 text-[#0e141b]">
        {/* icon */}
        <div className="flex items-center justify-center">
          <LuListTodo  className="text-yellow-500" size={40} />
        </div>

        {/* title */}
        <h2 className="text-yellow-600 text-2xl font-bold leading-tight tracking-[-0.015em]">
          TODO
        </h2>
      </div>
      {/* right section */}
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex gap-4">
          {/* new project*/}
          <Link to="/">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-xl  leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <MdLibraryAdd />
            <span className='font-bold text-lg'>Create Project</span>
          </button>
          </Link>

          {/* manage todos*/}
          <Link to="/">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-xl  leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <RiTodoFill  />
            <span className='font-bold text-lg'>Manage Todos</span>
          </button>
          </Link>

          {/* profile*/}
          <Link to="/">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-xl  leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <CgProfile />
          </button>
          </Link>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header
