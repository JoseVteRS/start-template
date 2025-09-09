"use client";

import { Button } from "@/components/ui/button";
import { AuthButton } from "@/module/auth/ui/components/auth-button";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 w-full z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <a href="/dashboard" className="flex items-center ml-2 md:ml-0">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Acme Inc.</span>
              <span className="text-sm text-gray-500 font-medium">Dashboard</span>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
