"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreatePage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');

    if (status === 'loading') {
        return <p>กำลังโหลด...</p>;
    }

    if (!session) {
        router.push('/login');
        return null; // ต้องมี return หลังจาก redirect
    }

    const userEmail = session.user.email;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !img || !content) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    img,
                    content,
                    userEmail,
                }),
            });

            if (res.ok) {
                router.push('/welcome');
            } else {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Navbar session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href="/welcome" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'>
                        กลับ
                    </Link>
                    <hr className='my-3' />
                    <h3 className='text-3xl'>สร้างโพส</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            placeholder='หัวข้อ'
                        />
                        <input
                            onChange={(e) => setImg(e.target.value)}
                            type="text"
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            placeholder='ลิงก์รูปภาพ'
                        />
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
                            placeholder='เนื้อหา'
                        />
                        <button
                            type='submit'
                            name='create'
                            className='w-[400px] block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'
                        >
                            สร้าง
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default CreatePage
