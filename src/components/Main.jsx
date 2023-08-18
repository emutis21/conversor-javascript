import { AnimatePresence, motion } from 'framer-motion'
import { useSelectedTab } from './hooks/useLocalStorage'

import TabNavigation from './TabNavigation'
import ToggleButton from './ToggleButton'

export const Main = ({ components }) => {
  const { selectedTab, setSelectedTab } = useSelectedTab(components[0], components)

  return (
    <main className="flex flex-col mt-[10rem] justify-center items-center w-11/12 md:w-3/5 lg:w-2/5 mx-auto">
      <ToggleButton />

      <TabNavigation components={components} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <aside className="dark:bg-darkGradient w-full bg-lightGradient flex flex-col items-center gap-12 py-20 px-3 rounded-b-lg shadow-xl dark:shadow-blue-950 shadow-zinc-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {selectedTab ? selectedTab.component : 'No component selected'}
          </motion.div>
        </AnimatePresence>
      </aside>
    </main>
  )
}
