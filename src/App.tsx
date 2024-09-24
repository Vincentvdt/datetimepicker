import { DateTimepicker } from '../lib';
import { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return <DateTimepicker onDateChange={(date) => setStartDate(date)} selected={startDate} />;
}

export default App;
