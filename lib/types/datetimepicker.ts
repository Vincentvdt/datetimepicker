// /src/types/datetimepicker.ts
import type { CalendarStyle } from './calendar';
import type React from 'react';

/**
 * Interface defining the props for the DateTimePicker component.
 *
 * @interface DateTimePickerProps
 * @property {string} [locale] - The locale for the date picker. Can be 'en' for English or 'fr' for French.
 * @property {Date} [selected] - The selected date for the date picker.
 * @property {string | number} [width] - The width of the date picker component.
 * @property {string | number} [calendarWidth] - The width of the calendar component within the date picker.
 * @property {string} [name] - The name attribute of the HTML input element.
 * @property {object} [input] - Additional attributes to be passed to the HTML input element.
 * @property {React.ReactElement} [customInput] - Custom input component to be used instead of the default input element.
 * @property {object} [calendar] - Custom styles to be applied to the calendar component.
 * @property {function} [onDateChange] - Callback function to be called when the selected date changes.
 */
export interface DateTimePickerProps {
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
