import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full h-[75px] border-b-[1px] border-gray-800 bg-[#0c051c] flex flex-row justify-between items-center px-14 rounded-b-md">
      <div className="text-white text-xl">
        <Link href="/">LOGO</Link>
      </div>
      <div className="space-x-4">
        <Link href="/login">
          <Button
            aschild
            variant="ghost"
            className="text-white py-5 px-6 hover:bg-primary hover:text-white text-lg"
          >
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <Button className="py-5 px-5 text-white text-lg" aschild>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
