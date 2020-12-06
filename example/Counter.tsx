import {components} from "@joshdcuneo/tsm";
import * as React from "react";
import {useMachine} from "../.";

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
  return (<div>
    <div>The count is: <span data-testid="count">{service.context()}</span></div>
  <div>The machine state is: <span data-testid="state">{service.machine.state.name}</span></div>
    <button onClick={()=>service.send({type: 'inc'})}>+</button>
    <button onClick={()=>service.send({type: 'dec'})}>-</button>
    <button onClick={()=>service.send({type: 'reset'})}>Reset</button>
  </div>)
}
