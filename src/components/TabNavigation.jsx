import { motion } from 'framer-motion'

const TabNavigation = ({ components, selectedTab, setSelectedTab }) => {
  return (
    <nav className="rounded-t-lg dark:bg-darkGradient bg-lightGradient border-b-4 border-solid border-blue-300 dark:border-blue-500/50 h-full w-full justify-between items-center">
      <ul className="font-medium text-[14px] flex w-full">
        {components.map((item) => (
          <li
            key={item.label}
            className={`rounded-t-lg py-4 w-full relative text-white transition-all duration-0 text-center cursor-pointer h-full flex items-center justify-center select-none ${
              item.label === selectedTab.label ? 'selected' : 'no-selected'
            }`}
            onClick={() => setSelectedTab(item)}
          >
            {`${item.icon} ${item.label}`}
            {item.label === selectedTab.label ? (
              <motion.div
                className="absolute bottom-[-4px] left-0 right-0 h-[4px] bg-violet-500 dark:bg-indigo-500"
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TabNavigation
