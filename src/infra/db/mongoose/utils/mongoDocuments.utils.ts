import { NotFoundException } from '@nestjs/common';

export const formatMongoDocuments = <T>(document: any): T => {
  let obj = JSON.parse(JSON.stringify(document));

  delete obj['__v'];

  if (Array.isArray(obj)) {
    obj = obj.map((item) => {
      delete item['__v'];

      return item;
    });
  }

  return obj;
};

export enum TypeError {
  NOT_FOUND = 'not found',
  GENERIC = 'generic',
}

export interface DispatchError {
  moduleName: string;
  errorMessage: string;
  complement?: string;
}

export const validateTypeError = (error: any): TypeError => {
  const notFoundRegex = /Cast to ObjectId failed for value/;

  if (notFoundRegex.test(error)) return TypeError.NOT_FOUND;

  return TypeError.GENERIC;
};

export const dispatchError = (props: DispatchError): void => {
  switch (validateTypeError(props.errorMessage)) {
    case TypeError.NOT_FOUND:
      throw new NotFoundException(`${props.moduleName} not found by id: ${props?.complement}`);
    default:
      throw new Error(props.errorMessage);
  }
};
