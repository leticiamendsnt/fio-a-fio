# Correção da AV1 — PSW — Fio a Fio

Repositório: https://github.com/leticiamendsnt/fio-a-fio/

A nota de cada aluno é a parte comum do grupo mais a qualidade individual. Quem não tem commit no repositório recebe a parte comum do grupo, sem a parte individual. A parte comum vale 60 pontos: stack da disciplina (30) e escopo funcionando (30). Os 40 restantes avaliam a qualidade do que o próprio aluno fez.

| Aluno | Nota |
| --- | ---: |
| Maria Clara Mousinho de Salles | 83 |
| Letícia Mendonça dos Santos | 81 |
| Kauã Di Franco de Andrade Monteiro | 43 |

## Parte comum — 43/60

A correção usou a branch `develop`, que o README chama de principal e integra o JSON Server. A branch `feature/frontend-ui-react`, que o clone inicial apontou como padrão, para no setup de 22/09, antes dessa API.

A stack vale 18/30.

- 5 pontos. React com rotas de feed, perfil, stories, vídeo-aulas, compra, criador e administração.
- 0. React Hook Form não está no `package.json` nem no código. Os formulários usam `useState`.
- 0. Zod não está no projeto.
- 3 pontos. TanStack Query 5 lê as coleções com `useQuery`, e as telas invalidam a consulta depois de cada gravação, em oito pontos do código. As gravações passam por `fetch` em `frontend/src/services/api.js`. Os 2 pontos que faltam são do `useMutation`, que a disciplina pede para a escrita e que não está no projeto.
- 5 pontos. O JSON Server sobe com `npm run dev --prefix backend` na porta 3001. O pacote pede Node 22 e avisou o motor nesta máquina; a API mesmo assim atendeu.
- 5 pontos. Tailwind é o framework de interface.

O escopo vale 25/30. A régua é a matriz da `DocumentacaoFioAFio.md`. O núcleo pedido é vídeo-aula e compra. Entrei com Maria (`maria@fioafio.com`), Ana (`ana@fioafio.com`) e a administração (`admin@fioafio.com`), as contas do README. Publicação e cadastro foram percorridos na revisão da correção, sobre a mesma versão do repositório.

- 9 pontos, vídeo-aula, de 10. Maria cadastrou "Aula AV1 Granny", que ficou em `GET /videoLessons` como `ZhI_LP4PbD0`, R$ 29,90. A edição mudou o preço para R$ 19,90, e a ficha pública mostrou esse valor. A remoção da aula é a desativação pela administração, em `PersistedContentManagementPage.jsx`, com `PATCH` e o registro preservado; o README descreve essa escolha. O ponto que falta é o da criadora, que não tem como retirar a própria aula do catálogo.
- 6 pontos, compra, de 8. Ana abriu o resumo de R$ 19,90, com R$ 16,91 para a criadora, e confirmou o Pix simulado. A compra `t_F33AbfxQ4` ficou `Concluído` na API. O histórico não oferece cancelar a compra.
- 5 pontos, comunidade, de 6. O feed da Maria e o da Ana listaram publicações e comentários vindos da API. Maria criou "Publicacao AV1 Recorrecao", que entrou em `GET /posts` com `moderationStatus` `pending` e fora do feed. A administração aprovou em `/admin/publicacoes`, o registro passou a `approved` e a publicação apareceu no feed. Editar e excluir a própria publicação não existem nas telas.
- 5 pontos, conta, de 6. O login das duas contas abriu o feed no nome certo. O cadastro em `/cadastro` gravou `contaav1@fioafio.com` em `GET /users` e entrou direto no feed. Excluir a conta não existe.

O commit de Matheus Cunha Schwab, "docs(gpti): artefatos da AV1", está na branch de documentação de GPTI. A documentação de PSW lista Letícia e Maria Clara.

## Maria Clara Mousinho de Salles — 83

Os commits de navegação, landing, perfil, modal de publicação e chat estão no nome dela. A nota reúne os 43 pontos do grupo e 40 de qualidade.

O feed que a correção abriu usa essa navegação e lista as publicações da API, com curtidas e comentários. A publicação criada passou pelo modal dela e entrou pendente de moderação. A troca de conta entre Maria e Ana manteve o nome certo no cabeçalho.

## Letícia Mendonça dos Santos — 81

O setup do React, a refatoração visual e o commit que integra o JSON Server estão no nome dela. A nota reúne os 43 pontos do grupo e 38 de qualidade.

Desconto na parte individual:

- 2 pontos. Em `frontend/src/pages/auth/LoginPage.jsx`, o envio grava a mensagem "Login realizado com carinho! Bem-vinda de volta" antes de localizar o usuário. A conta suspensa recebe o texto "Esta conta estÃ¡ suspensa", com a palavra quebrada.

A aula criada, a alteração de preço e a compra da Ana passaram por `frontend/src/services/api.js`, que só segue em frente quando a resposta vem com sucesso. O catálogo do criador mostrou a aula nova.

## Kauã Di Franco de Andrade Monteiro — 43

Não há commit, e-mail nem arquivo com o nome dele no repositório. O grupo oficial e o plano de GPTI incluem o nome dele na equipe de PSW. A nota é a parte comum do grupo, 43 pontos. Sem commit, não há parte individual a avaliar.
