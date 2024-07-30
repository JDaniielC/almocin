import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Eu estou na pagina: {string}', (page: string) => {
    cy.visit(page);
});

When('Eu vou para a pagina {string}', (page: string) => {
    cy.visit(page);
});

Then('Eu estou na pagina', () => {
    cy.url().should('include', '/cardapio');
});

Given('Eu estou na pagina {string}', (page: string) => {
    cy.visit(page);
});

When('Eu clico no botao criar', () => {
    cy.get('[data-cy="criar-item"]').click();
});

Then('Eu cliquei no botao', () => {

});