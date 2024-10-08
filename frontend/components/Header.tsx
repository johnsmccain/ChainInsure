'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from "@/components/ui/button"
import Image from 'next/image'


export function Header() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed z-50 bg-[#15173033] w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <nav className="hidden md:flex space-x-8">
          <Link href="#docs" className="text-white hover:text-blue-600">Docs</Link>
          <Link href="#about-us" className="text-white hover:text-blue-600">About us</Link>
          <Link href="#blog" className="text-white hover:text-blue-600">Blog</Link>
          <Link href="#support" className="text-white hover:text-blue-600">Support</Link>
        </nav>
        <Link href="/" className="flex items-center space-x-2">
          {/* <ShieldCheck className="h-8 w-8 text-blue-600" /> */}
          <span className="text-2xl font-light leading-10 text-white font-serif">Chain Insure</span>
        </Link>

        <div className='flex justify-between'>
        <Button className='bg-slate-600 rounded-full text-white mr-4'>Get the app <Image src="/images/arrow-right-sharp.svg" alt="arrow right" 
            height={32}
            width={32}
            className='h-8 w-8 ml-2 self-center'/></Button>
        
        {isConnected ? (
          <Button className = 'bg-white text-black rounded-full hover:bg-blue-600 hover:text-white' onClick={() => disconnect()}>Disconnect</Button>
        ) : (
          <Button className = 'bg-white text-black rounded-full hover:bg-blue-600 hover:text-white' onClick={() => connect({ connector: connectors[0] })}>Connect wallet</Button>
        )}
        </div>

        
      </div>
    </header>
  )
}



