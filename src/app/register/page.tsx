"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data: session } = useSession();
    if (session) redirect('/welcome');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน');
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        try {
            const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/UserExists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError('อีเมลนี้มีผู้ใช้งานแล้ว');
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                const form = e.currentTarget;
                setError('');
                setSuccess(
                    <p>
                        สร้างบัญชีสําเร็จ <Link href="/login" className="text-blue-500 hover:underline">เข้าสู่ระบบ</Link>
                    </p>
                );
                form.reset();
                console.log('User Success Register');
            } else {
                console.log('User Failed Register');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-2xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl font-bold text-center'> ลงทะเบียน </h3>
                        <hr className='my-3' />
                        <form onSubmit={handleSubmit}>
                            {error && <p className='text-red-500'>{error}</p>}
                            {success && <p className='text-green-500'>{success}</p>}
                            <input 
                                type="text" 
                                onChange={(e) => setName(e.target.value)} 
                                className='w-full py-3 rounded my-2 border px-3 bg-gray-50' 
                                placeholder='ชื่อ' 
                            />
                            <input 
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='w-full py-3 rounded my-2 border px-3 bg-gray-50' 
                                placeholder='อีเมล' 
                            />
                            <input 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='w-full py-3 rounded my-2 border px-3 bg-gray-50' 
                                placeholder='รหัสผ่าน' 
                            />
                            <input 
                                type="password" 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className='w-full py-3 rounded my-2 border px-3 bg-gray-50' 
                                placeholder='ยืนยันรหัสผ่าน' 
                            />
                            <button 
                                className='w-full py-3 rounded my-2 border px-3 bg-green-500 text-white text-lg font-bold ty' 
                                type='submit'>
                                ลงทะเบียน
                            </button>
                            <hr className='my-3' />
                            <p>มีบัญชีอยู่แล้ว <Link href='/login' className='text-blue-500 hover:underline'>เข้าสู่ระบบ</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default RegisterPage;
