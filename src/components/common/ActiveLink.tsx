"use client"
import { TActiveLinkProps } from '@/app/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const ActiveLink = ({ url = "/", children }: TActiveLinkProps) => {
    const pathName = usePathname()
    const isActive = pathName === url

    return (
        <Link href={url} className={`flex gap-3  p-4 rounded-md items-center 
        ${isActive ? "bg-primary text-white svg-animate" : "hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all"}`}>
            {children}
        </Link>
    )
}

export default ActiveLink
