import styled from '@emotion/styled';
import type { CalendarStyle, ViewMode } from '../../types';

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
  z-index: 9999;
`;

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

const CalendarCurrentDate = styled.div<{ viewMode: ViewMode; styles?: CalendarStyle }>`
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

const CalendarBody = styled.div`
  overflow: auto;
  width: 100%;

  table {
    height: 100%;
    width: 100%;
    table-layout: fixed;
    border: none;
    border-collapse: collapse;
    text-align: center;
  }
`;

const CalendarDaysTable = styled.table<{ styles?: CalendarStyle }>`
  th {
    color: ${({ styles }) => styles?.colors?.textPrimary || 'rgba(0, 0, 0, 0.49)'};
    font-size: ${({ styles }) =>
      styles?.fontSizes?.dayLabels
        ? typeof styles.fontSizes.dayLabels === 'number'
          ? `${styles.fontSizes.dayLabels}px`
          : styles.fontSizes.dayLabels
        : '13px'};
    font-weight: 500;
    padding: 5px 0;
  }
`;

const CalendarDayCell = styled.td<{
  isSelected: boolean;
  currentMonth: boolean;
  styles?: CalendarStyle;
}>`
  width: 30px;
  height: 30px;
  font-size: ${({ styles }) =>
    styles?.fontSizes?.cell
      ? typeof styles.fontSizes.cell === 'number'
        ? `${styles.fontSizes.cell}px`
        : styles.fontSizes.cell
      : '10px'};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 3px;
  cursor: pointer;
  color: ${({ currentMonth, styles }) =>
    currentMonth
      ? styles?.colors?.textPrimary || '#0C3667'
      : styles?.colors?.textSecondary || '#797979'};
  opacity: ${({ currentMonth }) => (currentMonth ? 1 : 0.3)};
  background: ${({ isSelected, styles }) =>
    isSelected
      ? styles?.colors?.selected || 'rgba(151, 202, 238, 0.81)'
      : styles?.colors?.background || 'transparent'};

  &:hover {
    background: ${({ isSelected, styles }) =>
      isSelected
        ? styles?.colors?.selected || 'rgba(151, 202, 238, 0.81)'
        : styles?.colors?.primaryHover || 'rgba(151, 202, 238, 0.81)'};
    opacity: 1;
    color: ${({ styles }) => styles?.colors?.textHover || '#797979'};
  }
`;

const CalendarMonthTable = styled.table`
  tbody {
    border-collapse: separate;
    border-spacing: 10px;
  }

  tr {
    display: flex;
    justify-content: space-around;
  }
`;

const CalendarMonthCell = styled.td<{ isSelected: boolean; styles?: CalendarStyle }>`
  margin: 3px;
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  background: ${({ isSelected, styles }) =>
    isSelected
      ? styles?.colors?.selected || 'rgba(151, 202, 238, 0.81)'
      : styles?.colors?.background || 'transparent'};
  color: ${({ styles }) => styles?.colors?.textPrimary || '#0C3667'};
  font-size: ${({ styles }) =>
    styles?.fontSizes?.cell
      ? typeof styles.fontSizes.cell === 'number'
        ? `${styles.fontSizes.cell}px`
        : styles.fontSizes.cell
      : '12px'};
  font-weight: 700;
  line-height: normal;
  flex: 1;

  &:hover {
    background: ${({ isSelected, styles }) =>
      isSelected
        ? styles?.colors?.selected || 'rgba(151, 202, 238, 0.81)'
        : styles?.colors?.primaryHover || 'rgba(151, 202, 238, 0.81)'};
  }
`;

export {
  CalendarWrapper,
  CalendarHeader,
  CalendarNavigation,
  CalendarCurrentDate,
  CalendarBody,
  CalendarDaysTable,
  CalendarDayCell,
  CalendarMonthCell,
  CalendarMonthTable,
};
