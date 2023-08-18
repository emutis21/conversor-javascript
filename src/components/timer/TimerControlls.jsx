export const TimerControls = ({ handleStop, handleReset }) => {
  return (
    <div className="flex justify-center items-center gap-6">
      <button
        className="
        bg-indigo-500 dark:bg-indigo-700 self-center py-2 px-6 font-semibold text-lg rounded-full p-2
        hover:bg-indigo-600 text-white dark:hover:bg-indigo-800 transition-all duration-200 ease-in-out
        "
        onClick={handleStop}
      >
        Detener
      </button>
      <button
        className="
        bg-violet-500 dark:bg-violet-700 self-center py-2 px-6 font-semibold text-lg rounded-full p-2
        hover:bg-violet-600 text-white dark:hover:bg-violet-800 transition-all duration-200 ease-in-out
        "
        onClick={handleReset}
      >
        Reiniciar
      </button>
    </div>
  )
}
