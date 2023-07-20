import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ToggleButton = () => {
  const [isSelected, setIsSelected] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    setDarkModeInLocalStorage(isSelected);
    const bodyElement = document.body;
    bodyElement.classList.toggle("dark", isSelected);
    bodyElement.classList.toggle("light", !isSelected);
  }, [isSelected]);

  const toggleDarkMode = () => {
    setIsSelected(!isSelected);
  };

  const setDarkModeInLocalStorage = (isSelected) => {
    localStorage.setItem("darkMode", isSelected ? "true" : "false");
  };

  return (
    <div
      className={`active:scale-95 shadow-md hover:shadow-lg hover:shadow-zinc-800 shadow-zinc-950 dark:hover:shadow-zinc-700 dark:shadow-zinc-600 cursor-pointer mb-6 self-end w-12 h-6 md:w-16 md:h-10 flex items-center bg-gray-300 rounded-full p-1 duration-200 transition-all ${
        isSelected ? " dark:bg-blue-700 justify-end" : "justify-start"
      } `}
      onClick={toggleDarkMode}
    >
      <motion.div
        transition={spring}
        layout
        className="bg-white w-4 h-4 md:w-8 md:h-8 rounded-full shadow-md"
      ></motion.div>
    </div>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default ToggleButton;
