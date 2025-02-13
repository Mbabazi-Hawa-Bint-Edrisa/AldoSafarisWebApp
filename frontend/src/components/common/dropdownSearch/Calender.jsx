import { useState } from "react";
import DatePicker from "react-multi-date-picker";

export default function Calender({ onChange }) {
  const [date, setDate] = useState(null); // Single date

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate.format("YYYY-MM-DD")); // Pass formatted date to parent
    }
  };

  return (
    <DatePicker
      inputClass="custom_input-picker"
      containerClassName="custom_container-picker"
      value={date}
      onChange={handleDateChange}
      numberOfMonths={1} // Show only one month at a time
      offsetY={10}
      format="MMMM DD, YYYY" // Adjust format as needed
    />
  );
}
