"use client"
import React, { useState } from 'react'

function DeleteBtn({ id }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this post?')

        if (confirmed) {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?id=${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                window.location.reload()
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <a 
            onClick={handleDelete} 
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-2 mr-2 text-sm rounded-md cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ pointerEvents: loading ? 'none' : 'auto' }}
        >
            {loading ? 'กำลังลบ...' : 'ลบโพส'}
        </a>
    )
}

export default DeleteBtn
