"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { Separator } from "@/components/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            console.log("Inicio de sesión exitoso");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            console.error("Error en el inicio de sesión:", ctx.error);
            setError(ctx.error.message || "Error al iniciar sesión");
          },
        }
      );
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const onSocial = (provider: "google" | "github" | "discord") => {
    authClient.signIn.social(
      {
        provider,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (err) => {
          console.error("Error inesperado:", err);
          setError("Error inesperado al iniciar sesión");
        },
      }
    );
  };

  return (
    <>
      <header className="flex flex-col gap-2 mb-4 items-center">
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <p className="text-sm text-gray-500">
          Ingresa tu email y contraseña para iniciar sesión
        </p>
      </header>
      <div className="border border-gray-200 rounded-md p-4 max-w-md mx-auto w-full">
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              variant="tertiary"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Form>

        <Separator text="o continúa con" variant="lines" width="100%" />

        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={isLoading}
            onClick={() => onSocial("google")}
          >
            Iniciar con Google
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 justify-center items-center">
        <p className="text-sm text-zinc-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </>
  );
};
