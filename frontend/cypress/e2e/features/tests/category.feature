Feature: Manipular Categorias
  As um usuário com permissão para manipular Categorias
  I want poder criar, atualizar e excluir Categorias
  So that eu possa gerenciar as Categorias no sistema

  A Categoria é uma forma de agrupar itens semelhantes.C

  Background: usuario com permissões de manipular Categorias
    Given o usuário está logado com o email "admin" e senha "admin"
    And Eu estou an página de categorias: /adm/categorias

  Scenario: Criar uma nova Categoria
    When Eu crio uma categoria com o nome "Bebidas"
    Then Eu vejo a catoria com o nome {string} na lista de categorias
      |     Name    |
      |   Bebidas   |

  Scenario: Atualizando uma categoria existente
    When Eu atualiza a categora com o nome "Bebidas" para "Sobremesas"
    Then Eu vejo a catoria com o nome "Sobremesas" na lista de categorias
      |     Name       |
      |   Sobremesas   |

  Scenario: Deletar uma Categoria
    When Eu deleto a Categoria com nome "Sobremesas"
    Then Eu não vejo a catoria com o nome "Sobremesas" na lista de categorias
      |     Name       |
      |                |
  
  Scenario: Create a Category with the same name
    When the user do a request POST to "/categories" with the following data:
      """
      {
        "Name": "Drinks"
      }
      """
    Then the response status should be 400
    And the response body should be:
      """
      {
        "message": "Categoria 'Drinks' já existe"
      }
      """
    And the categories list should be the same as before

  Scenario: Update a Category with the same name
    When the user do a request PUT to "/categories/Drinks" with the following data:
      """
      {
        "Name": "Vegetarian"
      }
      """
    Then the response status should be 400
    And the response body should be:
      """
      {
        "message": "Categoria 'Vegetarian' já existe"
      }
      """
    And the categories list should be the same as before