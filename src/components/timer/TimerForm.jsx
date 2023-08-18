import { InputField } from "./InputField"

export const TimerForm = ({
  handleStart,
  inputHours,
  setInputHours,
  inputMinutes,
  setInputMinutes,
  inputSeconds,
  setInputSeconds,
}) => {
  return (
    <form onSubmit={handleStart} className="flex gap-6 flex-col w-11/12">
      <div className="flex gap-3">
        <InputField
          value={inputHours}
          onChange={(e) => {
            const newValue = e.target.value.replace(/^0+/, '')
            setInputHours(newValue)
          }}
          name='Horas'
        />
        <InputField
          value={inputMinutes}
          onChange={(e) => {
            const newValue = e.target.value.replace(/^0+/, '')
            setInputMinutes(newValue)
          }}
          name='Minutos'
          autofocus={true}
        />
        <InputField
          value={inputSeconds}
          onChange={(e) => {
            const newValue = e.target.value.replace(/^0+/, '')
            setInputSeconds(newValue)
          }}
          name='Segundos'
        />
      </div>
      <button 
        className="
        bg-blue-500 dark:bg-blue-700 self-center py-3 px-8 font-semibold text-lg rounded-full p-2
        hover:bg-blue-600 text-white dark:hover:bg-blue-800 transition-all duration-200 ease-in-out
        "
        type="submit"
      >
        Iniciar
      </button>
    </form>
  )
}
