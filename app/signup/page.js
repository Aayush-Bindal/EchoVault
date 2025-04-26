"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import useAuth from "@/stores/auth-store";
const googleAuth =
  "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=288454961127-jmj2th7slpfcitc9u8c0pa2j9utftc7b.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgoogle%2Fcallback%2F&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&state=gqCE5W7jdkCdi1ILpuNoaa7nPqGzOy&access_type=offline&include_granted_scopes=true&prompt=consent";
const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-panel p-10 w-full max-w-lg neon-glow animate-fade-in scale-105">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Create Account
        </h2>
        <form className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              className="h-14 text-lg bg-secondary text-white border border-border"
            />
          </div>
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
            className="w-full h-14 text-lg hover:bg-neon-purple/80"
            asChild
          >
            <Link href="signup">Sign Up </Link>
          </Button>

          <Button
            className="w-full h-14 text-lg border border-white/10 flex items-center justify-center gap-3 hover:bg-dark-lighter/80"
            variant="outline"
            type="button"
            asChild
          >
            <Link href={googleAuth}>
              <FaGoogle className="w-5 h-5" />
              Sign in with Google
            </Link>
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-base">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-neon-cyan hover:text-neon-cyan/80 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
