import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import Body from './Body';
import defaultOptions from '../assets/data/locales';

export interface CalendarStyle {
  colors?: {
    textPrimary?: string; // Main text color (current month days)
    textSecondary?: string; // Secondary text color (other months or inactive)
    textHover?: string; // Text color on hover
    textDisabled?: string; // Color for disabled days
    primary?: string; // Primary color (buttons/navigation)
    primaryHover?: string; // Hover color for primary elements
    selected?: string; // Background color for selected date
    background?: string; // General background color
  };
  fontSizes?: {
    cell?: string | number; // Font size for calendar day cells
    date?: string | number; // Font size for the date (header)
    dayLabels?: string | number; // Font size for day labels (Mon, Tue, etc.)
  };
}

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

const DateInput = styled.input<{
  isPickerOpen: boolean;
  width?: string | number;
  styles?: CalendarStyle;
}>`
  cursor: pointer;
  padding: 10px;
  border: none;
  width: ${({ width }) => (width ? (typeof width === 'string' ? width : `${width}px`) : '100%')};
  background: ${({ styles }) => styles?.colors?.background || '#fff'};
  border-radius: 5px;
  color: ${({ styles }) => styles?.colors?.textPrimary || '#000'};
  font-size: ${({ styles }) =>
    styles?.fontSizes?.date
      ? typeof styles.fontSizes.date === 'number'
        ? `${styles.fontSizes.date}px`
        : styles.fontSizes.date
      : '12px'};
  font-weight: 700;
  outline: ${({ isPickerOpen }) => (isPickerOpen ? '2px solid #0E7AF8' : '1px solid #e3e3e3')};

  &:hover {
    outline: ${({ isPickerOpen }) => (isPickerOpen ? '2px solid #0E7AF8' : '1px solid #b3b3b3')};
  }

  &:focus {
    outline: 2px solid ${({ styles }) => styles?.colors?.primary || '#0E7AF8'};
  }
`;

const CalendarWrapper = styled.div<{ styles?: CalendarStyle; width?: string | number }>`
  position: absolute;
  top: 54px;
  display: flex;
  width: ${({ width }) => (width ? (typeof width === 'string' ? width : `${width}px`) : '200px')};
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 7px;
  background: ${({ styles }) => styles?.colors?.background || '#fff'};
  border: 1px solid ${({ styles }) => styles?.colors?.primary || '#e3e3e3'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optionally add shadow for more visual hierarchy */
`;

/**
 * Custom styles and events for the DateTimePicker component
 */
interface DateTimePickerProps {
  locale?: 'en' | 'fr';
  selected?: Date;
  width?: string | number;
  calendarWidth?: string | number;
  name?: string;
  input?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;
  customInput?: React.ReactElement;
  calendar?: CalendarStyle;
  onDateChange?: (_date: Date) => void;
}

/**
 * Datepicker with calendar functionality.
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
}) => {
  const options = defaultOptions[locale];
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(selected || new Date());
  const [currentDate, setCurrentDate] = useState<Date>(selected || new Date());
  const [navigationYear, setNavigationYear] = useState<number>(
    (selected || new Date()).getFullYear(),
  );
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'date' | 'month'>('date');
  const [inputValue, setInputValue] = useState<string>(
    (selected || new Date()).toLocaleDateString(options.locale),
  );

  // Toggle between "date" and "month" view modes
  const toggleViewMode = (view: 'date' | 'month') => setViewMode(view);

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

  return (
    <DatetimePicker width={width}>
      {customInput ? (
        React.cloneElement(customInput, {
          value: inputValue,
          readOnly: true,
          onClick: () => setIsPickerOpen((prev) => !prev),
        })
      ) : (
        <DateInput
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
