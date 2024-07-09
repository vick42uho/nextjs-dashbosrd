"use client"
import React from 'react'

function DeleteBtn({ id }) {

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this user?')

        if (confirmed) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/totalusers?id=${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                window.location.reload()
            }
        }
    }
    return (
        <a onClick={handleDelete} className='bg-red-500 text-white border px-2 py-1 rounded-md text-md my-2 ml-2 cursor-pointer'>
            ลบ
        </a>
    )
}

export default DeleteBtn