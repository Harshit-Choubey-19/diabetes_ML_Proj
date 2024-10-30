import React from "react";
import { motion } from "framer-motion";

const Diabetic = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit bg-gray-100">
      <motion.h1
        className="text-3xl font-bold text-red-600"
        animate={{ scale: [1, 1.2, 1] }} // Scale from 1 to 1.2 and back to 1
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop" }} // Increased duration for slower animation
      >
        Oops! 😟
      </motion.h1>
      <p className="mt-4 text-xl">You have diabetes.</p>
      <p className="mt-2 text-lg text-gray-700">
        It's important to manage your health.{" "}
        <b>Please consult a doctor for guidance.</b>
      </p>
    </div>
  );
};

export default Diabetic;
