"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            if (res?.error) {
                setError(res.error);
                return;
            }
    
            // ทำการ replace เมื่อทำการ render เสร็จแล้ว
            router.replace('welcome');
    
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (session) {
            router.replace('welcome');
        }
    }, [session]);

    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-2xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl font-bold text-center'> เข้าสู่ระบบ </h3>
                        <hr className='my-3'/>
                        <form onSubmit={handleSubmit}>
                            {error && <p className='text-red-500'>{error}</p>}
                            <input type="text" onChange={e => setEmail(e.target.value)} className='w-full py-3 rounded my-2 border px-3 bg-gray-50' placeholder='อีเมล' />
                            <input type="password" onChange={e => setPassword(e.target.value)} className='w-full py-3 rounded my-2 border px-3 bg-gray-50' placeholder='รหัสผ่าน' />
                            <button className='w-full py-3 rounded my-2 border px-3 bg-green-500 text-white text-lg font-bold ty' type='submit'>เข้าสู่ระบบ</button>
                            <hr className='my-3' />
                            <p>ยังไม่ได้เป็นสมาชิก <Link href='/register' className='text-blue-500 hover:underline'>ลงทะเบียน</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default LoginPage;
