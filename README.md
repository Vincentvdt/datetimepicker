# @vincentvdt/datetimepicker

A React-based DateTimePicker component built with TypeScript and styled using Emotion. This package provides a
customizable, modern, and easy-to-use date and time picker.

## Features

- Built with React and TypeScript.
- Fully customizable via Emotion for styling.
- Compatible with modern JavaScript/TypeScript projects.
- Lightweight and performant.
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

Here’s how you can import and use the DateTimePicker component in your project:

```tsx
import React from 'react';
import DateTimePicker from '@vincentvdt/datetimepicker';

const App = () => {
    return (
        <div>
            <h1>Select a date and time</h1>
            <DateTimePicker/>
        </div>
    );
};

export default App;
```

[//]: # (## Customization)

[//]: # ()

[//]: # (You can customize the styles of the DateTimePicker by using Emotion’s styled components or overriding the default theme.)

[//]: # ()

[//]: # (```tsx)

[//]: # ()

[//]: # (/** Example with Emotion styling */)

[//]: # (import React from 'react';)

[//]: # (import DateTimePicker from '@vincentvdt/datetimepicker-ts';)

[//]: # (import { css } from '@emotion/react';)

[//]: # ()

[//]: # (const customStyle = css`)

[//]: # (color: red;)

[//]: # (`;)

[//]: # ()

[//]: # (const CustomStyledPicker = &#40;&#41; => &#40;)

[//]: # (    <DateTimePicker css={ customStyle }/>)

[//]: # (&#41;;)

[//]: # ()

[//]: # (export default CustomStyledPicker;)

[//]: # (```)

## Peer Dependencies

This package expects react and react-dom to be installed as peer dependencies:

```json
{
  "peerDependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.2"
  }
}
```

If these aren’t installed in your project, you can install them with:

```bash
npm install react react-dom
```

## Contributing

If you’d like to contribute to this project, follow these steps:

    1. Fork the repository.
    2. Clone your fork to your local machine.
    3. Create a new branch with your feature or bug fix (git checkout -b my-feature-branch).
    4. Push the branch to your fork and open a pull request.

Please make sure to run npm run lint before submitting a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for more details.
