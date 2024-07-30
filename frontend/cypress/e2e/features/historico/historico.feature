Feature: historico

  Scenario: exibir detalhes historico de pedidos
    Given o usuario esta na pagina "pedido" 
    When o usuario vai para a pagina "historico"
    Then o usuario ve "status" de pedidos feitos
    Then o usuario ve "preco" do pedidos feitos
    Then o usuario ve "nome" dos "items" do pedidos feitos

  Scenario: exibir historico
    Given o usuario esta na pagina "home" 
    When o usuario vai para a pagina "historico"
    Then o usuario recebe o historico de pedidos

  Scenario: falha ao exibir historico
    Given o usuario não validado esta na pagina "login"
    Then o usuario recebe uma mensagem de erro de validação