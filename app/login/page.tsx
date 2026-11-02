"use client";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const router = useRouter();

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setError('')

      try {
         await signIn.email(
            {
               email,
               password,
            },
            {
               onRequest: () => {
                  setLoading(true)
               },
               onSuccess: () => {
                  setLoading(false);
                  router.push("/todo");
               },
               onError: (ctx) => {
                  setLoading(false);
                  setError(ctx.error.message);
               },
            },
         );
      } catch (error) {
         setLoading(false);
         setError("unexpected error occured. dw, it's not ur fault. it's us");
      }
   }
   return (
      <main className=" p-23 mx-auto text-neutral-900">
         <Card className="p-7 items-center rounded-4xl bg-white text-neutral-900 inset-shadow-sm inset-shadow-neutral-950">
            <CardHeader className="min-w-xs">
               <CardTitle className="text-2xl font-bold">Login</CardTitle>
               <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
               <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="email" className="font-semibold">
                        Email
                     </label>
                     <input
                        type="email"
                        name="email"
                        id="email"
                        className="outline-2 py-2 px-4 rounded-xl"
                        placeholder="johndoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="password" className="font-semibold">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        className="outline-2 py-2 px-4 rounded-xl"
                        placeholder="●●●●●●●●●"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                     />
                  </div>
                  {error && <p className="text-destructive">{error}</p>}
                  <Button className="px-10 py-5 text-lg w-full" disabled={loading} type="submit">
                     {loading ? "Logging in..." : "Login"}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </main>
   );
}
