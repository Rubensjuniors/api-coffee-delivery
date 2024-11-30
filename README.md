# Geral
## RF
- Deve ser possivel se casdastrar
  - Atualizar Dados
  - Deletar usuario
- Deve ser possivel um usuario Alterar a senha
## RN
  - Usuarios deve ser unicos
    - Nome e email
  - Deve ser possivel caso usuario esqueça a senha solicitar a alteração
## RNF
-  A senha do usuário precisa estar criptografada;
-  Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
-  O usuário deve ser identificado por um JWT (JSON Web Token);

#Dashboard

## RF
- Deve ser possivel Criar/Atualizar/Deletar uma rotina
- Deve ser possivel Listar a rotina
- Deve ser possivel criar/atualizar/deletar uma task
- Deve ser possivel listar todas as tasks
- Deve ser possivel Filtrara a tela por dia e por mes
- Deve ser possivel acada final do dia verificar se a rotina foi concluida e somar os dias consecutivos
- Deve ser possivel obter um resumo dos dias consecutivos

## RN
- Usuario pode ver apenas os seu dados quando logado
- Deve ser possivel ter uma vizualição dos dias anteriores
- Deve ser possivel ver um resumo do mes e marcar cada dia completo que o usuario completo


# Financial
## RF
- Deve ser possivel adicionar entradas de dinheiro
  - Atualizar
  - Deletar
  - Deve ser possivel listar as entrada
  - Deve ser possivel obter a soma de todas as entradas
- Deve ser possivel adicionar um gasto fixo
  - Atualizar
  - Deletar
  - Deve ser possivel listar os gastos fixos
  - Deve ser possivel obter a soma total dos gastos fixos
- Deve ser possivel adicionar um gasto parcelado
  - Atualizar
  - Deletar
  - Deve ser possivel listar os gastos Parcelados
  - Deve ser possivel obter a soma total dos gastos parcelados
- Deve ser possivel adicionar um gato no debito
  - Atualizar
  - Deletar
  - Deve ser possivel listar os gastos de debito
  - Deve ser possivel obter a soma total dos gastos de debito
- Deve ser possivel filtrar cada gasto por mes
- Deve ser possivel ter uma soma de todos os gastos
  - Deve ser possivel quando marcar um gasto com concluido atualizar o valor diminuindo
- Deve ser possivel obeter um resumo de tudo
  - todas as entradas do mes
  - todos os gastos fixo, parcelados e debito
  - Visualização do total do gasto do mes

## RN
- Usuario deve poder ter acesso so os seus gastos cadastrados
- A visualização do gastos deve mudar todo dia primeiro do mês para o proximo mês
- Usuario pode ver os seus gastos dos meses anteriores
- O valor da entrada deve diminuir de acordo com os items marcados como pago
- O valor total dos gasto deve diminuir ate ficar positivo
  - Vermelho para negativo
  - Verde Para Positivo
