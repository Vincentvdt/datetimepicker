# @vincentvdt/datetimepicker

A React-based DateTimePicker component built with TypeScript and styled using Emotion. This package provides a
customizable, modern, and easy-to-use date picker.

- [GitHub Repository](https://github.com/Vincentvdt/datetimepicker)
- [Npm Package](https://www.npmjs.com/package/@vincentvdt/datetimepicker)

## Features

- Built with React and TypeScript.
- Fully customizable via Emotion for styling.
- Compatible with modern JavaScript/TypeScript projects.
- Lightweight and performant.
- Supports localization (English and French).
- Includes both ES and UMD builds.

## Installation

To install the package, use npm or yarn:

```bash
npm install @vincentvdt/datetimepicker
```

Or, if you prefer using yarn:

```bash
yarn add @vincentvdt/datetimepicker
```

## Usage

Here's how you can import and use the DateTimepicker component in your project:

```tsx
import React, { useState } from 'react';
import { DateTimepicker } from "@vincentvdt/datetimepicker";

function App() {
  const [ startDate, setStartDate ] = useState<Date>(new Date());

  return (
    <DateTimepicker selected={ startDate } onDateChange={ (date) => setStartDate(date) } />
  );
}

export default App;
```

## Localization

DateTimepicker supports two locales: 'en' (English, default) and 'fr' (French). You can change the locale by passing the
locale prop.

```tsx
import React, { useState } from 'react';
import { DateTimepicker } from "@vincentvdt/datetimepicker";

function App() {
  const [ startDate, setStartDate ] = useState<Date>(new Date());

  return (
    <div>
      <h1>Select a date</h1>

      {/* French Locale */ }
      <DateTimepicker locale="fr" />

    </div>
  );
}

export default App;

```

Note: Only en (English) and fr (French) are available for now. The default locale is en.

## Input Attributes

You can pass any valid HTML input attributes using the input prop. Here's an example where the input is required and has
a placeholder

```tsx
import React, { useState } from 'react';
import { DateTimepicker } from "@vincentvdt/datetimepicker";

function App() {
  const [ startDate, setStartDate ] = useState<Date>(new Date());

  return (
    <DateTimepicker input={ { required: true } } // Input attributes
    />
  );
}

export default App;
```

## `DateTimepicker` Props

| Prop           | Type                                                        | Default      | Description                                                                |
|----------------|-------------------------------------------------------------|--------------|----------------------------------------------------------------------------|
| `locale`       | `'en' \| 'fr'`                                              | `'en'`       | Locale for date formatting.                                                |
| `selected`     | `Date`                                                      | `new Date()` | The currently selected date.                                               |
| `name`         | `string`                                                    | `''`         | Name attribute for the input element (useful in forms).                    |
| `input`        | `Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>` | N/A          | Additional input attributes (e.g., `placeholder`, `required`, `disabled`). |
| `onDateChange` | `(date: Date) => void`                                      | N/A          | Callback fired when the selected date changes.                             |

## Peer Dependencies

This package expects react and react-dom to be installed as peer dependencies:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

If these aren't installed in your project, you can install them with:

```bash
npm install react react-dom
```

## Contributing

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your feature or bug fix: git checkout -b my-feature-branch.
4. Push the branch to your fork and open a pull request.

Please make sure to run npm run lint before submitting a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for more details.