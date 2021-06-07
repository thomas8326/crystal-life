import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AllowListController from 'src/crystal-dashboard/components/allowlist-control';

describe('User List test input validation', () => {
  const { getByTestId } = render(<AllowListController />);
  const userInputPhone = getByTestId('inputPhone') as HTMLInputElement;
  const userInputName = getByTestId('inputName') as HTMLInputElement;

  test('Input name is not allow empty', () => {
    const nameTextEmpty = '';

    fireEvent.input(userInputName, { target: { value: nameTextEmpty } });
    expect(userInputName.validity.valueMissing).toBe(true);
  });

  test('Input phone is not allow empty', () => {
    const phoneTextEmpty = '';

    fireEvent.input(userInputPhone, { target: { value: phoneTextEmpty } });
    expect(userInputPhone.validity.valueMissing).toBe(true);
  });

  test('Input phone not have enough length', () => {
    const phoneInvalidLength = '09123456';

    fireEvent.input(userInputPhone, { target: { value: phoneInvalidLength } });
    expect(userInputPhone.validity.patternMismatch).toBe(true);
  });

  test('Input phone has A-Z characters would be invalid', () => {
    const phoneHasInvalidChar = '09Test123';

    fireEvent.input(userInputPhone, { target: { value: phoneHasInvalidChar } });
    expect(userInputPhone.validity.patternMismatch).toBe(true);
  });

  test('Input phone box has correct pattern', () => {
    const phoneValidNumber = '0912345678';

    fireEvent.input(userInputPhone, { target: { value: phoneValidNumber } });
    expect(userInputPhone.validity.patternMismatch).toBe(false);
  });
});
