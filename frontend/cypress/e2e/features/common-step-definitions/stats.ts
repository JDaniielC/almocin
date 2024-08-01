import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the tests
    return false;
});



Given('Eu estou na pagina:: {string}', (page: string) => {
    cy.visit(page);
});

When('Eu vou para a pagina: {string}', (page: string) => {
    cy.visit(page);
});

Then('Eu estou na pagina:', () => {
    cy.get('h1').should('contain.text', 'Estatísticas');
});

