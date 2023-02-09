describe('When visits the home page', () => {
  const visistBaserUrl = () => {
    cy.visit('/');
  };

  it('should display the home page', () => {
    visistBaserUrl();

    const title = cy.get('a').should('contain', 'INICIO');
    console.log(title);
    expect(title).to.exist;
  });

  describe('Testing the routes', () => {
    beforeEach(visistBaserUrl);

    it('When click on the button "INICIO" should redirect to the home page', () => {
      cy.get('a').contains('INICIO').click();
      cy.url().should('include', '/');
    });

    it('When click on the button "HOBMRE" should redirect to the home page', () => {
      cy.get('a').contains('HOMBRE').click();
      cy.url().should('include', '/multipage/hombre');
    });

    it('When click on the button "MUJER" should redirect to the home page', () => {
      cy.get('a').contains('MUJER').click();
      cy.url().should('include', '/multipage/mujer');
    });

    it('When click on the button "OFERTAS" should redirect to the home page', () => {
      cy.get('a').contains('OFERTAS').click();
      cy.url().should('include', '/multipage/onSale');
    });
  });

  describe('Testing the search bar', () => {
    beforeEach(visistBaserUrl);

    it('When writing "Nike" on the search bar it should bring nike products', () => {
      cy.get('input').type('Nike');

      cy.get('input').type('{enter}');

      cy.get(
        '[ng-reflect-title="Ofertas"] > .p-10 > .flex-wrap > :nth-child(1) > app-list-item > .text-gray-500'
      ).should('contain', 'Nike');
    });

    it('When writing "Adidas" on the search bar it should bring adidas products', () => {
      cy.get('input').type('Adidas');

      cy.get('input').type('{enter}');

      cy.get(
        '[ng-reflect-title="Ofertas"] > .p-10 > .flex-wrap > :nth-child(1) > app-list-item > .text-gray-500'
      ).should('contain', 'Adidas');
    });
  });

  describe('Testing click on products', () => {
    beforeEach(visistBaserUrl);

    it('When click on the first product it should redirect to the product page', () => {
      cy.get(
        '[ng-reflect-title="Ofertas"] > .p-10 > .flex-wrap > :nth-child(5) > app-list-item > a > img'
      ).click();

      cy.url().should('include', '/details/');
    });
  });
});
