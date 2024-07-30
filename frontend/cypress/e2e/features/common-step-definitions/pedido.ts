import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

enum OrderStatus {
    inCart = "In Cart",
    inProgress = "In Progress",
    canceled = "Canceled",
    concluded = "Concluded"
  }
  
Given('usuario se encontra na pagina {string}',(page:string)=>{
    cy.visit(`/${page}`)
});
Then('usuario tem pedido com id {string}',(pedidoId:string)=>{
    cy.request('GET', `http://localhost:5001/api/order/${pedidoId}`).then((response) => {
        // Assert the response status and body
        expect(response.status).to.eq(200);
        const order = response.body.data;
      });
});
Then('pedido {string} esta tem status {string}',(pedidoId:string, pedidoStatus:string)=>{

    cy.request('GET', `http://localhost:5001/api/order/${pedidoId}`).then((response) => {
        expect(response.status).to.eq(200);
        const order = response.body.data;
        console.log(order.id )
        expect(order.id).to.eq(pedidoId);
        expect(order.status).to.eq(OrderStatus.concluded);
        expect(order.itemsId.length).to.greaterThan(0)
      });
});
When('usuario vai para a pagina de pedido {string}',(pedidoPage:string)=>{
    cy.visit(`/${pedidoPage}`)
});
Then('usuario recebe "status", "items", "preco" do pedido {string}',(pedidoId:string)=>{
    
    cy.get(`[data-cy='status-pedido']`).should("exist")
    cy.get(`[data-cy='item-pedido']`).should("exist")
    cy.get(`[data-cy='price-pedido']`).should("exist")
});
    

Given('usuario esta na pagina {string} do site', (page: string) => {
});

When('usuario vai para a pagina {string}', (page: string) => {
});

Then('usuario recebe o historico de pedidos', () => { 
});


Given('um usuario não validado esta na pagina {string} do site', (page: string) => {
});
  
Then('usuario recebe um erro de validação', () => {
});