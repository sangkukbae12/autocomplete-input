describe('autocomplete-input-test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=%EB%82%98', { fixture: 'movies.json' })
      .as('getMovies');
    cy.get('[name=keyword]').type('나', { force: true });
  });

  it('autocomplete rendered', () => {
    cy.get('[name=keyword]').should('be.visible');
  });

  it('request by input value', () => {
    cy.wait('@getMovies').its('request.url').should('include', `?value=${encodeURI('나')}`);
  });

  it('autocomplete has 3 options', () => {
    cy.get('#movie-list').children('option').should('have.length', 3);
  });

  it('first option matched', () => {
    cy.get('#movie-list').children('option').first().should('contain', '나이브즈 아웃');

  });

  it('autocomplete hidden when input blur', () => {
    cy.get('[name=keyword]').blur();
    cy.get('#movie-list').should('be.hidden');
  });
});
