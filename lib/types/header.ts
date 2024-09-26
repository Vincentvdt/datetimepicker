import type { CalendarOptions, CommonCalendarProps, ViewMode } from './calendar.ts';

/**
 * Defines handlers for calendar navigation.
 *
 * @type NavigationHandlers
 * @property {() => void} handlePrevMonth - Function to navigate to the previous month.
 * @property {() => void} handleNextMonth - Function to navigate to the next month.
 * @property {() => void} handlePrevYear - Function to navigate to the previous year.
 * @property {() => void} handleNextYear - Function to navigate to the next year.
 */
type NavigationHandlers = {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handlePrevYear: () => void;
  handleNextYear: () => void;
};

/**
 * HeaderProps interface for defining the props required by a header component.
 *
 * @interface HeaderProps
 * @extends CommonCalendarProps
 * @extends NavigationHandlers
 *
 * @property {number} navigationYear - The year to be displayed when in 'month' view mode.
 * @property {Pick<CalendarOptions, 'months'>} options - Options for displaying the calendar.
 * @property {(view: ViewMode) => void} toggleViewMode - Function to toggle between 'date' and 'month' view modes.
 */
export interface HeaderProps extends CommonCalendarProps, NavigationHandlers {
  navigationYear: number;
  options: Pick<CalendarOptions, 'months'>;
  toggleViewMode: (_view: ViewMode) => void;
}
