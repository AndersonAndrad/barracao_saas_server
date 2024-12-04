import { generateHash } from '../../shared/utils/base64.utils';

describe('Utils', () => {
  test('should be generate hash', () => {
    const hash: string = generateHash();
    expect(typeof hash).toEqual('string');
  });

  test('should be verify hash length', () => {
    const hash: string = generateHash();
    expect(hash.length > 50).toBeTruthy();
  });
});
