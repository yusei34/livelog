'use client';

import Link from "next/link"
import Image from "next/image";
import { Music, User, Calendar, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Header() {
  const currentPath = usePathname();

  return (
    <header className="shadow-xl sticky top-0 z-50 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3">
      <div className=" flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5">
              <Image src="/Gig log.svg" alt="logo" width={150} height={200} className="p-3"/>
          </div>
          {/* <span className="text-2xl font-bold tracking-tight">GIGLog</span> */}
        </Link>

        <nav className="flex border-green-700 gap-4">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center px-3 py-1 rounded-md transition-colors",
              currentPath === "/" ? "bg-white/20 font-medium" : "hover:bg-white/10",
            )}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">ホーム</span>
          </Link>

          <Link
            href="/events"
            className={cn(
              "flex flex-col items-center px-3 py-1 rounded-md transition-colors",
              currentPath === "/events" ? "bg-white/20 font-medium" : "hover:bg-white/10",
            )}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">ライブ一覧</span>
          </Link>

          <Link
            href="/actors"
            className={cn(
              "flex flex-col items-center px-3 py-1 rounded-md transition-colors",
              currentPath === "/actors" ? "bg-white/20 font-medium" : "hover:bg-white/10",
            )}
          >
            <Music className="w-5 h-5" />
            <span className="text-xs mt-1">アーティスト一覧</span>
          </Link>

          <Link
            href="/profile"
            className={cn(
              "flex flex-col items-center px-3 py-1 rounded-md transition-colors",
              currentPath === "/profile" ? "bg-white/20 font-medium" : "hover:bg-white/10",
            )}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">プロフィール</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
