import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <footer className='p-3 bg-[#333] text-white text-center'>
            <p>
                Copyright &copy;{' '}
                <Link href='https://github.com/vick42uho' className='hover:text-green-500 cursor-pointer' target="_blank">
                    Dev-wick
                </Link>{' '}
                2024
            </p>
        </footer>
    );
}

export default Footer;
