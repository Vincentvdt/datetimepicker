import styled from '@emotion/styled';
import type { CalendarStyle } from '../../types';

const Input = styled.input<{
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

export { Input };
