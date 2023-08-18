import { motion } from 'framer-motion'

import { useDarkMode } from './hooks/useLocalStorage'
import { MoonIcon, SunIcon } from './icons'

const ToggleButton = () => {
  const { isSelected, toggleDarkMode } = useDarkMode()

  return (
    <div
      className={`active:scale-95 shadow-md hover:shadow-lg hover:shadow-zinc-800 shadow-zinc-950 dark:hover:shadow-zinc-700 dark:shadow-zinc-600 cursor-pointer mb-6 self-end w-14 h-8 md:w-16 md:h-10 flex items-center bg-gray-200 rounded-full p-1 duration-200 transition-all ${
        isSelected ? ' dark:bg-blue-700 justify-end' : 'justify-start'
      } `}
      onClick={toggleDarkMode}
    >
      <motion.div
        transition={spring}
        layout
        className="bg-transparent w-6 h-6 md:w-8 md:h-8 rounded-full"
      >
        {isSelected ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </div>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export default ToggleButton
