import { DateTimepicker } from '../lib';
import { useState } from 'react';
//
// const InputField = styled.input<{ error?: boolean }>`
//   padding: 7px;
//   border: none;
//   border-radius: 4px;
//   outline: ${({ error }) => (error ? `1px solid red` : `1px solid #ccc`)};
//   font-size: 20px;
//   width: 500px;
//   align-self: stretch;
//   cursor: pointer;
//
//   &:focus-visible {
//     outline: 1px solid blue;
//   }
// `;

function App() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <DateTimepicker
      calendarWidth={300}
      onDateChange={(date) => setStartDate(date)}
      selected={startDate}
      // calendar={{
      //   colors: {
      //     textHover: 'green',
      //     selected: 'blue',
      //     primaryHover: 'red',
      //     textDisabled: 'white',
      //   },
      //   fontSizes: {
      //     date: '15px',
      //     cell: '15px',
      //     dayLabels: '15px',
      //   },
      // }}
      // customInput={<InputField />}
    />
  );
}

export default App;
