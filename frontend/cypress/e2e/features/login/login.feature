Feature: login

  Scenario: Redefinir senha
    When eu clico no link "Esqueceu a senha?"
    Then eu sou redirecionado para a "Página de redefinição de senha"

  Scenario: Navegar para a página de cadastro
    When eu clico no link "Não tem uma conta? Cadastre-se"
    Then eu sou redirecionado para a "Página de cadastro"
