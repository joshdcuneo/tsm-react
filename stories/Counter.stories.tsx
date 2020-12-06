import React from 'react';
import { Meta, Story } from '@storybook/react';
import {Counter, CounterProps} from "../example/Counter";

const meta: Meta = {
  title: 'Counter machine',
  component: Counter,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<CounterProps> = args => <Counter {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {initialCount: 0};
