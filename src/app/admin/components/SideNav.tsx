import React from 'react'
import Link from 'next/link'

function SideNav() {
  return (
    <nav className='shadow-lg p-10 rounded-lg'>

      <ul>
        <li className='mb-5 font-bold  hover:text-green-500 cursor-pointer'><Link href='/admin'>Dashboard</Link></li>
        <li className='mb-5 font-bold  hover:text-green-500 cursor-pointer'><Link href='/admin/users'>Users</Link></li>
        <li className='mb-5 font-bold  hover:text-green-500 cursor-pointer'><Link href='/admin/posts'>Posts</Link></li>
      </ul>

    </nav>
  )
}

export default SideNav