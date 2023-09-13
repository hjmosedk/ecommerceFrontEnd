import { testProducts, loremIpsum } from './testObjects';

before(() => {
  cy.request('POST', `${Cypress.env('BACKEND')}/resetDatabase`);
  testProducts.forEach((product) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/products`, product);
  });
});

beforeEach(() => {
  cy.visit('/');
});

describe('The Front Page Works', () => {
  it('The front Page contains products', () => {
    cy.contains('Rainbow Baby Dragon Shop');
    cy.get('[data-cy="mat-card"]').should('have.length', 3);
  });
  it('Two products is not on sale', () => {
    cy.get('[data-cy="price"]').should('have.length', 2);
    cy.get('[data-cy="on-sale"]').should('have.length', 1);
  });
});

describe("'Admin Actions' works as expected", () => {
  it('ProductList have only three products', () => {
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="allProducts"]').click();
    cy.get('[data-cy="productName"]').should('have.length', 3);
  });
  it('A new product can be added', () => {
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="newProduct"]').click();
    cy.url().should((url) => {
      expect(url).to.include('/newProduct');
    });
    cy.get('[data-cy="submit"]').should('exist');
    cy.get('[data-cy="productName"]').type('Test Product');
    cy.get('[data-cy="productSku"]').type('TEST001');
    cy.get('[data-cy="productDescription"]').type(loremIpsum);
    cy.get('[data-cy="productCategory"]').type('Test');
    cy.get('[data-cy="productPrice"]').type('25000');
    cy.get('[data-cy="productCurrency"]').click();
    cy.get('mat-option').contains('DKK').click();
    cy.get('[data-cy="productQuantity"]').type('25');
    cy.get('[data-cy="productPercentage"]').type('33');
    cy.get('[data-cy="productOnSale"]').click();

    cy.fixture('pear.png').then((fileContent) => {
      cy.get('input[type=file]').attachFile({
        fileContent,
        fileName: 'pear.png',
        mimeType: 'image/png',
      });
    });
    cy.get('.file-upload').should('contain', 'pear');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="modalButton"]').click();
    cy.get('[data-cy="home"]').click();
    cy.get('[data-cy="mat-card"]').should('have.length', 4);
  });

  it('The products is now listed correctly', () => {
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="allProducts"]').click();
    cy.get('[data-cy="productName"]').should('have.length', 4);
  });

  it('Products can be updated', () => {
    cy.get('[data-cy="settings"]').click();
    cy.get('[data-cy="allProducts"]').click();
    cy.get('[data-cy="editProduct"]').eq(1).click();
    cy.get('#name')
      .should('to.have.value', testProducts[1].name)
      .clear()
      .type('Gloves-2');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="home"]').click();
    cy.get('[data-cy="mat-card"]').eq(1).should('contain', 'Gloves-2');
  });
});
