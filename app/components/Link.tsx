import React from 'react'
import NextLink from 'next/link'
import { Link as Radixlink } from '@radix-ui/themes'

interface Props {
    href: string;
    children: string;
}

const Link = ({ href, children}: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <Radixlink>{children}</Radixlink>
    </NextLink>
  )
}

export default Link