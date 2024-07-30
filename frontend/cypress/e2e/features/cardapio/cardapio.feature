Feature: cardapio

  Scenario: exibir cardapio
    Given o usuario esta em "home" 
    When o usuario vai para "cardapio"
    Then o usuario recebe o cardapio
  
  Scenario: falha ao exibir cardapio
    Given usuario não validade esta na pagina de "login"
    When usuario solicita ir para cardapio
    Then o usuario recebe um erro de validação de cardapio