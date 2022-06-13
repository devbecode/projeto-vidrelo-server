import { AppError } from '@shared/error/AppError';

const checkEachStringLength = (strings: Array<any>) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const element of Object.keys(strings)) {
    const value = Object.values(strings[element]).toString().length;
    const key = Object.keys(strings[element]).toString() as unknown as number;

    if (value > key) {
      throw new AppError(
        `The length of the ${Object.values(
          strings[element],
        ).toString()} can not be greater than ${key} characters`,
        400,
      );
    }
  }
};

const checkIsOnlyNumbers = (value: string) => {
  // eslint-disable-next-line prefer-regex-literals
  const patternNumbers = new RegExp(/^[0-9]|\.|,+$/);

  if (!patternNumbers.test(value)) {
    throw new AppError(`The value ${value} must be only numbers`);
  }
};

export { checkEachStringLength, checkIsOnlyNumbers };
