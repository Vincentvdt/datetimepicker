import ArrowIcon from '../assets/icons/ArrowIcon';
import styled from '@emotion/styled';
import type { CalendarStyle } from './Datetimepicker.tsx';

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  align-self: stretch;
`;

const CalendarNavigation = styled.div<{ direction: 'left' | 'right'; styles?: CalendarStyle }>`
  display: flex;
  padding: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: ${({ styles }) => styles?.colors?.primary || 'rgba(151, 202, 238, 0.52)'};
  cursor: pointer;
  transform: ${({ direction }) => (direction === 'right' ? 'rotate(180deg)' : 'rotate(0deg)')};

  &:hover,
  &:focus-visible,
  &:focus {
    outline: ${({ styles }) =>
      styles?.colors?.primary ? `1px solid ${styles.colors.textPrimary}` : '1px solid #0c3667'};
  }

  svg path {
    fill: ${({ styles }) => styles?.colors?.textPrimary || '#1961b6'};
  }
`;

const CalendarCurrentDate = styled.div<{ viewMode: 'date' | 'month'; styles?: CalendarStyle }>`
  cursor: pointer;
  color: ${({ styles }) => styles?.colors?.textPrimary || '#000'};
  font-size: ${({ viewMode, styles }) =>
    styles?.fontSizes?.date
      ? typeof styles.fontSizes.date === 'number'
        ? `${styles.fontSizes.date}px`
        : styles.fontSizes.date
      : viewMode === 'date'
        ? '12px'
        : '13px'};
  font-weight: 700;
  text-align: center;
`;

// Define the type for the props
interface HeaderProps {
  viewMode: 'date' | 'month';
  currentDate: Date;
  navigationYear: number;
  calendar?: CalendarStyle;
  options: {
    months: string[];
  };
  toggleViewMode: (_view: 'date' | 'month') => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handlePrevYear: () => void;
  handleNextYear: () => void;
}

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
}: HeaderProps) => (
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
