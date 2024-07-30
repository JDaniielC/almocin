import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


// Ir ao cardapio do administrador
Given('Eu estou na página: {string}', (page: string) => {
    cy.visit(page);
});
When('Eu vou para a página: {string}', (page: string) => {
    cy.visit(page);
});
Then('Eu estou na página', () => {
    cy.url().should('include', '/cardapio');
});


//Ir para cardapio do administrados
Given('Estou na página: {string}', (page: string) => {
    cy.visit(page);
});
When('Eu cliquei no botao no canto superior esquerdo', () => {
    cy.get('[data-cy="menu-button"]').click();
});
Then('Estou na página', () => {
    cy.url().should('include', '/');
});


//Ir ao cardapio
Given('Eu estou na pagina: {string}', (page: string) => {
    cy.visit(page);
});
When('Vou para a pagina: {string}', (page: string) => {
    cy.visit(page);
});
Then('Eu estou na pagina', () => {
    cy.url().should('include', '/');
});


//Ir para cardapio
Given('Estou na pagina: {string}', (page: string) => {
    cy.visit(page);
});
When('Eu cliquei no botao do canto superior esquerdo', () => {
    cy.get('[data-cy="menu-button"]').click();
});
Then('Estou na pagina', () => {
    cy.url().should('include', '/');
});


// Criar item
Given('Na pagina: {string}', (page: string) => {
    cy.visit(page);
});
When('Eu clico no botao criar', () => {
    cy.get('[data-cy="criar-item"]').click();
});
Then('Eu cliquei no botao', () => {
});