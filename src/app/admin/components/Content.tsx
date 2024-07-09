import React from 'react';
import { FaUsers, FaRegNewspaper } from 'react-icons/fa';
import Link from 'next/link';  // Import Link from next/link

function Content({ totalUsersData, totalPostsData }) {
    return (
        <div className='px-10 rounded-lg'>
            <div className='flex'>

                <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <Link href='/admin/users'><h3 className='flex items-center'><FaUsers className='mr-2' />จำนวนผู้ใช้งาน</h3></Link>
                    <p className='text-5xl mt-10'>
                        <Link href='/admin/users'>
                            {totalUsersData?.length}
                        </Link>
                    </p>
                </div>

                <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <Link href='/admin/posts'><h3 className='flex items-center'><FaRegNewspaper className='mr-2' />จำนวนโพส</h3></Link>
                    <p className='text-5xl mt-10'>
                        <Link href='/admin/posts'>
                            {totalPostsData?.length}
                        </Link>
                    </p>
                </div>
            </div>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quae eum, architecto, molestiae provident veniam blanditiis sed dolore vel neque commodi. Quas eos voluptatem quos voluptatibus eius nesciunt non quibusdam!
            </p>
        </div>
    );
}

export default Content;
