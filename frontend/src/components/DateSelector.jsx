import React from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css";

const DateSelector = ({ selectedDate, setSelectedDate, onDateChange }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  return (
    <div className="date-selector-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        onCalendarClose={() => onDateChange(selectedDate)}
        maxDate={new Date()}
        dateFormat="MMMM d, yyyy"
        className="form-control date-picker-input"
        wrapperClassName="date-picker-wrapper"
      />
      <Button
        variant="light"
        size="sm"
        className="ms-2 today-btn"
        onClick={handleTodayClick}
      >
        Today
      </Button>
    </div>
  );
};

export default DateSelector;
