import React, { useState } from "react";
import { motion } from "framer-motion";
import Diabetic from "./Diabetic";
import NonDiabetic from "./NonDiabetic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MainDiv = () => {
  const [formData, setFormData] = useState({
    age: "",
    glucose: "",
    insulin: "",
    bmi: "",
  });
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [show, setShow] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ age, glucose, insulin, bmi }) => {
      try {
        const res = await fetch("http://127.0.0.1:5000/app/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ age, glucose, insulin, bmi }),
        });

        const data = await res.json();

        // Check if the response is ok (status in the range 200-299)
        if (!res.ok && !data.message) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        throw error; // Rethrow the error to handle it in onError if needed
      }
    },
    onSuccess: (data) => {
      setShow(true);
      if (data.prediction == 1) {
        setIsDiabetic(true);
        if (window.innerWidth <= 560) {
          toast("Oops! You have diabetes.", {
            icon: "😟",
          });
        }
      } else {
        setIsDiabetic(false);
        if (window.innerWidth <= 560) {
          toast("Hurray! You do not have diabetes!", {
            icon: "🎉",
          });
        }
      }
    },
    onError: (error) => {
      console.error("Mutation in MainDiv error: ", error);
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const resetFn = (e) => {
    e.preventDefault();
    setShow(false);
    setFormData({
      age: "",
      glucose: "",
      insulin: "",
      bmi: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded px-8 py-6 mb-4 w-96 mt-8 ml-2"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Health Information
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              className="input input-bordered w-full max-w-xs bg-white"
              placeholder="Enter your age"
              onChange={handleInputChange}
              value={formData.age}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="glucose"
            >
              Blood Sugar Level
            </label>
            <input
              type="number"
              name="glucose"
              onChange={handleInputChange}
              value={formData.glucose}
              className="input input-bordered w-full max-w-xs bg-white"
              placeholder="Enter blood sugar level"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="insulin"
            >
              Insulin Level
            </label>
            <input
              type="number"
              name="insulin"
              onChange={handleInputChange}
              value={formData.insulin}
              className="input input-bordered w-full max-w-xs bg-white"
              placeholder="Enter insulin level"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bmi"
            >
              BMI
            </label>
            <input
              type="number"
              name="bmi"
              onChange={handleInputChange}
              value={formData.bmi}
              className="input input-bordered w-full max-w-xs bg-white"
              placeholder="Enter your BMI"
              required
            />
          </div>

          <div className="flex items-center justify-evenly">
            <motion.div whileHover={{ scale: 1.2 }}>
              <button type="submit" className="btn btn-outline btn-accent">
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <button className="btn btn-outline btn-warning" onClick={resetFn}>
                Reset
              </button>
            </motion.div>
          </div>
        </form>

        {show && (
          <div className="ml-4 mt-8 mb-4 max-[560px]:hidden">
            {isDiabetic ? <Diabetic /> : <NonDiabetic />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDiv;
