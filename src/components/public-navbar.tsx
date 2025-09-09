"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "./ui/button";

export const PublicNavbar = () => {

  const auth = authClient.useSession();

  if(auth.isPending) {
    return (
      <nav className="flex justify-between items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </nav>
    )
  }

  if(auth.data?.session) {
    return (
      <nav className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold" aria-label="Inicio">
        <Link href="/">Acme Inc.</Link>
      </h1>

      <div>
        <ul className="flex gap-2">
          <li>
            <Button variant="primary" asChild>
              <Link href="/dashboard">Ir al dashboard</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
    )
  }

  return (
    <nav className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold" aria-label="Inicio">
        <Link href="/">Acme Inc.</Link>
      </h1>

      <div>
        <ul className="flex gap-2">
          <li>
            <Button variant="outline" asChild>
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
          </li>
          <li>
            <Button variant="tertiary" asChild>
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
