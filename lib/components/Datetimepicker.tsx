import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import Body from './Body';
import defaultOptions from '../assets/data/locales';
import { Input } from './styled/Input.tsx';
import { CalendarWrapper } from './styled/Calendar.tsx';
import type { DateTimePickerProps, ViewMode } from '../types';

const DatetimePicker = styled.div<{ width?: string | number }>`
  position: relative;
  width: ${({ width }) => width && (typeof width === 'string' ? width : `${width}px`)};
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  box-sizing: border-box;

  * {
    font-family: 'Inter', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    box-sizing: border-box;
  }
`;

/**
 * DateTimePicker component used for selecting dates and times.
 *
 * @component DateTimepicker
 *
 * @param {DateTimePickerProps} props
 * @returns {React.ReactNode} The rendered DateTimePicker component.
 *
 * @example
 * <DateTimePicker
 *   locale="fr"
 *   selected={new Date()}
 *   width="300px"
 *   calendarWidth="400px"
 *   name="datePicker"
 *   onDateChange={(date) => console.log(date)}
 * />
 */
const DateTimepicker: React.FC<DateTimePickerProps> = ({
  locale = 'en',
  selected,
  name,
  input,
  customInput,
  onDateChange,
  calendar,
  width,
  calendarWidth,
}: DateTimePickerProps): React.ReactNode => {
  const customInputRef = useRef<HTMLElement | null>(null);
  const dateTimePickerRef = useRef<HTMLDivElement | null>(null);

  const [customInputWidth, setCustomInputWidth] = useState(width);
  const options = defaultOptions[locale];
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(selected || new Date());
  const [currentDate, setCurrentDate] = useState<Date>(selected || new Date());
  const [navigationYear, setNavigationYear] = useState<number>(
    (selected || new Date()).getFullYear(),
  );
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('date');
  const [inputValue, setInputValue] = useState<string>(
    (selected || new Date()).toLocaleDateString(options.locale),
  );

  // Toggle between "date" and "month" view modes
  const toggleViewMode = (view: ViewMode) => setViewMode(view);

  // Function to move to the previous month (viewMode: date)
  const handlePrevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  // Function to move to the next month (viewMode: date)
  const handleNextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  //Function to select a date from the calendar (viewMode: date)
  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
    setSelectedDateTime(date);
    setInputValue(date.toLocaleDateString(options.locale));
    setIsPickerOpen(false);
    onDateChange?.(date);
  };

  // Function to move to the previous year (viewMode: month)
  const handlePrevYear = () => setNavigationYear((prev) => prev - 1);
  // Function to move to the next year (viewMode: month)
  const handleNextYear = () => setNavigationYear((prev) => prev + 1);

  //Function to select a month and a year from the calendar (viewMode: month)
  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(navigationYear, monthIndex, 1); // Create new date with selected year and month
    setCurrentDate(newDate); // Update the currentDate to reflect selection
    setViewMode('date'); // Switch back to date view
  };
  useEffect(() => {
    if (customInputRef.current) {
      const customInputElementWidth = customInputRef.current.clientWidth;
      setCustomInputWidth(customInputElementWidth);
    }
  }, [customInputRef.current]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateTimePickerRef.current && !dateTimePickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    };

    // Add event listener when picker is open
    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on unmount or when picker is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <DatetimePicker ref={dateTimePickerRef} width={customInput ? customInputWidth : width}>
      {customInput ? (
        React.cloneElement(customInput, {
          value: inputValue,
          readOnly: true,
          onClick: () => setIsPickerOpen((prev) => !prev),
          ref: customInputRef,
        })
      ) : (
        <Input
          isPickerOpen={isPickerOpen}
          width={width}
          styles={calendar}
          {...input}
          type={input?.type || 'text'}
          value={inputValue}
          name={name}
          onClick={() => setIsPickerOpen((prev) => !prev)}
          readOnly
        />
      )}
      {/*</DateInputWrapper>*/}

      {isPickerOpen && (
        <CalendarWrapper width={calendarWidth}>
          <Header
            viewMode={viewMode}
            options={options}
            currentDate={currentDate}
            toggleViewMode={toggleViewMode}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            navigationYear={navigationYear}
            handlePrevYear={handlePrevYear}
            handleNextYear={handleNextYear}
            calendar={calendar}
          />
          <Body
            viewMode={viewMode}
            options={options}
            selectedDateTime={selectedDateTime}
            currentDate={currentDate}
            handleSelectDate={handleSelectDate}
            handleSelectMonth={handleSelectMonth}
            calendar={calendar}
          />
        </CalendarWrapper>
      )}
    </DatetimePicker>
  );
};

export default DateTimepicker;
