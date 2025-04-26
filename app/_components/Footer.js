function Footer() {
  return (
    <footer className="bg-[#0B0B1F] text-[#d1d5db] px-6 py-10 w-full h-72">
      <hr className="" />
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6 pt-9">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          EchoVault
        </h2>

        <div className="flex space-x-6 mt-4">
          <a href="#" className="hover:text-cyan-400 transition">
            Instagram
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Twitter
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          © 2025 EchoVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
