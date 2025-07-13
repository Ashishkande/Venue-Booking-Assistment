import { useState, useEffect } from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ venue, onDateSelect }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (venue?.unavailableDates) {
      const dates = venue.unavailableDates.map(d => new Date(d.date));
      setBookedDates(dates);
    }
  }, [venue]);

  const tileDisabled = ({ date, view }) => {
    if (view !== 'month') return false;
    return bookedDates.some(d => isSameDay(d, date));
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const isBooked = bookedDates.some(d => isSameDay(d, date));
    return isBooked ? (
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
    ) : null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Availability Calendar</h3>
      <Calendar
        onChange={(value) => {
          setDate(value);
          onDateSelect(value);
        }}
        value={date}
        minDate={new Date()}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        className="border-0 w-full"
      />
      <div className="mt-4 flex items-center">
        <div className="w-4 h-4 bg-red-500 mr-2"></div>
        <span className="text-sm">Booked/Unavailable</span>
      </div>
    </div>
  );
};

export default BookingCalendar;
