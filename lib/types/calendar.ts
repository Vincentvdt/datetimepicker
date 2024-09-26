/**
 * Defines the possible view modes for the calendar.
 *
 * @type ViewMode
 * - 'date': Displays days of a specific month.
 * - 'month': Displays months.
 */
export type ViewMode = 'date' | 'month';

/**
 * Options for configuring the calendar's display.
 *
 * @type CalendarOptions
 * @property {string[]} dayOfWeekShort - Array of short labels for days of the week (e.g., ['Mon', 'Tue']).
 * @property {string[]} monthsShort - Array of short labels for months (e.g., ['Jan', 'Feb']).
 * @property {string[]} months - Array of full labels for months (e.g., ['January', 'February']).
 */
export type CalendarOptions = {
  dayOfWeekShort: string[];
  monthsShort: string[];
  months: string[];
};

/**
 * Defines the color scheme for the calendar's styling.
 *
 * @type ColorStyles
 * @property {string} [textPrimary] - Main text color (for current month days).
 * @property {string} [textSecondary] - Secondary text color (for other month days).
 * @property {string} [textHover] - Text color when a day is hovered over.
 * @property {string} [textDisabled] - Color for disabled or inactive days.
 * @property {string} [primary] - Primary color used for navigation elements.
 * @property {string} [primaryHover] - Hover color for primary elements.
 * @property {string} [selected] - Background color for the selected date.
 * @property {string} [background] - General background color for calendar cells.
 */
type ColorStyles = {
  textPrimary?: string;
  textSecondary?: string;
  textHover?: string;
  textDisabled?: string;
  primary?: string;
  primaryHover?: string;
  selected?: string;
  background?: string;
};

/**
 * Defines font sizes for various elements of the calendar.
 *
 * @type FontSizes
 * @property {string | number} [cell] - Font size for calendar day cells.
 * @property {string | number} [date] - Font size for the date displayed in the header.
 * @property {string | number} [dayLabels] - Font size for day labels (e.g., 'Mon', 'Tue').
 */
type FontSizes = {
  cell?: string | number;
  date?: string | number;
  dayLabels?: string | number;
};

/**
 * Defines the styling options for the calendar, including colors and font sizes.
 *
 * @type CalendarStyle
 * @property {ColorStyles} [colors] - Color styles for different parts of the calendar.
 * @property {FontSizes} [fontSizes] - Font size settings for various calendar elements.
 */
export type CalendarStyle = {
  colors?: ColorStyles;
  fontSizes?: FontSizes;
};

/**
 * Common properties shared by various calendar components.
 *
 * @type CommonCalendarProps
 * @property {ViewMode} viewMode - The current view mode of the calendar ('date' or 'month').
 * @property {Date} currentDate - The current date that the calendar is displaying.
 * @property {CalendarStyle} [calendar] - Optional styles to be applied to the calendar.
 */
export type CommonCalendarProps = {
  viewMode: ViewMode;
  currentDate: Date;
  calendar?: CalendarStyle;
};

/**
 * Represents a date object for rendering in the calendar.
 *
 * @type DateObject
 * @property {Date} date - The date instance for this cell in the calendar.
 * @property {boolean} currentMonth - Indicates whether the date belongs to the currently displayed month.
 */
export type DateObject = {
  date: Date;
  currentMonth: boolean;
};
