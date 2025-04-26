import { Button } from "@/components/ui/button";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
function Navbar() {
  return (
    <div className="w-full h-[75px] border-b-[1px] border-gray-800 bg-[#0c051c] flex flex-row justify-between items-center pr-14 pl-10 rounded-b-md">
      <div className="text-white text-xl mr-0">
        <Link href="/">
          <Image src={logo} width={60} />{" "}
        </Link>
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
