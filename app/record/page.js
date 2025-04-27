"use client";

import { MicIcon } from "lucide-react";
import { useState } from "react";
import * as motion from "motion/react-client";

function Record() {
  const [click, setClick] = useState(false);

  return (
    <div className="flex flex-col items-center mt-36 min-h-screen">
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setClick(!click)}
        className="w-64 h-64 bg-sky-300 rounded-full flex justify-center items-center shadow-[0_0_30px_10px_rgba(56,189,248,0.7)]"
      >
        <MicIcon width={100} />
      </motion.div>
      <p className="text-4xl font-bold mb-8 text-center text-white pt-20">
        {click ? "Record" : "Recording 🔴"}
      </p>
    </div>
  );
}

export default Record;
