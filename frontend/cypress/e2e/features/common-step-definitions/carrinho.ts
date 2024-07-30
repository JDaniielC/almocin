import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuario esta na pagina {string} ', (page: string) => {
    cy.visit(`/${page}`);
});

When('o usuario vai para pagina {string}', (page: string) => {
    cy.visit(`/${page}`); 
});

Then('o usuario recebe o carrinho', () => {
    cy.get(`[data-cy='carrinho-page']`)
      .should('exist');
});


Given('usuario não validado esta na pagina de {string}', (page: string) => {
});
  
Then('usuario recebe erro de validação', () => {
});