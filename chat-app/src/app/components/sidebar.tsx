"use client";
import React, { useState } from "react";
import { MessageCircle, Settings, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relativ">
      {/* Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button> */}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 ease-in-out w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-center flex-row-reverse">
          <Image src="/Images/logo.png" height={100} width={100} alt="" />
          <h1 className="text-xl font-semibold text-gray-900">ChatApp</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors hover:text-blue-600 cursor-pointer">
                <MessageCircle size={20} />
                <span>Chats</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors hover:text-blue-600 cursor-pointer">
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
