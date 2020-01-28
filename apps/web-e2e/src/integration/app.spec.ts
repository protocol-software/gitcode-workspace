import { getGreeting } from '../support/app.po';

describe('re-code-io', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to re-code-io!');
  });
});
