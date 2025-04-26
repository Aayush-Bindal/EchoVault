import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

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
          >
            <FaGoogle className="w-5 h-5" />
            Sign in with Google
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
