export const InputField = ({ value, onChange, name, autofocus }) => {
  return (
    <input
      className="bg-transparent text-center text-white transition-all duration-300 font-semibold w-full input-style p-2 border-2 border-gray-300 rounded-md text-xl outline-none caret-white focus:border-blue-600 focus:bg-indigo-800 dark:focus:bg-indigo-950 dark:focus:border-blue-500 focus:ring-2 dark:focus:ring-blue-500 focus:ring-blue-600"
      type="number"
      placeholder={name}
      value={value}
      onChange={onChange}
      autoFocus={autofocus}
      required
    />
  )
}
