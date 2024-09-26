import { useState, useEffect } from 'react';

const DateNavigator = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  useEffect(() => {
    const formattedDate = `${month + 1}/${day}/${year}`;
    // You can use this formattedDate to display the current date
  }, [day, month, year]);

  const handleNextDay = () => {
    const newDate = new Date(year, month, day + 1);
    setDate(newDate);
    setDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  const handlePreviousDay = () => {
    const newDate = new Date(year, month, day - 1);
    setDate(newDate);
    setDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-white/20 text-white py-2 px-4 rounded-md hover:bg-white/30 transition-colors"
        onClick={handlePreviousDay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="text-lg font-bold mx-4">
        {month + 1}/{day}/{year}
      </span>
      <button
        className="bg-white/20 text-white py-2 px-4 rounded-md hover:bg-white/30 transition-colors"
        onClick={handleNextDay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 5.293a1 1 0 010 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 010-1.414L12.707 5.293a1 1 0 00-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default DateNavigator;