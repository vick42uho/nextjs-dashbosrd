"use client";

import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/AdminNav';
import Container from '../../../components/Container';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Params {
  id: string;
}

function AdminEditPage({ params }: { params: Params }) {
  const { data: session, status } = useSession();
  const { id } = params;
  const router = useRouter();

  const [userOldData, setUserOldData] = useState<any>({});
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
    } else if (session?.user?.role !== 'admin') {
      router.push('/welcome');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  const getUserById = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers/${id}`, {
        method: 'GET',
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await res.json();
      setUserOldData(data.user);
      setNewName(data.user.name);
      setNewEmail(data.user.email);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body: any = {};
      if (newName.trim() !== '') {
        body.newName = newName;
      }
      if (newEmail.trim() !== '') {
        body.newEmail = newEmail;
      }
      if (newPassword.trim() !== '') {
        body.newPassword = newPassword;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error('Failed to update user');
      }

      router.push('/admin/users'); // ใช้ router.push แทนการใช้ redirect

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <AdminNav session={session} />

      <div className='flex-grow'>
        <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
          <Link href="/admin/users" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'>
            กลับ
          </Link>
          <hr className='my-3' />
          <h3 className='text-3xl'>แก้ไขผู้ใช้งาน</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
              placeholder={userOldData?.name}
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
            <input
              type="text"
              className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
              placeholder={userOldData?.email}
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
            />
            <input
              type="password"
              className='w-[400px] block py-3 rounded my-2 border px-3 bg-gray-50'
              placeholder='******'
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <button
              type='submit'
              className='w-[400px] block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md'
            >
              บันทึก
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </Container>
  );
}

export default AdminEditPage;
