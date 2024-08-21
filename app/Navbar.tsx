import Link from 'next/link'
import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className='bg-sky-100 flex h-12 border-b mb-3 items-center'>
        
        <ul className='flex items-center'>
            <Link className='h-12 items-center flex px-10 hover:bg-sky-200' href='/'><HiOutlineHome size={20} /></Link>
            <li className='hover:bg-sky-200'><a className='h-12 items-center flex px-10' href='/tasks'>Tasks</a></li>
            {/* <li className='hover:bg-sky-200'><Link className='h-12 items-center flex px-10' href='/login'>Login</Link></li> */}
        </ul>
    </nav>
  )
}

export default Navbar