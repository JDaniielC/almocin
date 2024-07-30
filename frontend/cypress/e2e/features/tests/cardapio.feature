Feature: Cardapio

  Scenario: Criar item
    Given Na pagina: "/adm/cardapio"
    When Eu clico no botao criar
    Then Eu cliquei no botao
    
  Scenario: Ir ao cardapio do administrador
    Given Eu estou na página: "/"
    When Eu vou para a página: "/adm/cardapio"
    Then Eu estou na página

  Scenario: Ir para cardapio do administrados
    Given Estou na página: "/"
    When Eu cliquei no botao no canto superior esquerdo
    Then Estou na página

  Scenario: Ir ao cardapio
    Given Eu estou na pagina: "/historico"
    When Eu vou para a pagina: "/"
    Then Eu estou na pagina

  Scenario: Ir para cardapio
    Given Estou na pagina: "/"
    When Eu cliquei no botao do canto superior esquerdo
    Then Estou na pagina