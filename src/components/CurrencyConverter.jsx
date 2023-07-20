import { useEffect, useState, useRef } from "react";

import Menu from "./DropdownMenu";
import ToggleButton from "./ToggleButton";
import Loader from "./Loader";

const ConversorMoneda = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("EUR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(0);
  const [exchangeRate, setExchangeRate] = useState("");
  const [error, setError] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/10cf0941422531a7d2042965/latest/${currencyOne}`
      );
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rates[currencyTwo];
        setExchangeRate(`1 ${currencyOne} = ${rate} ${currencyTwo}`);
        setAmountTwo((parseFloat(amountOne) * rate).toFixed(2));
        setError(null);
        setAvailableCurrencies(Object.keys(data.conversion_rates));
      } else {
        setError("Error al obtener la tasa de cambio");
      }
    } catch (error) {
      setError(<Loader />);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [currencyOne, currencyTwo, amountOne, exchangeRate]);

  useEffect(() => {
    const errorTimer = error && setTimeout(() => setError("No se pudo obtener la tasa de cambio. Por favor, inténtalo de nuevo más tarde."), 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);
  

  const handleCurrencyOneChange = (e) => {
    const value = e.target.value.toUpperCase();

    setCurrencyOne(value);
  };
  
  const handleCurrencyTwoChange = (e) => {
    const value = e.target.value.toUpperCase();
    
    setCurrencyTwo(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setAmountOne(value === "" || value === "0" ? "" : value);
  };

  const swapCurrencies = () => {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
  };

  isNaN(amountTwo) && setAmountTwo(0);

  return (
    <main className="my-[5rem] flex flex-col justify-center items-center w-11/12 md:w-3/5 lg:w-2/5 mx-auto">
      <ToggleButton />

      <article className="dark:bg-darkGradient bg-lightGradient flex flex-col items-center gap-12 py-20 px-3 rounded-lg shadow-xl dark:shadow-blue-950 shadow-zinc-700">
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

            <span className="font-semibold text-lg text-blue-950 dark:text-blue-50">
              {exchangeRate}
            </span>

            <section className="flex gap-5 md:gap-10 w-10/12 mx-auto justify-between">
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
                className="bg-transparent focus:bg-blue-600 border font-medium text-white border-zinc-300 text-xl rounded-lg focus:border-blue-50 block w-full px-2.5 py-1.5 dark:bg-transparent dark:focus:bg-indigo-950 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              />
              <Menu
                availableCurrencies={availableCurrencies}
                onChange={handleCurrencyTwoChange}
                value={currencyTwo}
                name="COP"
              />
            </section>

            {loading ? (
              <Loader />
            ) : (
              <svg
                viewBox="0 0 256 256"
                fill="#ffffff"
                stroke="#ffffff"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 cursor-pointer md:hover:scale-110 transition-all duration-100"
                onClick={swapCurrencies}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M213.65723,181.65723l-32,32A8.00038,8.00038,0,0,1,168,208V184H48a8,8,0,0,1,0-16H168V144a8.00038,8.00038,0,0,1,13.65723-5.65723l32,32A8.00122,8.00122,0,0,1,213.65723,181.65723Zm-139.31446-64A8.00038,8.00038,0,0,0,88,112V88H208a8,8,0,0,0,0-16H88V48a8.00038,8.00038,0,0,0-13.65723-5.65723l-32,32a8.00122,8.00122,0,0,0,0,11.31446Z"></path>
                </g>
              </svg>
            )}
            <div className="flex gap-3 justify-between text-center w-full px-3.5">
              <span className="w-1/2 break-words font-semibold text-lg text-blue-950 dark:text-blue-50">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currencyOne,
                }).format(amountOne)}
              </span>

              <span className="font-semibold text-xl text-blue-950 dark:text-blue-50">
                =
              </span>

              <span className="w-1/2 break-words font-semibold text-lg text-blue-950 dark:text-blue-50">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currencyTwo,
                }).format(amountTwo)}
              </span>
            </div>
          </>
        )}
      </article>
    </main>
  );
};

export default ConversorMoneda;
