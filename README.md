# TSM-React

A simple React hook to make it easier to work with TSM in React.

### Example
```tsx
import {components} from "@joshdcuneo/tsm";
import * as React from "react";
import {useMachine} from "../src";

export type CounterProps = {initialCount?: number}
type State = 'idle' | 'counting' | 'maxedOut';
type Event = { type: 'inc' } | { type: 'dec' } | { type: 'reset' };
type Context = number;

const {
  machine,
  state,
  transition,
  reducer,
  guard,
  immediate,
} = components<State, Event, Context>();

const inc = transition(
  'inc',
  'counting',
  reducer(ctx => ctx + 1)
);
const maxedOut = transition(
  'inc',
  'maxedOut',
  guard(ctx => ctx === 5)
);
const dec = transition(
  'dec',
  'counting',
  reducer(ctx => ctx - 1),
  guard(ctx => ctx > 0)
);
const reset = transition(
  'reset',
  'idle',
  reducer(() => 0)
);
const restart = immediate(
  'idle',
  reducer(() => 0),
);

const counterMachineConfig = machine(
  state('idle', inc),
  state('counting', maxedOut, inc, dec, reset),
  state('maxedOut', restart),
);

export const Counter = (props: CounterProps) => {
  const {initialCount = 0} = props
  const [service] = useMachine<State, Event, Context>(counterMachineConfig, initialCount)
  return (
    <div>
        <div>The count is: <span data-testid="count">{service.context()}</span></div>
        <div>The machine state is: <span data-testid="state">{service.machine.state.name}</span></div>
        <button onClick={()=>service.send({type: 'inc'})}>+</button>
        <button onClick={()=>service.send({type: 'dec'})}>-</button>
        <button onClick={()=>service.send({type: 'reset'})}>Reset</button>
    </div>
  )
}

```

#### Storybook

```bash
git clone https://github.com/joshdcuneo/tsm-react.git
cd tsm-react
npm install
npm run storybook
```

This loads the stories from `./stories`.

### Examples

Then run the example inside another:

```bash
git clone https://github.com/joshdcuneo/tsm-react.git
cd tsm-react
npm install
npm run build
cd example
npm run start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.