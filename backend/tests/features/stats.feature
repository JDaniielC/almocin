Feature: Statistics

   Scenario: requisitar todas as estatísticas
    Given há um objeto em "/stats":
    """
      {
        totalUsers: "num_users",
        totalItems: "num_items",
        totalRevenue: "val_rev",
        monthRevenue: "val_monrev",
        totalOrders: "num_orders",
        monthOrders: "num_monorders",
        averageTicket: "val_ticket",
        currentMonthAverageTicket: "val_monticket"
    }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "all"
    Then o status code da rquisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalUsers  |  totalItems  |  totalRevenue  |  monthRevenue  |  totalOrders  |  monthOrders  |  averageTicket  |  currentMonthAverageTicket  |
      | "totalUsers" | "totalItems" | "totalRevenue" | "monthRevenue" | "totalOrders" | "monthOrders" | "averageTicket" | "currentMonthAverageTicket" |
    
  Scenario: requisitar as estatísticas de arrecadação
    Given há um objeto em "/stats":
    """
      {
        totalUsers: "num_users",
        totalItems: "num_items",
        totalRevenue: "val_rev",
        monthRevenue: "val_monrev",
        totalOrders: "num_orders",
        monthOrders: "num_monorders",
        averageTicket: "val_ticket",
        currentMonthAverageTicket: "val_monticket"
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "money"
    Then o status code da rquisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalRevenue  |  monthRevenue  |  averageTicket  |  currentMonthAverageTicket  |
      | "totalRevenue" | "monthRevenue" | "averageTicket" | "currentMonthAverageTicket" |

Scenario: requisitar as estatísticas de mensais
    Given há um objeto em "/stats":
    """
      {
        totalUsers: "num_users",
        totalItems: "num_items",
        totalRevenue: "val_rev",
        monthRevenue: "val_monrev",
        totalOrders: "num_orders",
        monthOrders: "num_monorders",
        averageTicket: "val_ticket",
        currentMonthAverageTicket: "val_monticket"
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "mon"
    Then o status code da rquisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  monthRevenue  |  currentMonthAverageTicket  |  monthOrders  |
      | "monthRevenue" | "currentMonthAverageTicket" | "monthOrders" |
    
