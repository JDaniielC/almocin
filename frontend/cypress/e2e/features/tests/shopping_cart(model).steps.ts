/* Importante: É apenas um modelo simples que não está totalmente correto
 * a inteção desse modelo é para facilitar o entendimento do testes
 * um bom teste vai ser bem mais extenso do que está nesse modelo 
 */

import { Given, When, Then, Before, And } from "@badeball/cypress-cucumber-preprocessor/";

const mockUser = {
  id: 'b838e597-1475-4fb8-b900-82f2ca52c8c2',
  name: 'Yuri Cardoso',
  email: 'yuri_cardoso@ozsurfing.com.br',
  gender: 'M',
  cpf: '76803736202',
  cep: '33933-591',
  password: '123yuri123',
  paymentMethod: 'credit_card',
  recoveryQuestion: 'meu nome',
  active: true,
  createdAt: new Date(),
};

const mockItemMenu = [
  {
    id: '1ac24676-3180-4eae-82ab-b3848e5a3778',
    name: 'Coca-Cola',
    price: 5.00,
    image: 'coca-cola.jpg',
    categoryID: '1',
    oldPrice: 0,
    description: 'Gelada',
    timeToPrepare: 5,
    active: true,
    createdAt: new Date(),
  },

  {
    id: '714fdcae-d307-4e17-978f-60b5ccfb6e20',
    name: 'Hamburguer',
    price: 15.00,
    image: 'ham.jpg',
    categoryID: '2',
    oldPrice: 0,
    description: 'feito de carne',
    timeToPrepare: 10,
    active: true,
    createdAt: new Date(),
  },

  {
    id: '79b5cfc0-3329-4b5b-90b5-67e22e503fa6',
    name: 'Batata Frita',
    price: 10.00,
    image: 'bt.jpg',
    categoryID: '3',
    oldPrice: 0,
    description: 'Sem Oléo',
    timeToPrepare: 5,
    active: true,
    createdAt: new Date(),
  },

  {
    id: '203d07ad-7a92-4b76-a2ba-7a88f982c121',
    name: 'Sorvete',
    price: 7.00,
    image: 'ice-cream.jpg',
    categoryID: '2',
    oldPrice: 0,
    description: 'Chocolate',
    timeToPrepare: 5,
    active: true,
    createdAt: new Date(),
  },
];

Before(() => {
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify(mockUser));
  });
});

//  Scenario: excluir um item do carrinho de compras
Given('eu estou na "página do carinho de compras"', () => {
  cy.visit('/cart');
});

And('meu "carrinho de compras" tem o item "Coca-Cola"', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('cart', JSON.stringify(mockItemMenu[0]));
  });

  cy.visit('/cart');
});


When('eu seleciono "Excluir" no item Coca-Cola', () => {
  cy.get('app-button button').contains('Excluir').click();
});

Then('eu estou na "página do carinho de compras"', () => {
  cy.visit('/cart');

  
});

And('eu não vejo o item "Coca-Cola"', () => {
  cy.get('app-button button').contains('Excluir').should('not.exist');
  /* Só está sendo verificado se o botão excluir do item não existe mais 
   * O correto é que ele verifique cada atributo do item para vê se está tudo certo
   */
});
