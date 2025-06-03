import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div>
        <Link href='/'><h1 className="text-2xl font-bold">GigLog</h1></Link>
    </div>
  )
}

export default Header