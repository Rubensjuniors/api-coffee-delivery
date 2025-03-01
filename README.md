GET	/coffees	Lista todos os cafés
GET	/coffees/:id	Obtém detalhes de um café específico
POST	/coffees	Cria um novo café (apenas admin)
PUT	/coffees/:id	Atualiza um café (apenas admin)
DELETE	/coffees/:id	Deleta um café (apenas admin)

Método	Rota	Descrição
POST	/cart/add	Adiciona um café ao carrinho
GET	/cart	Obtém o carrinho do usuário
DELETE	/cart/:id	Remove um item do carrinho

POST	/orders	Cria um novo pedido
GET	/orders/:id	Obtém detalhes de um pedido específico