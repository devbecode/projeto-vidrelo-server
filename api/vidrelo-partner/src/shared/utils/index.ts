import moment from 'moment';

import { AppError } from '@shared/error/AppError';

const checkCnpj = (cnpj: string) => {
  // eslint-disable-next-line prefer-regex-literals
  const patternCnpj = new RegExp(/^[0-9]{14}/);
  if (!patternCnpj.test(cnpj)) {
    throw new AppError(
      `The cnpj ${cnpj} must have 14 characters and be only numbers`,
    );
  }
};

const checkTelephone = (telephone: string) => {
  // eslint-disable-next-line prefer-regex-literals
  const patternTelephone = new RegExp(/^[0-9]+$/);

  if (!patternTelephone.test(telephone)) {
    throw new AppError(`The telephone ${telephone} must be only numbers`);
  }
};

const formatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const checkEmail = (email: string) => {
  // eslint-disable-next-line prefer-regex-literals
  const patternEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  if (patternEmail.test(email) === false) {
    throw new AppError(`Email ${email} is not valid`, 400);
  }
};

const checkCep = (cep: string) => {
  // eslint-disable-next-line prefer-regex-literals
  const patternCep = new RegExp(/[0-9]{8}/);
  if (!patternCep.test(cep)) {
    throw new AppError(
      `The cep ${cep} must be only numbers and be like 8 characters`,
    );
  }
};

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

export {
  checkCnpj,
  checkTelephone,
  formatDate,
  checkEmail,
  checkCep,
  checkEachStringLength,
};
