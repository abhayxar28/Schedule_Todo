"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { ButtonWithCheckBox } from "./ui/button-check"
import { ButtonWithSchedule } from "./ui/button-schedule"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm bg-white relative">
      <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center gap-4">
        <ButtonWithCheckBox />
        <ButtonWithSchedule />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden relative">
        <Menu
          className="w-6 h-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-md flex flex-col items-start p-4 gap-3 z-50 min-w-[160px]">
            <ButtonWithCheckBox />
            <ButtonWithSchedule />
            <button
              onClick={() => {
                setOpen(false)
                signOut({ callbackUrl: "/" })
              }}
              className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
