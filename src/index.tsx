import {useEffect, useRef, useState} from 'react';
import {interpret, Machine, MachineEvent, Service, SubscriberFn} from "@joshdcuneo/tsm"

export const useMachine = <State, Event extends MachineEvent, Context>(machineConfig: Machine<State, Event, Context>, initialContext?: Context): [Service<State, Event, Context>, Machine<State, Event, Context>] => {
  const serviceRef = useRef<Service<State, Event, Context>>(interpret(machineConfig, initialContext))
  const subscriptionRef = useRef<SubscriberFn<State, Event, Context> | null>()

  const [machine, setMachine] = useState<Machine<State, Event, Context>>(serviceRef.current.machine)

  useEffect(() => {
    if(!subscriptionRef.current && serviceRef.current) {
      subscriptionRef.current = (newMachine: Machine<State, Event, Context>) => {
        setMachine(newMachine)
      }
      serviceRef.current.subscribe(subscriptionRef.current)
    }
  }, [machineConfig])

  return [serviceRef.current!, machine!]
}