import Link from 'next/link'
import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";

const Navbar = () => {
  return (
    <nav className='bg-sky-100 flex h-12 border-b items-center'>
        
        <ul className='h-full flex'>
            <li className='hover:bg-sky-200'><Link className='inline-block h-full py-3 px-10' href='/'><HiOutlineHome size={20} /></Link></li>
            <li className='hover:bg-sky-200'><a className='inline-block py-3 px-10' href='/tasks'>Tasks</a></li>
            <li className='hover:bg-sky-200'><Link className='inline-block h-full py-3 px-10' href='/login'>Login</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar