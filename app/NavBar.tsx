'use client'

import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames  from 'classnames'
import {Avatar, Box, Container, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRoot, DropdownMenuTrigger, Flex, Text} from "@radix-ui/themes"
import { useSession } from "next-auth/react"
import { Skeleton } from '@/app/components'

const NavBar = () => {
  

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href:'/issues/list'},
    ]

  return (
    <ul className="flex space-x-6">
        {links.map(link => 
          <li key={link.href}>
            <Link 
                className={classNames({
                  "nav-link": true,
                  '!text-zinc-900' : link.href === currentPath,
                })}
                href={link.href}
                >
                    {link.label}
                </Link>
            </li>
          )}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <Skeleton width="3rem" />

  if (status === "unauthenticated")
    return <Link className='nav-link' href="/api/auth/signin">Login</Link>

  return (
    <Box>
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <Avatar 
              src={session!.user!.image!} 
              fallback="?"
              size="2"
              radius='full'
              className='cursor-pointer'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Text size="2">
                {session!.user!.email}
              </Text>
            </DropdownMenuLabel>
             <DropdownMenuItem>
               <Link href="/api/auth/signout">Log Out</Link>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuRoot>
    </Box>
  )
}

export default NavBar