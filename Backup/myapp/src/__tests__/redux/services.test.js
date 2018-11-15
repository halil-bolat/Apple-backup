import services from '#/redux/services';

describe('Redux', () => {
  describe('Services', () => {
    it('exports a service object', () => {
      expect(services).toBeTruthy();
    });

    it('exports the correct services', () => {
      expect(services.ovp).toBeTruthy();
      expect(services.vikimap).toBeTruthy();
    });
  });
});
