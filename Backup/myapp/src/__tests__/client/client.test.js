import client from '#/client/client';

jest.mock('react-dom');

describe('Client', () => {
  it('renders', () => {
    expect(client).toBeTruthy();
  });
});
