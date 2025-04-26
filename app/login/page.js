"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import useAuthStore from "@/stores/auth-store";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-panel p-10 w-full max-w-lg neon-glow animate-fade-in">
        <h2 className="text-4xl font-bold mb-8 text-center">Welcome Back</h2>
        <form className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="h-14 text-lg bg-dark-lighter text-white border border-white/10"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-14 text-lg bg-dark-lighter text-white border border-white/10"
            />
          </div>

          <Button
            asChild
            className="w-full h-14 text-lg hover:bg-neon-purple/80"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            className="w-full h-14 text-lg border border-white/10 flex items-center justify-center gap-3 hover:bg-dark-lighter/80"
            variant="outline"
            type="button"
            aschild
          >
            <FaGoogle className="w-5 h-5" />
            Sign in with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-base">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-neon-cyan hover:text-neon-cyan/80 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
