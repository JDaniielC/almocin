Feature: pedido

  Scenario: exibir detalhes de pedido
    Given usuario se encontra na pagina "login"
    And usuario tem pedido com id "pedido-id-0"
    And pedido "pedido-id-0" esta tem status "in cart"
    When usuario vai para a pagina de pedido "pedido/pedido-id-0"
    Then usuario recebe "status", "items", "preco" do pedido "pedido-id-0"
  
  Scenario: exibir pedido
    Given usuario esta na pagina "login" do site
    When usuario vai para a pagina "pedido"
    Then usuario recebe o historico de pedidos

  Scenario: falha ao exibir pedido
    Given um usuario não validado esta na pagina "login" do site
    Then usuario recebe um erro de validação