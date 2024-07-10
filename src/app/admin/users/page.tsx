"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '@/app/admin/components/AdminNav'
import Container from '@/app/components/Container'
import Footer from '@/app/components/Footer'
import SideNav from '@/app/admin/components/SideNav'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

function AdminUserManagePage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [allUsersData, setAllUsersData] = useState<User[]>([])
    const [loadingSession, setLoadingSession] = useState(true)

    // ตรวจสอบ session และ redirect ไปที่หน้า login หากไม่มี session
    useEffect(() => {
        if (status === 'loading') {
            setLoadingSession(true)
        } else {
            setLoadingSession(false)
            if (!session) {
                router.push('/login')
            } else if (session?.user?.role !== 'admin') {
                router.push('/welcome')
            }
        }
    }, [session, status, router])

    // ดึงข้อมูลผู้ใช้ทั้งหมดเมื่อ component โหลด
    useEffect(() => {
        if (!loadingSession && session) {
            getAllUsers()
        }
    }, [loadingSession, session])

    // ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
    const getAllUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers`, {
                cache: 'no-store'
            })

            if (!res.ok) {
                throw new Error('Failed to fetch user')
            }

            const data = await res.json()
            setAllUsersData(data.totalUsers)

        } catch (error) {
            console.log(error)
        }
    }

    // แสดง loading state ขณะโหลด session หรือไม่มี session
    if (status === 'loading' || loadingSession) {
        return <p>กำลังโหลด...</p>
    }

    return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10 my-10 mx-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl md-3'>
                                จัดการผู้ใช้
                            </h3>
                            <p>รายการผู้ใช้</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>#</th>
                                            <th className='p-5'>ชื่อผู้ใช้งาน</th>
                                            <th className='p-5'>อีเมล</th>
                                            <th className='p-5'>Role</th>
                                            <th className='p-5'>จัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsersData.map((user, index) => (
                                            <tr key={user._id} className='bg-gray-200'>
                                                <td className='p-5'>{index + 1}</td>
                                                <td className='p-5'>{user.name}</td>
                                                <td className='p-5'>{user.email}</td>
                                                <td className='p-5'>{user.role}</td>
                                                <td className='p-5'>
                                                    <Link href={`/admin/users/edit/${user._id}`} className='bg-orange-500 text-white border px-2 py-1 rounded-md text-md my-2 ml-2 cursor-pointer'>
                                                    แก้ไข
                                                    </Link>
                                                    <DeleteBtn id={user._id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default AdminUserManagePage
