import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
// @ts-ignore
import { Default as Counter } from '../stories/Counter.stories';

describe('Thing', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('transitions to counting on inc and increases the count', () => {
    const incButton = screen.getByRole('button', { name: '+' });
    const count = screen.getByTestId('count');
    const state = screen.getByTestId('state');
    expect(count).toHaveTextContent('0');
    expect(state).toHaveTextContent('idle');
    userEvent.click(incButton);
    expect(count).toHaveTextContent('1');
    expect(state).toHaveTextContent('counting');
  });

  it('resets at max count', () => {
    const incButton = screen.getByRole('button', { name: '+' });
    const count = screen.getByTestId('count');
    const state = screen.getByTestId('state');
    expect(count).toHaveTextContent('0');
    expect(state).toHaveTextContent('idle');
    userEvent.click(incButton);
    userEvent.click(incButton);
    userEvent.click(incButton);
    userEvent.click(incButton);
    userEvent.click(incButton);
    userEvent.click(incButton);
    expect(count).toHaveTextContent('0');
    expect(state).toHaveTextContent('idle');
  });
});
