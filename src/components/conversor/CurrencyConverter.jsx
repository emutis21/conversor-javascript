import { useEffect, useState } from 'react'

import Menu from './DropdownMenu'
import Loader from './Loader'
import { Arrows } from '/src/components/icons'

const ConversorMoneda = () => {
  const [currencyOne, setCurrencyOne] = useState('USD')
  const [currencyTwo, setCurrencyTwo] = useState('EUR')
  const [amountOne, setAmountOne] = useState(1)
  const [amountTwo, setAmountTwo] = useState(0)
  const [exchangeRate, setExchangeRate] = useState('')
  const [error, setError] = useState(null)
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchExchangeRate = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
      // `https://v6.exchangerate-api.com/v6/10cf0941422531a7d2042965/latest/${currencyOne}`
      )
      const data = await response.json()

      if (data.result === 'success') {
        const rate = data.conversion_rates[currencyTwo]
        setExchangeRate(`1 ${currencyOne} = ${rate} ${currencyTwo}`)
        setAmountTwo((parseFloat(amountOne) * rate).toFixed(2))
        setError(null)
        setAvailableCurrencies(Object.keys(data.conversion_rates))
      } else {
        setError('Error al obtener la tasa de cambio')
      }
    } catch (error) {
      setError(<Loader />)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchExchangeRate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyOne, currencyTwo, amountOne, exchangeRate])

  useEffect(() => {
    const errorTimer =
      error &&
      setTimeout(() => setError('No se pudo obtener la tasa de cambio. Por favor, inténtalo de nuevo más tarde.'), 3000)
    return () => clearTimeout(errorTimer)
  }, [error])

  const handleCurrencyOneChange = (e) => {
    const value = e.target.value.toUpperCase()

    setCurrencyOne(value)
  }

  const handleCurrencyTwoChange = (e) => {
    const value = e.target.value.toUpperCase()

    setCurrencyTwo(value)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setAmountOne(value === '' || value === '0' ? '' : value)
  }

  const swapCurrencies = () => {
    setCurrencyOne(currencyTwo)
    setCurrencyTwo(currencyOne)
  }

  isNaN(amountTwo) && setAmountTwo(0)

  return (
    <article className="flex flex-col items-center gap-12 py-20 px-3">
      {error && (
        <span className="font-bold xl:text-4xl md:text-3xl text-lg md:pb-10 pb-5 text-center text-red-500 grid place-items-center ">
          {error}
        </span>
      )}

      {!error && (
      <>
        <h1 className="font-bold text-center mb-12 xl:text-5xl md:text-4xl text-xl dark:text-[hsl(245,40%,95%)] text-[hsl(245,40%,30%)]">
          Elige la moneda y la cantidad para realizar la conversión
        </h1>

        <span className="font-semibold text-lg text-blue-950 dark:text-blue-50">{exchangeRate}</span>

        <section className="flex gap-5 md:gap-10 mx-auto justify-between">
          <Menu
            availableCurrencies={availableCurrencies}
            onChange={handleCurrencyOneChange}
            value={currencyOne}
            name="USD"
          />
          <input
            type="number"
            id="cantidad-uno"
            value={amountOne}
            onChange={handleChange}
            min="0"
            placeholder="0"
            autoFocus
            className="p-2 border-2 border-gray-600 dark:border-gray-300 rounded-md text-base outline-none caret-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-transparent text-white transition-all duration-300 font-semibold block w-full px-2.5 py-1.5 dark:bg-transparent focus:bg-indigo-800 dark:focus:bg-indigo-950 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <Menu
            availableCurrencies={availableCurrencies}
            onChange={handleCurrencyTwoChange}
            value={currencyTwo}
            name="COP"
          />
        </section>

        {loading ? <Loader /> : <Arrows swapCurrencies={swapCurrencies} />}
        <div className="flex gap-3 justify-between text-center w-full px-3.5">
          <span className="w-1/2 break-words font-semibold text-lg text-blue-950 dark:text-blue-50">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currencyOne,
            }).format(amountOne)}
          </span>

          <span className="font-semibold text-xl text-blue-950 dark:text-blue-50">=</span>

          <span className="w-1/2 break-words font-semibold text-lg text-blue-950 dark:text-blue-50">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currencyTwo,
            }).format(amountTwo)}
          </span>
        </div>
      </>
      )}
    </article>
  )
}

export default ConversorMoneda
