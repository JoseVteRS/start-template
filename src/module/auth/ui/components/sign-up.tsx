"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";

const signInSchema = z.object({
  username: z.string(),
  email: z.email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    authClient.signUp.email(
      {
        email: data.email,
        name: data.username,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          setError(`Error inesperado al registrar usuario: ${error.error.message}`);
        },
      }
    );
  };

  const onSocial = (provider: "google" | "github" | "discord") => {
    authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <>
      <header className="flex flex-col gap-2 mb-4 items-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-500">
          Enter your email and password to sign up
        </p>
      </header>
      <div className="border border-gray-200 rounded-md p-4 max-w-md mx-auto w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  {/* <FormDescription /> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  {/* <FormDescription /> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {/* <FormDescription /> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" variant="primary">
              Sign Up
            </Button>
          </form>
        </Form>

        <Separator text="with social" variant="lines" width="100%" />

        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onSocial("google")}
          >
            Sign In with Google
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 justify-center items-center">
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};
