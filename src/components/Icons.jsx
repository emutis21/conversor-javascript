export const Arrows = ({ swapCurrencies }) => {
  return (
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
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M213.65723,181.65723l-32,32A8.00038,8.00038,0,0,1,168,208V184H48a8,8,0,0,1,0-16H168V144a8.00038,8.00038,0,0,1,13.65723-5.65723l32,32A8.00122,8.00122,0,0,1,213.65723,181.65723Zm-139.31446-64A8.00038,8.00038,0,0,0,88,112V88H208a8,8,0,0,0,0-16H88V48a8.00038,8.00038,0,0,0-13.65723-5.65723l-32,32a8.00122,8.00122,0,0,0,0,11.31446Z"></path>
      </g>
    </svg>
  )
}

export const SunIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="currentColor sun"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  )
}

export const MoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="currentColor moon"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </svg>
  )
}
