import { Main } from './components/Main'

import CurrencyConverter from './components/conversor/CurrencyConverter'
import Timer from './components/timer/Timer'

import './index.scss'

export default function App() {
  const components = [
    { icon: '💰', label: 'Converter', component: <CurrencyConverter /> },
    { icon: '⏲️', label: 'Timer', component: <Timer /> },
  ]

  return (
    <>
      <Main components={components} />
    </>
  )
}
