"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { CrownIcon, LogOut, StarIcon, User } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isPremium = true;

  useEffect(() => {
    // Obtener información del usuario
    const getUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            id: session.data.user.id,
            name: session.data.user.name || "",
            email: session.data.user.email,
            image: session.data.user.image || undefined,
          });
        }
      } catch (error) {
        console.error("Error getting user session:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setUser(null);
            window.location.href = "/sign-in";
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (email: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500", 
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500"
    ];
    
    // Usar el email para generar un índice consistente
    const hash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <Button variant="outline" asChild>
        <a href="/sign-in">
          <User className="w-4 h-4 mr-2" />
          Iniciar Sesión
        </a>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-0 h-auto w-auto rounded-full group"
        >
          {user.image ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user.image}
                alt={user.name || user.email}
                className="w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/40 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-out"></div>
            </div>
          ) : (
            <div className={`relative w-10 h-10 rounded-full ${getRandomColor(user.email)} text-white flex items-center justify-center text-sm font-semibold cursor-pointer overflow-hidden`}>
              {getInitials(user.name || user.email)}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/40 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-500 ease-out"></div>
            </div>
          )}
          {isPremium && (
            <div className="absolute -top-1.5 -left-1.5 bg-orange-500 rounded-full p-1">
              <CrownIcon className="size-3 text-white" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="font-medium">{user.name || "Usuario"}</div>
          <div className="text-sm text-muted-foreground truncate">
            {user.email}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
