import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const currencyVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

const CurrencyMenu = ({ availableCurrencies, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredCurrencies = availableCurrencies.filter((currency) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const selectMatchingCurrency = () => {
      const matchingCurrency = filteredCurrencies.find(
        (currency) => currency.toLowerCase() === searchTerm.toLowerCase(),
      )
      if (matchingCurrency) {
        setSearchTerm(matchingCurrency)
        setIsOpen(false)
      }
    }

    selectMatchingCurrency()
    setSelectedIndex(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  useEffect(() => {
    if (listRef.current) {
      const clampedIndex = Math.max(0, Math.min(selectedIndex, filteredCurrencies.length - 1))
      listRef.current.children[clampedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }, [selectedIndex, filteredCurrencies.length])

  const selectCurrency = (currency) => {
    setSearchTerm(currency)
    setIsOpen(false)
    inputRef.current.value = currency
    onChange({ target: { value: currency, name } })
  }

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase()
    setSearchTerm(value)
    setIsOpen(true)

    const matchingCurrency = filteredCurrencies.find((currency) => currency.toLowerCase() === value.toLowerCase())

    matchingCurrency && onChange(event)
  }

  const handleOptionClick = (option) => {
    selectCurrency(option)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const matchingCurrency = filteredCurrencies[selectedIndex]
      if (matchingCurrency) {
        selectCurrency(matchingCurrency)
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex === 0 ? filteredCurrencies.length - 1 : prevIndex - 1))
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex === filteredCurrencies.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    !isOpen && searchTerm === '' && setSearchTerm('')
    inputRef.current.focus()
  }

  return (
    <motion.div ref={wrapperRef} initial={false} animate={isOpen ? 'open' : 'closed'} className="flex w-full">
      <div className="flex w-full bg-transparent px-2.5 py-1.5 focus:border-blue-50 border border-indigo-700 rounded-lg">
        <input
          name={name}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="bg-transparent font-medium text-white text-md w-full outline-none"
          placeholder={name}
          ref={inputRef}
        />
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55, color: 'white' }}
          onClick={toggleMenu}
          className="grid place-items-center"
        >
          <svg width="13" height="13" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" fill="#ffffff" />
          </svg>
        </motion.div>
      </div>

      <div className="mt-12 absolute">
        <motion.ul
          ref={listRef}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
                delayChildren: 0.05,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          className={`text-center bg-[#eaedfa] dark:bg-[#6b80db] text-gray-950 flex flex-col max-h-32 ${
            filteredCurrencies.length > 3 ? 'overflow-y-auto' : 'overflow-hidden'
          }`}
        >
          {filteredCurrencies.map((currency, index) => (
            <motion.li
              key={currency}
              variants={currencyVariants}
              onClick={() => handleOptionClick(currency)}
              className={`hover:bg-[#2c45b5] hover:text-white font-medium border-b last:border-none dark:border-purple-950 border-gray-300 px-10 py-1 transition-all duration-100 cursor-pointer ${
                index === selectedIndex ? 'selected' : ''
              }`}
            >
              {currency}
            </motion.li>
          ))}
          {filteredCurrencies.length === 0 && searchTerm !== '' && (
            <motion.li
              variants={currencyVariants}
              style={{ opacity: 0 }}
              className={' w-32  border-b border-gray-500 px-5 py-3 transition-all duration-100 cursor-not-allowed'}
            >
              No se encontraron monedas
            </motion.li>
          )}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default CurrencyMenu
