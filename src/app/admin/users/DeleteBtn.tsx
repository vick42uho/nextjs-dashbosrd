"use client";
import React from 'react';

interface DeleteBtnProps {
    id: string; // ระบุชนิดข้อมูลของ id เป็น string
}

function DeleteBtn({ id }: DeleteBtnProps) {
    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');

        if (confirmed) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers?id=${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Failed to delete user');
                }
            } catch (error) {
                console.error(error);
                // Handle error
            }
        }
    };

    return (
        <a onClick={handleDelete} className='bg-red-500 text-white border px-2 py-1 rounded-md text-md my-2 ml-2 cursor-pointer'>
            ลบ
        </a>
    );
}

export default DeleteBtn;
