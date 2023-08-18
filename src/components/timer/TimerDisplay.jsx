export const TimerDisplay = ({ timerValue }) => {
  const formattedTime = `${Math.floor(timerValue / 3600)
    .toString()
    .padStart(2, '0')}:${Math.floor((timerValue % 3600) / 60)
    .toString()
    .padStart(2, '0')}:${(timerValue % 60).toString().padStart(2, '0')}`

  let textColorClass = 'text-green-500'
  if (timerValue <= 60) {
    textColorClass = 'text-red-500'
  } else if (timerValue <= 120) {
    textColorClass = 'text-yellow-500'
  }

  return <h3 className={`text-4xl text-center text-white ${textColorClass}`}>{formattedTime}</h3>
}
