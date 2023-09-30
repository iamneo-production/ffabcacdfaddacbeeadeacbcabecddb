import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from '../Calculator';

describe('Calculator', () => {
  it('renders_without_crashing', () => {
    render(<Calculator />);
  });

  it('adds_two_numbers_correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const num1Input = getByTestId('num1');
    const num2Input = getByTestId('num2');
    const addButton = getByText('Add');
    const resultElement = getByTestId('result');

    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '3' } });
    fireEvent.click(addButton);

    expect(resultElement).toHaveTextContent('Result: 8');
  });

  it('subtracts_two_numbers_correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const num1Input = getByTestId('num1');
    const num2Input = getByTestId('num2');
    const subtractButton = getByText('Subtract');
    const resultElement = getByTestId('result');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '4' } });
    fireEvent.click(subtractButton);

    expect(resultElement).toHaveTextContent('Result: 6');
  });

  it('multiplies_two_numbers_correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const num1Input = getByTestId('num1');
    const num2Input = getByTestId('num2');
    const multiplyButton = getByText('Multiply');
    const resultElement = getByTestId('result');

    fireEvent.change(num1Input, { target: { value: '6' } });
    fireEvent.change(num2Input, { target: { value: '7' } });
    fireEvent.click(multiplyButton);

    expect(resultElement).toHaveTextContent('Result: 42');
  });

  it('divides_two_numbers_correctly', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const num1Input = getByTestId('num1');
    const num2Input = getByTestId('num2');
    const divideButton = getByText('Divide');
    const resultElement = getByTestId('result');

    fireEvent.change(num1Input, { target: { value: '20' } });
    fireEvent.change(num2Input, { target: { value: '5' } });
    fireEvent.click(divideButton);

    expect(resultElement).toHaveTextContent('Result: 4');
  });

  it('displays_an_error_for_division_by_zero', () => {
    const { getByText, getByTestId } = render(<Calculator />);
    const num1Input = getByTestId('num1');
    const num2Input = getByTestId('num2');
    const divideButton = getByText('Divide');
    const resultElement = getByTestId('result');

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '0' } });
    fireEvent.click(divideButton);

    expect(resultElement).toHaveTextContent('Error: Division by zero');
  });
});
