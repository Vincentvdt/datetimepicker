import ArrowIcon from '../assets/icons/ArrowIcon';
import { CalendarCurrentDate, CalendarHeader, CalendarNavigation } from './styled/Calendar.tsx';
import React from 'react';
import type { HeaderProps } from '../types';

/**
 * Header component for the calendar.
 * Displays navigation arrows and the current month/year, allowing users to switch between 'date' and 'month' views.
 *
 * @component Header
 *
 * @param {HeaderProps} props - The properties passed to the Header component.
 * @returns {React.ReactNode} The rendered header for the calendar.
 */
const Header = ({
  viewMode,
  options,
  navigationYear,
  toggleViewMode,
  currentDate,
  handlePrevMonth,
  handleNextMonth,
  handlePrevYear,
  handleNextYear,
  calendar,
}: HeaderProps): React.ReactNode => (
  <CalendarHeader>
    {viewMode === 'date' ? (
      <>
        <CalendarNavigation direction="left" styles={calendar} onClick={handlePrevMonth}>
          <ArrowIcon />
        </CalendarNavigation>
        <CalendarCurrentDate
          viewMode={viewMode}
          styles={calendar}
          onClick={() => toggleViewMode('month')}
        >
          {options.months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CalendarCurrentDate>
        <CalendarNavigation direction="right" styles={calendar} onClick={handleNextMonth}>
          <ArrowIcon />
        </CalendarNavigation>
      </>
    ) : (
      <>
        <CalendarNavigation direction="left" styles={calendar} onClick={handlePrevYear}>
          <ArrowIcon />
        </CalendarNavigation>
        <CalendarCurrentDate
          viewMode={viewMode}
          styles={calendar}
          onClick={() => toggleViewMode('date')}
        >
          {navigationYear}
        </CalendarCurrentDate>
        <CalendarNavigation direction="right" styles={calendar} onClick={handleNextYear}>
          <ArrowIcon />
        </CalendarNavigation>
      </>
    )}
  </CalendarHeader>
);

export default Header;
