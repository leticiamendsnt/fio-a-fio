# Roteiro de verificação do M1 — Fio a Fio

Cada integrante de GPTI roda este roteiro **na própria máquina**, seguindo o manual da PSW. Depois confirma ou corrige o resultado de cada pacote no Status Report 1 e põe o nome na coluna "Conferido por". Se o resultado for diferente da prévia, escrevam o que viram: uma diferença sem explicação pesa contra o grupo.

Tempo estimado: 40 minutos.

## 0. Preparar

1. Use o commit da entrega: `git fetch` e depois `git checkout 9e857eb` (ou `develop` atualizada). Confira com `git log -1`: "update README", 06/10/2026 16:53.
2. **Antes de qualquer teste, copie `backend/db.json` para `backend/db.original.json`.** O JSON Server grava as alterações nesse arquivo. No fim, volte a cópia e não faça commit do `db.json` alterado.
3. Siga o README da raiz: `npm ci --prefix backend`, `npm ci --prefix frontend`, depois `npm run dev --prefix backend` num terminal e `npm run dev --prefix frontend` em outro.
4. Anote em qual endereço a interface abriu. O manual diz 5173; na prévia, ela abriu em **3000** (Q-14).

Contas do manual: Ana (usuária) `ana@fioafio.com` / `1234`; Maria (criadora) `maria@fioafio.com` / `1234`; Admin `admin@fioafio.com` / `admin123`. Para trocar de pessoa, use "Entrar" com outra conta.

## 1. Base técnica

| Pacote | Passo | Esperado pelo dicionário | Prévia (10/10) |
|---|---|---|---|
| 1.3.1 | Abrir a interface seguindo o manual. | Aplicação abre com as cores da identidade visual. | Passou (porta 3000) |
| 1.3.4 / 1.4.7 | Parar o terminal do backend (Ctrl+C) e recarregar `/videoaulas`, `/feed`, `/biblioteca` e `/materiais`. Depois religar o backend. | O frontend funciona sem API e sem servidor de dados. | Falhou: só aparece "Não foi possível acessar a API mock" |
| 1.3.5 | Em "Criar conta", cadastrar uma pessoa fictícia. Sair e entrar com ela. Depois tentar entrar com a senha errada. | Cadastro cria a usuária; login sem serviço externo nem dado real. | Passou. Senha errada mostra "Login realizado com carinho!" junto com o erro (Q-13). |
| 1.3.6 | Comprar uma aula pelo Pix e outra pelo cartão, com qualquer número. Procurar na tela um dado de teste que recuse. | Dado de aprovação aprova, dado de recusa recusa, cartão não gravado. | Falhou: sempre aprova, não há dado de recusa. O cartão não aparece no `db.json` (essa parte passa). |
| 1.3.7 | (a) Em "Editar perfil", trocar nome, biografia e URL da foto e marcar "Criadora / Professora"; salvar e recarregar. (b) Comparar o `db.json` atual com a cópia do passo 0. | (a) Fica gravado. (b) A carga de dados é a mesma a cada execução. | Falhou: (a) passa; (b) o `db.json` muda e o arquivo entregue já tem contas de teste `@gmail.com`. |

## 2. Frontend do M1

| Pacote | Passo | Esperado pelo dicionário | Prévia (10/10) |
|---|---|---|---|
| 1.4.1 | Como Ana: criar publicação. Ela aparece no feed? Procurar editar e remover na sua publicação. Curtir uma publicação de outra pessoa duas vezes; comentar. Depois entrar como outra usuária e olhar a mesma curtida. | Criar, consultar, editar e remover a própria; curtir e comentar; segunda curtida não soma. | Falhou: não há editar nem remover; a publicação vai para "análise" e some; a curtida não é por usuária. |
| 1.4.2 | Como Maria: "Minhas Aulas" → "Cadastrar Nova Aula" com preço **0**; de novo com **−5**; de novo com 40. Abrir o catálogo. Editar a aula de 40. Clicar na lixeira de uma aula. | Preço zero ou negativo não é salvo; a criadora edita a própria; a aula retirada some do catálogo. | Falhou: 0 e −5 salvos e no catálogo; a lixeira diz "excluída" e nada muda. |
| 1.4.3 | Como Maria: procurar onde cadastrar material. Em "Materiais", filtrar por tipo (revista, gráfico, receita, apostila). | Cadastrar, editar e remover; filtro por tipo. | Falhou: não há cadastro; o filtro é por categoria. |
| 1.4.4 | Em "Aulas": buscar "Cardigan"; filtrar "Avançado"; abrir o detalhe de uma aula. Como Admin, em "Conteúdos", desativar uma aula e ver se ela some do catálogo (reativar depois). | Só aulas ofertadas; a busca e o filtro excluem as demais; o detalhe tem título, descrição, capa, criadora, preço, duração, nível e avaliação média. | Passou. Ressalva: a busca também procura na descrição (Q-17). |
| 1.4.5 | Como Ana: ver a "Biblioteca"; abrir uma aula que ela não tem → Comprar → Pagamento → Confirmar. Ver a Biblioteca de novo. Comprar **a mesma aula outra vez**. | Iniciar a compra, informar o dado de teste, ver aprovada ou recusada; sem aprovação, fora da estante. | Falhou: não há recusa; a segunda compra da mesma aula é aceita. |
| 1.4.5 / regra 6 | No resumo da compra da aula de R$ 39,90 ou de R$ 49,90, somar as duas partes mostradas. | As partes somam o preço. | Falhou: R$ 33,91 + R$ 5,98 = R$ 39,89 (Q-06). |
| 1.4.6 | Como Ana: abrir `/avaliacao/aula-103` (aula que ela não comprou) e enviar uma nota. Ver se a média ou o número de avaliações da aula mudou. Entrar como `carla@fioafio.com` / `1234` e abrir "Vendas". | Só a aula comprada aceita nota; as vendas mostram preço, parte da criadora e parte da plataforma por venda. | Falhou: aceita aula não comprada e não grava; sem parte da plataforma; totais com vendas de outra criadora. |
| 1.4.8 | Procurar o registro da demonstração de 06/10. | O roteiro foi executado e a limitação dos dados simulados foi registrada. | Não demonstrado. |

## 3. Fora da EAP (registrar, não aceitar)

Anotar se aparecem: moderação de publicações, painel de administração, chat, stories, botão "Seguir", pesquisa de perfis. Cada um já está no registro de mudanças (MUD-01 a MUD-05).

## 4. Fechar

1. Parar os dois terminais.
2. Copiar `backend/db.original.json` de volta para `backend/db.json`.
3. Atualizar a coluna "Conferido por" no Status Report 1 e, se algo diferir da prévia, corrigir o resultado e a questão correspondente.
