import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuario esta na pagina {string} ',(page:string)=>{
    cy.visit(`/${page}`)
});
When('o usuario esta na pagina {string} ',(page:string)=>{
    cy.visit(`/${page}`)
});
Then('o usuario ve {string} de pedidos feitos',(elem:string)=>{
    cy.get(`[data-cy='status-history']`, { timeout: 10000 }).should('exist');
});
Then('o usuario ve {string} do pedidos feitos',(elem:string)=>{
    cy.get(`[data-cy="${elem}-history"]`, { timeout: 10000 }).should('exist');
    
});
Then('o usuario ve {string} dos "items" do pedidos feitos',(elem:string)=>{
    cy.get(`[data-cy="${elem}-history"]`, { timeout: 10000 }).should('exist');
});

Given('o usuario esta na pagina {string}', (page: string) => {
    cy.visit(`/`);
});

When('o usuario vai para a pagina {string}', (page: string) => {
    cy.visit(`/historico`); 
});

Then('o usuario recebe o historico de pedidos', () => {
    cy.visit(`/historico`); 
    
    cy.get(`[data-cy='order-container-history']`)
      .should('have.length.at.least', 1);
    cy.get(`[data-cy='order-panel-history']`)
      .should('have.length.at.least', 1);
    cy.get(`[data-cy='order-panel-history']`)
      .should('have.length.at.least', 1);
});


Given('o usuario não validado esta na pagina {string}', (page: string) => {
});
  
Then('o usuario recebe uma mensagem de erro de validação', () => {
});