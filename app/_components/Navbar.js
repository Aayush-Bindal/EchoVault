import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="w-full h-[75px] border-b-[1px] border-gray-800 bg-[#0c051c] flex flex-row justify-between items-center px-14 rounded-b-md">
      <div className="text-white text-xl">LOGO</div>
      <div className="space-x-4">
        <Button
          variant="ghost"
          className="text-white py-5 px-6 hover:bg-primary hover:text-white"
        >
          Login
        </Button>
        <Button className="py-5 px-5 text-white">Sign Up</Button>
      </div>
    </div>
  );
}

export default Navbar;
