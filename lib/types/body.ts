import type { CalendarOptions, CommonCalendarProps } from './calendar.ts';

/**
 * Represents the properties for the Body component.
 *
 * @interface BodyProps
 * @extends CommonCalendarProps
 * @property {Omit<CalendarOptions, 'months'>} options - Options for calendar display.
 * @property {Date} selectedDateTime - The currently selected date and time.
 * @property {(_date: Date) => void} handleSelectDate - Callback for when a date is selected.
 * @property {(_monthIndex: number) => void} handleSelectMonth - Callback for when a month is selected.
 *
 */
export interface BodyProps extends CommonCalendarProps {
  options: Omit<CalendarOptions, 'months'>;
  selectedDateTime: Date;
  handleSelectDate: (_date: Date) => void;
  handleSelectMonth: (_monthIndex: number) => void;
}
