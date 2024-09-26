import React, { useMemo } from 'react';
import { getDaysInMonth } from '../utils/helpers';
import {
  CalendarBody,
  CalendarDayCell,
  CalendarDaysTable,
  CalendarMonthCell,
  CalendarMonthTable,
} from './styled/Calendar.tsx';
import type { BodyProps, DateObject } from '../types';

/**
 * The Body component renders the main content of the calendar based on the `viewMode`.
 * It supports both 'date' and 'month' views.
 *
 * @component Body
 *
 * @param {BodyProps} props - Props for the Body component.
 * @returns {React.ReactNode} The rendered calendar body.
 */
const Body = ({
  viewMode,
  options,
  selectedDateTime,
  currentDate,
  handleSelectDate,
  handleSelectMonth,
  calendar,
}: BodyProps): React.ReactNode => {
  /**
   * Generates a 2D array of date objects for the current month in view.
   *
   * @function
   * @returns {DateObject[][]} A 2D array of DateObjects representing the days in the calendar.
   */
  const generateCalendarDates = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const dates = [];
    for (let i = offset - 1; i >= 0; i--) {
      dates.push({ date: new Date(year, month - 1, prevMonthDays - i), currentMonth: false });
    }

    const currentMonthDays = getDaysInMonth(year, month);
    for (let i = 1; i <= currentMonthDays; i++) {
      dates.push({ date: new Date(year, month, i), currentMonth: true });
    }

    const remainingDays = (7 - (dates.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }

    return dates.reduce<DateObject[][]>((acc, dateObj, index) => {
      if (index % 7 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(dateObj);
      return acc;
    }, []);
  }, [currentDate]);

  /**
   * Generates a 2D array representing the months for month selection view.
   *
   * @function
   * @returns {string[][]} A 2D array of short month labels.
   */
  const generateCalendarMonths = useMemo(
    () =>
      options.monthsShort.reduce((result, month, index) => {
        if (index % 3 === 0) {
          result.push([]);
        }
        result[result.length - 1].push(month);
        return result;
      }, [] as string[][]),
    [options],
  );

  return (
    <CalendarBody>
      {viewMode === 'date' ? (
        <CalendarDaysTable styles={calendar}>
          <thead>
            <tr>
              {options.dayOfWeekShort.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {generateCalendarDates.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((dateObj, index) => {
                  const isSelected =
                    selectedDateTime.toDateString() === dateObj.date.toDateString();
                  return (
                    <CalendarDayCell
                      styles={calendar}
                      isSelected={isSelected}
                      currentMonth={dateObj.currentMonth}
                      key={index}
                      onClick={() => handleSelectDate(dateObj.date)}
                    >
                      {dateObj.date.getDate()}
                    </CalendarDayCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </CalendarDaysTable>
      ) : (
        <CalendarMonthTable>
          <tbody>
            {generateCalendarMonths.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((month, monthIndex) => {
                  const isSelected = monthIndex + 3 * rowIndex + 1 === currentDate.getMonth() + 1;
                  return (
                    <CalendarMonthCell
                      isSelected={isSelected}
                      styles={calendar}
                      key={monthIndex + 3 * rowIndex}
                      onClick={() => handleSelectMonth(monthIndex + 3 * rowIndex)}
                    >
                      {month}
                    </CalendarMonthCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </CalendarMonthTable>
      )}
    </CalendarBody>
  );
};

export default Body;
