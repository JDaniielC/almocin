import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Eu estou na pagina {string}', (page: string) => {
    cy.visit(page);
});

When('Eu vou para a pagina {string}', (page: string) => {
    cy.visit(page);
});

Then('Eu estou na pagina', () => {
    
});