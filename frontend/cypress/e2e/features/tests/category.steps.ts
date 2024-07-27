
import { Given, When, Then, Then as And } from "@badeball/cypress-cucumber-preprocessor/";


Given('o usuário está logado com o email {string} e senha {string}', (admin: string) => {
  cy.visit('/');
  cy.get('[data-cy="login"]').type(admin);
  cy.get('[data-cy="password"]').type(admin);
  cy.get('[data-cy="submit-login"]').click();
});

And('Eu estou an página de categorias: {string}', (categoryPage: string) => {
  cy.visit(categoryPage);
});

//Criar uma nova Categoria
When('Eu crio uma categoria com o nome {string}', (categoryName: string) => {
  cy.get('[data-cy="name-new-category"]').type(categoryName);
  cy.get('[data-cy="add-category"]').click();
});

Then('Eu vejo a catoria com o nome {string} na lista de categorias', (categoryName: string) => {
  cy.get('[data-cy="list-category"]').contains(categoryName);
});


//Atualizar nome da Categoria
And('Eu estou an página de categorias: {string}', (categoryPage: string) => {
  cy.visit(categoryPage);
});

When('Eu atualiza a categora com o nome {string} para {string}', (oldName: string, newName: string) => {
  cy.contains(oldName).parent().find('[data-cy="edit-category"]').click();
  cy.get('[data-cy="name-new-category"]').clear().type(newName);
  cy.get('[data-cy="edit-category"]').click();
});

Then('Eu vejo a catoria com o nome {string} na lista de categorias', (categoryName: string) => {
  cy.get('[data-cy="list-category"]').contains(categoryName);
});

//Deletar uma Categoria
And('Eu estou an página de categorias: {string}', (categoryPage: string) => {
  cy.visit(categoryPage);
});

When('Eu deleto a Categoria com nome {string}', (categoryName: string) => {
  cy.contains(categoryName).parent().find('button[name="Deletar categoria"]').click();
});

Then('Eu não vejo a catoria com o nome {string} na lista de categorias', (categoryName: string) => {
  cy.get('[data-cy="list-category"]').should('not.exist', categoryName);
});