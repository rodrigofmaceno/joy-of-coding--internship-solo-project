'use client';

import { Button } from '@radix-ui/themes';
import React from 'react'

interface Props {
    children: React.ReactNode,
    onClick: () => void,
}

const MyButton = ({children, onClick}: Props) => {
  return (
    <Button onClick={onClick} variant="outline">{children}</Button>
  )
}

export default MyButton