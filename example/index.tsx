import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Counter } from './Counter';

const App = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
