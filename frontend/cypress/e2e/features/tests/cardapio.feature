Feature: Cardapio

  Scenario: Ir ao cardapio
    Given Eu estou na pagina "/"
    When Eu vou para a pagina "/adm/cardapio"
    Then Eu estou na pagina "/adm/cardapio"