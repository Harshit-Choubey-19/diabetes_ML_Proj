import React from "react";
import { motion } from "framer-motion";

const NonDiabetic = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit bg-gray-100">
      <motion.h1
        className="text-3xl font-bold text-green-600"
        animate={{ scale: [1, 1.2, 1] }} // Scale from 1 to 1.2 and back to 1
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }} // Increased duration for slower animation
      >
        Hurray! 🎉
      </motion.h1>
      <p className="mt-4 text-xl">You do not have diabetes!</p>
      <p className="mt-2 text-lg text-gray-700">
        Keep up the great work maintaining your health!
      </p>
    </div>
  );
};

export default NonDiabetic;
