import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

type PageName = 'Página de login' | 'Página de redefinição de senha' | 'Página de cadastro';

const pageMapping: { [key in PageName]: string } = {
  'Página de login': '/login',
  'Página de redefinição de senha': '/forgot-password',
  'Página de cadastro': '/cadastro',
};


Given("eu estou na {string}", (pagina: PageName) => {
  cy.visit(pageMapping[pagina]);
});

When("eu clico no link {string}", (link: string) => {
});

Then("eu sou redirecionado para a {string}", (pagina: PageName) => {
  
});
