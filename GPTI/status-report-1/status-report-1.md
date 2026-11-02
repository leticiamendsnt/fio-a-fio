# Status Report 1 — Fio a Fio

**Projeto:** Fio a Fio — protótipo de rede social de crochê com venda de vídeo-aulas
**Patrocinador:** Prof. Diogo Mendonça
**Gerente do projeto:** Matheus Cunha Schwab
**Equipe de gestão (GPTI):** Matheus Cunha Schwab, Gabriel Barretto Galdino dos Santos e Guilherme Barboza Araújo de Almeida
**Entrega deste relatório:** 26/10/2026, aula de GPTI da semana 9
**Linha de base usada:** plano de projeto v1.0, dicionário da EAP v1.0 e declaração do escopo, todos de 05/10/2026

Este relatório compara a entrega da PSW com a linha de base. Não descreve o trabalho de GPTI, exceto as ações da seção 6.2. Cronograma, custo e valor agregado ficam para o Status Report 2.

---

## 1. Data de status e período coberto

| Item | Valor |
|---|---|
| **Data de status** | **06/10/2026, 16:53** — corte da entrega da PSW no M1 |
| Commit verificado | `9e857eb` (`develop`, "update README"), que inclui `158bace` ("feat: corrige abas, integra JSON Server e atualiza a documentação", 06/10/2026, 16:28) |
| Repositório | [github.com/leticiamendsnt/fio-a-fio](https://github.com/leticiamendsnt/fio-a-fio), branch `develop` |
| Período coberto | Semanas 1 a 8 de PSW, de 04/08/2026 a 06/10/2026, que fecham o marco 1 |
| Marco avaliado | **M1 — Frontend dos fluxos priorizados, com dados simulados locais** (EAP 1.4 e base técnica 1.3 usada pelo M1) |
| Fora deste relatório | 1.3.2, 1.3.3, 1.5 e 1.6, que são do M2; cronograma, custo e valor agregado, que ficam para o Status Report 2 |

Não houve commit na `develop` entre o corte e a data da verificação. A entrega chegou no dia do marco, 06/10, e não houve atraso. Ela veio parcial (Q-01).

> A verificação do M1 foi pré-feita com apoio de IA em 10/10/2026, sobre o mesmo commit da entrega. Cada resultado foi depois conferido pelos integrantes de GPTI que rodaram o roteiro de verificação, e as recomendações são da equipe. O uso está lançado no registro de uso de IA do plano.

## 2. Situação geral

### Apresenta falhas com atenção aos detalhes

**Justificativa, pelo escopo:**

1. **O núcleo da declaração do escopo não passa.** A declaração (seção 4.1 do plano) é "uma usuária fictícia encontra uma vídeo-aula, compra com pagamento simulado, vê a aula na estante e a avalia, e uma criadora consulta suas vendas com a divisão de 85% e 15%". Na entrega:
   - o pagamento não recusa;
   - a compra repetida é aceita;
   - a avaliação não é gravada;
   - as duas partes da divisão mostradas no checkout não somam o preço.

   O critério geral de aceite do plano proíbe exatamente compra repetida e soma diferente do preço.
2. **9 dos 13 pacotes do M1 falharam e 1 não foi demonstrado.** Passaram 1.3.1, 1.3.5 e 1.4.4.
3. **A forma de acesso aos dados mudou sem solicitação de mudança.** O M1 passou a depender de um servidor de dados (JSON Server), contra o aceite de 1.3.4 e 1.4.7. Sem o servidor, nenhuma tela abre (MUD-01).
4. **A equipe de produto declara um integrante a menos.** Isso está no README da entrega. O risco RG02 disparou e afeta os pacotes que dependem dessa pessoa (Q-02).

**Recomendação ao patrocinador: não aceitar o M1 nesta entrega.** A decisão é do patrocinador, depois deste relatório e da verificação independente dele.

## 3. Escopo, pacote por pacote

Resultado: **Passou**, **Falhou** ou **Não demonstrado**. O critério é copiado do dicionário da EAP. Nenhum item está marcado como aceito. A coluna "Recomendação" é a posição da equipe GPTI sobre o aceite.

| Pacote | Critério observável (dicionário) | Resultado | O que se observou | Recomendação | Questão | Conferido por |
|---|---|---|---|---|---|---|
| 1.3.1 Aplicação React | Outro aluno executa a aplicação seguindo a instrução do repositório e vê as cores definidas na identidade visual. | **Passou** | `npm ci` e `npm run dev` funcionam e a identidade visual aparece. A interface sobe na porta **3000**, não na 5173 que o README indica (está desatualizado). O `frontend/README.md` ainda descreve o protótipo HTML antigo. | Aceitar | Q-14 |Gabriel, Guilherme e Matheus|
| 1.3.4 Dados simulados em `src/mocks` | O frontend do M1 funciona só com os módulos locais, sem API e sem servidor de dados. | **Falhou** | As telas leem o JSON Server (`services/api.js`). Os módulos de `src/mocks` ficaram só como referência. Com a API parada, todas as telas mostram apenas "Não foi possível acessar a API mock" ([evidência](evidencias/50-sem-api-videoaulas.png)). **Causa:** o dicionário pede que o frontend leia `src/mocks`, e a PSW trocou essa fonte por uma API (MUD-01), sem pedido de mudança aprovado. | Não aceitar | Q-03, MUD-01 |Gabriel, Guilherme e Matheus|
| 1.3.5 Cadastro e login simulados | O cadastro cria uma usuária fictícia, e o fluxo de login termina sem serviço externo e sem dado pessoal real. | **Passou** | O cadastro grava a nova usuária e o login entra com ela, sem serviço externo. Defeitos de uso: com senha errada aparecem juntas "Login realizado com carinho!" e "E-mail ou senha inválidos" ([evidência](evidencias/02-login-senha-errada.png)); a aplicação já abre logada como Ana, sem login. O `db.json` traz três contas `@gmail.com`, confirmadas como fictícias. | Aceitar | Q-12, Q-13 |Gabriel, Guilherme e Matheus|
| 1.3.6 Simulador de pagamento | O dado de teste de aprovação sempre aprova e o de recusa sempre recusa; nenhum número de cartão é gravado. | **Falhou** | Não há dado de teste. Pix e cartão sempre aprovam, inclusive com cartão de "recusa". O número do cartão não é gravado; essa metade passa. | Não aceitar | Q-04 |Gabriel, Guilherme e Matheus|
| 1.3.7 Perfis e dados de demonstração | A carga de dados cria as mesmas usuárias, criadoras, aulas e materiais a cada execução. A usuária edita nome, biografia e foto fictícia e ativa o perfil de criadora no próprio perfil. | **Falhou** | A edição do perfil passa: nome, biografia, URL da foto e troca para criadora ficaram gravados. A carga não se repete: o JSON Server grava no `db.json`, não há script de restauração e o arquivo entregue já tem contas de teste. **Causa da falha:** o `db.json` gravável vem da troca de `src/mocks` pela API (MUD-01); com módulos locais em memória, a carga seria a mesma a cada execução. | Não aceitar | Q-12, MUD-01 |Gabriel, Guilherme e Matheus|
| 1.4.1 Publicações | Criar, consultar, editar e remover publicação própria; curtir e comentar publicação de outra usuária. A segunda curtida da mesma usuária não soma. | **Falhou** | Não há editar nem remover. A publicação criada fica "em análise" (moderação, fora do escopo) e não aparece no feed nem no perfil da autora. Curtir e comentar funcionam, e a segunda curtida desfaz a primeira. A curtida, porém, não é por usuária: Júlia curte (43), Ana entra, já vê o coração marcado e, ao clicar, volta a 42. | Não aceitar | Q-11, MUD-02 |Gabriel, Guilherme e Matheus|
| 1.4.2 Vídeo-aulas da criadora | Cadastrar, consultar e editar vídeo-aula própria. Aula sem preço, ou com preço zero ou negativo, não é salva. A aula retirada some do catálogo. | **Falhou** | Cadastrar, consultar e editar funcionam. Aulas com preço **R$ 0** e **R$ −5** foram salvas e aparecem no catálogo ([evidência](evidencias/21-catalogo-com-invalidas.png)); a edição também aceita preço 0. A criadora não retira a aula: o botão de lixeira mostra "Simulação: Aula … excluída." e nada muda. Só o perfil de administrador desativa a aula, e aí ela some do catálogo. | Não aceitar | Q-09 |Gabriel, Guilherme e Matheus|
| 1.4.3 Materiais gratuitos | Cadastrar, editar e remover material próprio; a lista filtra por tipo e exclui os demais. | **Falhou** | Não há tela de cadastro, edição nem remoção pela criadora. O filtro é por **categoria** (Vestuário, Amigurumi…), não por **tipo** (revista, gráfico, receita, apostila). | Não aceitar | Q-10 |Gabriel, Guilherme e Matheus|
| 1.4.4 Catálogo e detalhe | A lista mostra só aulas ofertadas. Busca por título e filtro por nível excluem as demais. O detalhe mostra título, descrição, capa, criadora, preço, duração, nível e avaliação média. | **Passou** | A aula desativada sai do catálogo. "Cardigan" devolve só o Cardigan. "Avançado" devolve só a Manta. O detalhe mostra todos os campos pedidos. Ressalvas: a busca também procura na descrição ("crochê" traz a Manta, que não tem a palavra no título); detalhe com id inexistente abre outra aula. | Aceitar | Q-17 |Gabriel, Guilherme e Matheus|
| 1.4.5 Compra, pagamento e estante | A usuária inicia a compra, informa o dado de teste e vê aprovada ou recusada. Antes da aprovação, a aula não está na estante. | **Falhou** | A compra começa no detalhe e, antes de pagar, a aula não está na estante; essa parte passa. Não há dado de teste nem resultado "recusada": toda compra nasce "Concluído". A mesma aula foi comprada duas vezes pela mesma usuária. | Não aceitar | Q-04, Q-05 |Gabriel, Guilherme e Matheus|
| 1.4.6 Avaliação e vendas | Só a aula comprada aceita nota de 1 a 5. A tela de vendas mostra, por venda, o preço, a parte da criadora e a parte da plataforma. | **Falhou** | A tabela de vendas não tem a parte da plataforma por venda. Os totais da Carla (R$ 214,60 brutos) somam vendas de outra criadora: as dela dão R$ 69,80. A compra nova não gera venda ([evidência](evidencias/43-vendas-carla.png)). A avaliação aceita aula não comprada e informa que foi enviada, mas não é gravada (Q-07). No checkout, as duas partes da divisão não somam o preço, e a tela de vendas mostra valores diferentes dos do checkout (Q-06). | Não aceitar | Q-06, Q-07, Q-08 |Gabriel, Guilherme e Matheus|
| 1.4.7 Frontend ligado aos dados simulados | Os fluxos de 1.4.1 a 1.4.6 leem os módulos de `src/mocks`, não uma API. | **Falhou** | Todos os fluxos leem a API HTTP do JSON Server. **Causa:** o aceite exige leitura de `src/mocks`, e a PSW trocou a fonte por uma API (MUD-01), sem pedido de mudança aprovado. Os demais defeitos dos fluxos 1.4.1 a 1.4.6 estão nos próprios pacotes e não vêm desta troca. | Não aceitar | Q-03, MUD-01 |Gabriel, Guilherme e Matheus|
| 1.4.8 Demonstração do M1 | A demonstração da semana 8 executa o roteiro e registra a limitação dos dados simulados. | **Não demonstrado** | Não há no repositório roteiro executado nem registro da demonstração de 06/10. | Não aceitar até haver registro | Q-16 |Gabriel, Guilherme e Matheus|

**Resumo:** 3 passaram, 9 falharam e 1 não foi demonstrado.

### As três perguntas do controle do escopo

1. **O que está na EAP deste marco foi entregue?** **Não.** Faltam:
   - editar e remover publicação (1.4.1);
   - retirar aula pela criadora (1.4.2);
   - cadastro, edição e remoção de material (1.4.3);
   - recusa do pagamento (1.3.6 e 1.4.5);
   - parte da plataforma por venda (1.4.6);
   - registro da demonstração (1.4.8).

   Cada falta virou questão.
2. **O que foi entregue está na EAP?** **Não.** Foram entregues:
   - um servidor de dados (JSON Server);
   - moderação de publicações;
   - painel de administração com suspensão de usuárias, moderação e gestão de conteúdo;
   - chat;
   - stories;
   - botão "Seguir".

   Nenhum tem solicitação de mudança. Estão no [registro de mudanças](registro-de-mudancas.md) como MUD-01 a MUD-05. Nenhum deles é aprovado por estar pronto ou por agradar na tela.
3. **O que foi entregue atende ao aceite do dicionário?** **Em 3 de 13 pacotes.** Os demais estão no [registro de questões](registro-de-questoes.md).

## 4. Requisitos do marco 1: atendidos e pendentes

Matriz de rastreabilidade (plano, seção 4.3), restrita aos pacotes do M1. O requisito conta como atendido no M1 quando todos os pacotes do M1 ligados a ele passaram.

| Requisito | Pacotes do M1 | Situação no M1 | Motivo |
|---|---|---|---|
| REQ-01 Encontrar e conhecer a aula | 1.4.4 | **Atendido** | 1.4.4 passou. |
| REQ-02 Comprar e saber se foi aprovada | 1.4.5 | **Pendente** | Não há resultado "recusada" (1.4.5 falhou). |
| REQ-03 Assistir só ao que comprou | 1.4.5 | **Pendente** | Sem compra pendente ou recusada, não há como mostrar que a aula fica fora da estante sem aprovação (1.4.5 falhou). |
| REQ-04 Registrar a parte da criadora e a da plataforma | 1.4.6 | **Pendente** | Sem parte da plataforma por venda; as partes do checkout não somam o preço (1.4.6 falhou). |
| REQ-05 Oferecer, alterar e retirar aulas | 1.4.2 | **Pendente** | Aceita preço inválido; a criadora não retira a aula (1.4.2 falhou). |
| REQ-06 Avaliar depois de comprar | 1.4.6 | **Pendente** | A avaliação não é gravada e aceita aula não comprada (1.4.6 falhou). |
| REQ-07 Compartilhar e interagir | 1.4.1 | **Pendente** | Sem editar nem remover; a publicação não aparece (1.4.1 falhou). |
| REQ-08 Materiais gratuitos | 1.4.3 | **Pendente** | Sem cadastro; sem filtro por tipo (1.4.3 falhou). |
| REQ-09 Conta e perfil simulados | 1.3.5, 1.3.7 | **Pendente** | 1.3.5 passou e 1.3.7 falhou. Fora dos pacotes do M1: a usuária sem perfil de criadora abre as telas de cadastrar aula e de vendas (Q-15). |
| REQ-10 Pagamento sem provedor e sem cartão | 1.3.6 | **Pendente** | Não há chamada externa e o cartão não é gravado, mas o simulador não tem dado de recusa (1.3.6 falhou). |
| REQ-11 Conduzir e registrar aceite | 1.1 | **Em andamento** | AV1 entregue em 05/10. O registro de aceite ou de recusa do M1 (1.1.3) depende da decisão DEC-1. |

**Requisitos do M1 sem todos os pacotes aprovados:** REQ-02 a REQ-10. Só o REQ-01 tem todos os seus pacotes do M1 verificados com resultado "passou".

## 5. Questões e mudanças solicitadas

### 5.1 Questões abertas

Detalhe, dono e data no [registro de questões](registro-de-questoes.md).

| ID | Questão | Dono | Data |
|---|---|---|---|
| Q-01 | Entrega do M1 parcial: 9 pacotes falharam e 1 não foi demonstrado | Matheus | 26/10 |
| Q-02 | Equipe PSW declara um integrante a menos (RG02 disparou) | Matheus | 13/10 |
| Q-03 | M1 depende do JSON Server; sem ele nada abre (1.3.4, 1.4.7) |Letícia (rever após Q-02) | 13/10 |
| Q-04 | Pagamento sem dado de teste e sem recusa (1.3.6, 1.4.5) | Maria Clara | 27/10 |
| Q-05 | Compra repetida da mesma aula aceita (1.4.5) | Maria Clara | 27/10 |
| Q-06 | Partes da divisão não somam o preço; checkout e vendas mostram valores diferentes | Maria Clara | 27/10 |
| Q-07 | Avaliação aceita aula não comprada, diz que enviou e não grava (1.4.6) | Letícia | 27/10 |
| Q-08 | Vendas sem parte da plataforma; totais com vendas de outra criadora; compra nova não gera venda (1.4.6) | Letícia | 27/10 |
| Q-09 | Preço 0 e negativo salvos; "excluir" aula que não exclui; criadora não retira (1.4.2) | Maria Clara | 27/10 |
| Q-10 | Materiais sem cadastro, edição e remoção; filtro por categoria, não por tipo (1.4.3) | Maria Clara (rever após Q-02) | 27/10 |
| Q-11 | Publicação sem editar e remover; some na moderação; curtida não é por usuária (1.4.1) | Letícia | 27/10 |
| Q-12 | Carga de dados não se repete; `db.json` com resíduos de teste e contas `@gmail.com` (1.3.7, 1.3.5) | Letícia (rever após Q-02) | 13/10 |
| Q-13 | Login com mensagem de sucesso na senha errada; app abre logada sem login | Maria Clara (rever após Q-02) | 27/10 |
| Q-14 | README indica a porta 5173, mas a interface sobe na 3000; `frontend/README.md` desatualizado | Maria Clara (rever após Q-02) | 13/10 |
| Q-15 | Usuária sem perfil de criadora abre as telas de cadastro de aula e de vendas | Gabriel | 27/10 |
| Q-16 | Sem registro da demonstração do M1 (1.4.8) | Guilherme | 26/10 |
| Q-17 | Busca também procura na descrição; detalhe com id inexistente abre outra aula | Maria Clara | 27/10 |

### 5.2 Mudanças registradas sem solicitação

Detalhe no [registro de mudanças](registro-de-mudancas.md). Nenhuma tem pedido escrito. Nenhuma está aprovada.

| ID | O que foi feito fora da linha de base | Recomendação da equipe GPTI |
|---|---|---|
| MUD-01 | JSON Server como fonte de dados do M1, no lugar de `src/mocks` | PSW abre a solicitação de mudança por escrito até 13/10, para o patrocinador decidir antes da atividade D11 do cronograma. Enquanto não houver decisão, 1.3.4 e 1.4.7 contam como falhos. |
| MUD-02 | Moderação de publicações e painel de administração com gravação | Não aprovar. Retirar a moderação do caminho da publicação, que bloqueia 1.4.1. |
| MUD-03 | Chat com conversas e mensagens gravadas | Não aprovar. Não investir mais horas. |
| MUD-04 | Criação e exibição de stories | Não aprovar. Não investir mais horas. |
| MUD-05 | Botão "Seguir" no perfil e pesquisa de perfis e publicações | Não aprovar. Não investir mais horas. |

## 6. Próximas ações e decisões pedidas ao patrocinador

### 6.1 Decisões pedidas ao patrocinador

| ID | Decisão | Opções | Recomendação da equipe GPTI | Prazo |
|---|---|---|---|---|
| DEC-1 | Aceite do M1 | (a) aceitar; (b) recusar e marcar nova verificação; (c) aceitar com limitações registradas | **(b) Recusar.** Nova verificação sobre o commit que a PSW indicar até 27/10, com o mesmo roteiro. | 26/10 |
| DEC-2 | MUD-01: fonte de dados do M1 | (a) PSW volta a `src/mocks` no M1; (b) aprovar a API local de demonstração: reescrever o aceite de 1.3.4 e 1.4.7 e decidir se o M2 continua em Express e MongoDB | Decidir com a solicitação escrita da PSW, **antes da atividade D11 do cronograma** (confirmação da tecnologia do backend, semana 9 de PSW). A equipe GPTI não recomenda (b) sem o efeito no prazo e no custo descrito no pedido. | 13/10. Levada ao patrocinador antes deste relatório, pela regra da seção 5.1 do plano. Se não houver decisão até lá, 26/10. |
| DEC-3 | MUD-02 a MUD-05: funcionalidades fora da EAP | (a) não aprovar e retirar da demonstração; (b) não aprovar e manter como estão, sem novas horas e fora do aceite; (c) aprovar por solicitação de mudança | **(b)**, com uma exceção: a moderação sai do caminho da publicação (Q-11). | 26/10 |
| DEC-4 | Integrante ausente na PSW (RG02) | (a) redistribuir os pacotes da pessoa entre Letícia e Maria Clara; (b) aplicar a resposta da seção 6.3.3 do plano: reduzir o feed e os materiais ao cadastro básico e preservar o fluxo de compra | Confirmar primeiro quem saiu (Q-02). Se a capacidade cair de três para duas pessoas, **(b)**. | 26/10 |

### 6.2 Próximas ações da equipe

| Ação | Responsável | Prazo |
|---|---|---|
| Cada integrante de GPTI roda o roteiro de verificação na própria máquina, com o manual da PSW, e preenche a coluna "Conferido por" | Matheus, Gabriel e Guilherme | 20/10 |
| Apresentar as questões Q-01 a Q-17 à Letícia na reunião conjunta, confirmar os donos e as datas | Matheus | 13/10 |
| Confirmar com a Letícia quem saiu da equipe PSW e desde quando | Matheus | 13/10 |
| Pedir à PSW a solicitação escrita da MUD-01 (o que muda, em qual pacote, efeito em escopo, prazo e custo) | Gabriel | 13/10 |
| Começar o apontamento de horas por aluno, por atividade do cronograma (D01–D18, G01–G12), com esforço restante, na [planilha combinada](apontamento-de-horas.csv). Base do Status Report 2. | Matheus e Letícia | Começa na semana de 05/10; primeira conferência em 13/10 |
| Lançar no registro de uso de IA do plano (seção 9) o uso de IA para ler o repositório e pré-testar a entrega | Matheus | 26/10 |
| Registrar o aceite ou a recusa do M1 (1.1.3) com a decisão DEC-1 | Guilherme | 26/10 |
| Nova verificação do M1 sobre o commit corrigido | Guilherme | 09/11 (Status Report 2) |
