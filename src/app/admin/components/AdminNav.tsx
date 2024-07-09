import React from 'react'
import Link from 'next/link'
import Logo from '../../../../public/next.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'


function AdminNav({ session }) {
  return (
    <nav className='shadow-xl'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center p-4'>
          <div>
            <Link href='/'>
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <ul className='flex'>
            {!session ? (
              <>
                <li className='mx-3'><Link href="/login">เข้าสู่ระบบ</Link></li>
                <li className='mx-3'><Link href="/register">ลงทะเบียน</Link></li>
              </>
            ) : (

              <li className='mx-3'>
                <a className='bg-red-500 text-white border px-2 py-1 rounded-md text-md my-2 ml-2 cursor-pointer' onClick={() => signOut()}>ออกจากระบบ</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNav