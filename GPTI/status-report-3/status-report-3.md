# Status Report 3 — Fio a Fio

**Projeto:** Fio a Fio — protótipo de rede social de crochê com venda de vídeo-aulas
**Patrocinador:** Prof. Diogo Mendonça
**Gerente do projeto:** Matheus Cunha Schwab
**Equipe de gestão (GPTI):** Matheus Cunha Schwab, Gabriel Barretto Galdino dos Santos e Guilherme Barboza Araújo de Almeida
**Equipe de produto (PSW):** Letícia Mendonça dos Santos (coordenadora) e Maria Clara Mousinho de Salles. Kauã Di Franco de Andrade Monteiro consta da linha de base e saiu da equipe (Q-02).
**Entrega deste relatório:** 16/11/2026, aula de GPTI da semana 11 (atividade G11)
**Linha de base usada:** plano de projeto v1.0, dicionário da EAP v1.0 e declaração do escopo, de 05/10/2026 (AV1). **Nenhuma mudança foi aprovada pelo patrocinador até a data de status.** Vale o plano original (MUD-01 a MUD-06 seguem pendentes).
**Relatório anterior:** [Status Report 2](../status-report-2/status-report-2.md), entregue em 09/11/2026, com data de status 02/11/2026

O Status Report 2 mediu prazo e custo. Faltava olhar para o que tinha ficado só no plano: **partes interessadas, comunicação e riscos** (aula 10). É o que este relatório faz. Em cada um dos três, compara o planejado com o que aconteceu, mostra a evidência e diz que ação sai dali.

> **⚠ Como ler as evidências deste relatório.**
>
> - **O código da PSW foi lido, não executado.** A verificação é sobre o commit `ad6c33a` (16/11/2026, branch `feature/migracao-mongodb`). A máquina usada não tem MongoDB instalado, e o README não ensina a subir o banco (Q-14). Todo resultado marcado com "pela leitura" ainda precisa ser confirmado rodando o roteiro (ação 4), e **nenhum pacote muda de situação de aceite só por leitura.**
> - **Reunião, mensagem e envio ao professor não aparecem no repositório.** Esses fatos entram como **informado pelo grupo**. Onde não existe ata nem registro escrito, o texto diz "sem registro", e a falta de registro é ela mesma um achado (seção 4).
> - **Não há hora nova.** O apontamento semanal combinado para 03/11 não foi concluído por nenhum dos dois grupos. Sem CR atualizado, IDC, ENT e EPT **não são recalculados** aqui (seção 6).

---

## 0. Respostas às três perguntas do controle

As perguntas são as da aula 10 ("Três perguntas do controle").

| Pergunta | Resposta | Evidência | De onde vem |
|---|---|---|---|
| **1. A pessoa está na posição planejada?** | **Não**, em nenhuma das três partes ativas. | **Patrocinador:** planejado líder das decisões; atual **neutro**: DEC-1 a DEC-4 pedidas em 26/10 e DEC-5 em 09/11, nenhuma respondida até 16/11. **PSW:** planejada líder; atual **apoiadora na execução** (3 commits entre 09/11 e 16/11) e **neutra nos compromissos de gestão** (nenhuma hora informada, validação das 68 h sem resposta). **GPTI:** planejada líder; atual **apoiadora nas entregas** (todas no prazo) e **neutra no controle semanal** (apontamento e reunião sem registro), pelo mesmo critério aplicado à PSW. | Seção 3 |
| **2. O recado chegou a quem devia?** | **Em parte.** O relatório chegou; o pedido de decisão não produziu resposta. | Das 9 mensagens previstas no período, **3 têm evidência de envio e de recebimento**, 2 ficaram em silêncio como planejado e **4 não têm registro de envio ou de resposta**. O pedido de decisão ficou na seção 11 de um relatório de doze seções e três anexos; o plano pedia **síntese** ao patrocinador (7.4). | Seção 4 |
| **3. A resposta ocorreu e reduziu o risco?** | **Não.** Dos 10 riscos do plano, **7 já ocorreram** e viraram questão. Só **RT04** e **RT05** tiveram resposta parcial com artefato (script de carga e commit de revisão), o primeiro **quatro semanas depois do previsto**, e nenhum com efeito verificado. | RT02: a divisão continua sem somar o preço no backend novo (R$ 39,90 → R$ 33,91 + R$ 5,98 = R$ 39,89). RG01: apareceu trabalho novo fora da EAP depois da recomendação de não investir mais horas. RG05: cinco decisões abertas. | Seção 5 |

**O que mudou desde o Status Report 2, em um parágrafo.** A PSW voltou a produzir depois de cinco semanas sem commit: em 09/11 corrigiu parte das questões do M1 e, em 13/11 e 16/11, publicou um backend em Express e MongoDB. Com isso ela seguiu o **escopo da linha de base** (backend próprio), e não a opção C que a GPTI tinha recomendado; a decisão do patrocinador (DEC-5) não saiu, e os fatos passaram à frente dela. O backend chegou **depois da data do M2 (10/11)** e, pela leitura do código, o fluxo de compra não fecha pela interface: o login não autentica contra a API nova, a tela de pagamento referencia uma variável removida, e as regras que o aceite exige (recusa de pagamento, bloqueio de compra repetida, divisão que soma o preço e avaliação gravada) continuam ausentes. Cerca de um quarto do backend novo é de funções fora da EAP. Nenhuma decisão do patrocinador foi registrada, e o apontamento semanal de horas não começou.

**Decisão pedida ao patrocinador (DEC-6, seção 8):** o M2 venceu e o aceite de GPTI é em 30/11. Falta decidir o que será demonstrado e aceito nessa data.

---

## 1. Data de status e período coberto

| Item | Valor |
|---|---|
| **Data de status** | **16/11/2026**, o dia da entrega. Nos relatórios anteriores a data de status ficava uma semana antes. Aqui ela foi levada até a entrega para incluir os commits de 13/11 e 16/11; sem eles, o relatório descreveria um projeto parado que já não existe. |
| Período coberto | **03/11/2026 a 16/11/2026**, depois da data de status do Status Report 2 (02/11) |
| Semanas letivas no período | **PSW:** semana 11 (fecha em 03/11) e semana 12 (fecha em 10/11, data do M2). **O calendário da PSW no plano termina na semana 12.** Os commits de 13/11 e 16/11 são posteriores a ele. **GPTI:** semana 10 (fecha em 09/11) e semana 11 (fecha em 16/11). |
| Repositório verificado | [github.com/leticiamendsnt/fio-a-fio](https://github.com/leticiamendsnt/fio-a-fio), `git fetch` em 16/11/2026 |
| Commits da PSW no período | `788750e`, 09/11 13:17, Maria Clara, "Correções da AV1" (frontend: +1.204 −408 linhas em 18 arquivos). `1a1e686`, 13/11 20:39, Letícia, "implementa migração do JSON Server para MongoDB" (backend: +2.651 linhas em 47 arquivos). `ad6c33a`, 16/11 01:41, Maria Clara, "Revisão rápida da última atualização do código (precisa de mais ajustes)" (validação, carga de dados e testes: +694 −43). Contagens sem `package-lock.json`. |
| Onde está o código novo | Na branch `feature/migracao-mongodb`. **A `develop` continua em `9e857eb`, de 06/10.** Nada foi integrado à branch de entrega. |
| Marco avaliado | **M2 — Sistema integrado ao backend próprio**: PSW em 10/11/2026 (vencido); aceite de GPTI em 30/11/2026 |

---

## 2. Situação geral

Critério de cor: o mesmo do Status Report 2 (seção 2).

| Dimensão | Cor | Evidência | Justificativa |
|---|---|---|---|
| **Partes interessadas** | 🔴 **Vermelho** | 3 de 3 partes ativas abaixo da posição planejada | A estratégia do plano para o patrocinador (pedido objetivo de decisão) não moveu a decisão em três semanas. A PSW age pelo repositório, mas não pelos compromissos de gestão. |
| **Comunicação** | 🟡 **Amarelo** | 3 mensagens com envio e recebimento; 4 sem registro | Os relatórios saíram nas datas. Faltam síntese ao patrocinador, ata da reunião conjunta e confirmação de recebimento. Fica em amarelo, e não em vermelho, porque as três correções (folha de decisão, ata e planilha) custam menos de 3 h e dependem só da GPTI. A estimativa é da equipe, com apoio de IA: cerca de 1 h para a folha, 1 h para lançar as horas e 15 minutos por ata. |
| **Riscos** | 🔴 **Vermelho** | 7 de 10 ocorridos; 2 respostas parciais com artefato; 3 riscos novos | As contingências do plano para RT01 e RG01 (concentrar no fluxo de compra, não investir fora da EAP) não foram executadas. |
| **Escopo, prazo e custo** (atualização da seção 6) | 🔴 **Vermelho** | M2 vencido em 10/11 sem demonstração registrada; 0 de 19 pacotes do M2 verificados; CR não medido | O backend existe, mas nenhum pacote passou por verificação executada. |
| **Geral** | 🔴 **Vermelho** | — | Faltam duas semanas para o aceite de 30/11, e a decisão sobre o que será aceito não existe. |

**Leitura da equipe GPTI.** A PSW retomou o trabalho, e isso precisa ser dito primeiro. Em uma semana ela entregou a estrutura do backend da linha de base: Express, MongoDB, modelos, rotas, validação e carga de dados. Avisou do impedimento no mesmo dia em que publicou. E o commit da Letícia foi revisado pela Maria Clara, a primeira evidência de revisão cruzada do projeto (pacote 1.1.4). O ponto fraco é o mesmo do Status Report 1: o esforço foi para estrutura e para funções fora da EAP, enquanto as quatro regras do critério geral de aceite seguem sem implementação.

As falhas da GPTI no período são de comunicação. Pedimos as decisões dentro de relatórios longos, sem a síntese que o nosso próprio plano prevê para o patrocinador. Não fizemos ata de nenhuma reunião conjunta. O apontamento semanal, prometido para 03/11, não foi concluído. E deixamos no repositório uma versão do Status Report 2 com números diferentes da final (Q-28).

---

## 3. Partes interessadas: posição planejada e posição atual

### 3.1 Como a posição foi observada

A posição do plano é o que a pessoa faria; a posição atual é o que ela fez, com prova (aula 10, "O que se observa"). Os níveis são os do plano (7.1), lidos pelas definições da aula:

- **Desinformado:** não recebeu o recado previsto.
- **Resistente:** recebeu e recusa.
- **Neutro:** recebeu e não age.
- **Apoiador:** faz a parte.
- **Líder:** faz a parte e conduz a dos outros (nível desejado do plano para o patrocinador e para as duas equipes).

O plano (7.5) previa revisão da matriz por Guilherme nas semanas 8, 11 e 12. **Esta é a primeira revisão registrada.** A da semana 8 não tem registro.

### 3.2 Matriz de engajamento atualizada

**P** = posição no plano (C da matriz 7.2, em 05/10). **A** = posição atual em 16/11. **D** = desejada.

| Parte | Desinformado | Resistente | Neutro | Apoiador | Líder |
|---|:---:|:---:|:---:|:---:|:---:|
| Patrocinador |  |  | P / **A** |  | D |
| Equipe GPTI — entregas |  |  | P | **A** | D |
| Equipe GPTI — controle semanal |  |  | P / **A** |  | D |
| Equipe PSW — execução técnica |  |  | P | **A** | D |
| Equipe PSW — compromissos de gestão |  |  | P / **A** |  | D |
| Crocheteiras | P / **A** |  |  | D (se autorizado) |  |
| Criadoras | P / **A** |  |  | D (se autorizado) |  |
| Provedor de pagamento | P / **A** / D |  |  |  |  |
| Hospedagem de vídeo | P / **A** / D |  |  |  |  |

### 3.3 Posição de cada parte, com evidência

| Parte | O combinado (plano 7.3) | O que foi observado, com evidência | Posição atual | Desvio | Ação desta semana |
|---|---|---|---|---|---|
| **Patrocinador** (gerenciar de perto) | Decide escopo, prazo, reserva e aceite. Indicador: "mudanças respondidas até a data necessária". | Avaliou a AV1 (97/100, com comentários). Recebeu o SR1 (26/10) e o SR2 (09/11). **DEC-1 a DEC-4 abertas há três semanas e DEC-5 há uma; nenhuma decisão registrada até 16/11** (informado pelo grupo). O material do M2 foi enviado a ele e está **sem retorno** (informado pelo grupo). | **Neutro** | Abaixo do desejado (líder) e parado na posição inicial. | Trocar a estratégia: folha de decisão de uma página, levada em mãos na aula de 16/11 (ação 1). |
| **Equipe PSW — execução** (gerenciar de perto) | Lidera a execução técnica; entregas M1 e M2 demonstráveis. | Três commits em uma semana, das duas integrantes, com backend em Express e MongoDB. Maria Clara revisou em 16/11 o commit da Letícia de 13/11. **Mas:** nada entre 06/10 e 09/11; M2 não demonstrável em 10/11; código na branch de trabalho, não na `develop`. | **Apoiadora** | Subiu de neutra para apoiadora desde 02/11. Abaixo de líder. | Indicar o commit de entrega e o que será demonstrado (ação 3). |
| **Equipe PSW — gestão** | "Tarefas atualizadas por aluno"; "desvio informado antes do marco"; "aviso imediato de impedimento". | **Aviso de impedimento: ocorreu**, em 13/11, por mensagem no grupo (seção 4.2). **Horas:** nenhuma linha da PSW na planilha depois de 02/11. **Validação das 68 h** (prazo 06/11): sem resposta. **Desvio antes do marco:** o M2 venceu em 10/11 sem aviso registrado. O grupo informa "pouco retorno" da PSW no período. | **Neutra** | Abaixo do planejado. Recebe o pedido e não responde. | Pedir três números por semana pelo canal que a PSW usa (seção 3.4). |
| **Kauã** (PSW, linha de base) | Executa células de D01 a D18; A de 14 pacotes. | Nenhum commit em todo o projeto; sem retorno de contato (README da PSW). | **Fora do projeto** | Já registrado (Q-02). | Redistribuir o A dos pacotes (DEC-4 e ação 6). |
| **Equipe GPTI** (gerenciar de perto) | Lidera planejamento, controle e comunicação. Indicador: "riscos e ações atualizados toda semana". | AV1, SR1, SR2 e SR3 nas datas do calendário. **Mas:** apontamento semanal não concluído (Q-18); sem ata de reunião conjunta no período; registro de riscos atualizado só nos relatórios, não toda semana; das ações do SR2 com prazo até 06/11, nenhuma tem artefato na pasta da GPTI (seção 7.3). | **Apoiadora nas entregas; neutra no controle semanal**, pelo mesmo critério aplicado à PSW. | Faz a parte das entregas. No controle semanal, sabe o que o plano pede e não fez: seis ações próprias do SR2 estão sem registro. | Ata curta a cada reunião e planilha preenchida na aula (ações 5 e 7). |
| **Crocheteiras e criadoras** (manter informadas, se autorizado) | Uma demonstração com dados fictícios, no M1 ou no M2, **só se o patrocinador autorizar**. | Não houve pedido de autorização nem contato. Sem autorização, o nível desejado é o corrente (plano 7.2). | **Desinformadas** | **Sem desvio.** | Nenhuma. Com o M2 não demonstrável, a GPTI **não** recomenda pedir a autorização agora. |
| **Provedor de pagamento e hospedagem de vídeo** (monitorar, sem contato) | Sem mensagem nesta fase. Registrar pendências para etapa futura (1.7.6). | Nenhum contato. A pendência da hospedagem tinha o Kauã como responsável e ficou sem dono. | **Desinformados** | **Sem desvio** de posição. Pendência sem dono. | Guilherme (A de 1.7) assume o registro em 1.7.6. |

### 3.4 Estratégias que não moveram ninguém e o que muda

A aula 10 pede achar "estratégia que não moveu ninguém" e trocá-la.

| Parte | Estratégia do plano | Resultado | Estratégia proposta | Dono |
|---|---|---|---|---|
| Patrocinador | Resumo quinzenal e "pedido objetivo de decisão", por reunião e registro escrito. | O pedido foi escrito, mas ficou na seção 11 do SR2, depois de dez seções de contas. Três semanas sem decisão. | **Folha de decisão de uma página**, separada do relatório: uma linha por decisão, opção recomendada, prazo e **o que a equipe assume se não houver resposta** (plano 6.3.2, RG05: "manter a hipótese documentada quando a decisão for reversível"). Entregue em mãos na aula. | Guilherme prepara; Matheus responde |
| Equipe PSW | Quadro, reunião conjunta semanal e planilha de horas por atividade. | A PSW não usou a planilha nem respondeu à validação. O que funcionou foi o **grupo de mensagens** e o **repositório**: o aviso de 13/11 veio por lá, sem ninguém pedir. | Usar o canal que funciona. **Três números por semana, por mensagem:** horas da semana, o que falta e o que travou. A GPTI lança na planilha. | Matheus, com Letícia |

A mudança de estratégia para a PSW é de canal e de tamanho do pedido, não de conteúdo: o plano (seção 8) continua pedindo horas realizadas, esforço restante e impedimento.

---

## 4. Comunicação: mensagem enviada e mensagem recebida

### 4.1 A cadência do plano contra o que aconteceu

Cadência do plano, seção 7.4, mais as mensagens que o Status Report 2 prometeu (seção 12). Perguntas da aula 10 ("Monitorar as comunicações"): saiu no canal combinado? A pessoa certa recebeu? O conteúdo era o da estratégia dela? Houve atraso, ruído ou duplicidade?

| # | Mensagem prevista | Dono | Canal combinado | Enviada? | Recebida? | Falha |
|---|---|---|---|---|---|---|
| 1 | Síntese quinzenal ao patrocinador: marco, decisão e risco geral | Guilherme | Reunião curta e registro escrito | **Sim**, como Status Report 2, em 09/11 | **Sim** (entrega da disciplina). Sem resposta. | **Conteúdo e formato.** Foi o detalhe, não a síntese. A aula 10 separa "detalhe para a equipe, síntese para a direção". Sem registro da reunião curta. |
| 2 | DEC-1 a DEC-5 por escrito ao patrocinador, sem esperar 09/11 (SR2, ação 8; prazo 05/11) | Guilherme prepara; Matheus responde | Registro escrito | **Sem registro** de envio separado do relatório | — | **Momento.** O gatilho de RG05 pedia levar antes do marco. As decisões chegaram com o SR2, um dia antes do M2. |
| 3 | Material do M2 ao patrocinador | PSW e GPTI | Demonstração (plano 7.3) | **Sim** (informado pelo grupo; data e canal sem registro escrito) | **Sem retorno** até 16/11 | **Canal.** O plano previa demonstração no M2, não envio de material. Não há registro de demonstração (como em Q-16, no M1). |
| 4 | Reunião conjunta semanal GPTI e PSW: tarefa, impedimento, aceite e horas | Matheus e Letícia | Quadro e reunião | **Sem registro** (não há ata de 03/11 nem de 10/11) | "Pouco retorno" da PSW (informado pelo grupo) | **Registro e recebimento.** Sem ata, não há como mostrar o que foi combinado. |
| 5 | Validação das 68 h: quem fez, em que semana, e as 20 h restantes por atividade (SR2, ação 1; prazo 06/11) | Gabriel | Reunião conjunta | **Sem registro** do pedido por escrito | **Sem resposta** | **Recebimento.** O pedido ficou no relatório e na reunião que não tem ata. |
| 6 | Apontamento semanal de horas, a partir de 03/11 | Cada aluno; conferência de Matheus e Letícia | Planilha combinada | **Não.** Nenhuma linha nova depois de 02/11, de nenhum dos dois grupos | — | **Não enviada** (Q-18). |
| 7 | Aviso de impedimento da PSW (plano 7.3: "aviso imediato de impedimento") | PSW | Reunião conjunta, quadro e repositório | **Sim**, em 13/11, no grupo de mensagens | **Sim**, pela GPTI | **Nenhuma falha de envio.** Canal diferente do combinado, mas chegou. Faltou dizer o que falta e quanto (seção 4.2). |
| 8 | Demonstração a crocheteiras e criadoras | Gabriel | Demonstração, se autorizada | **Não**, como planejado | — | **Nenhuma.** "O silêncio fora desta cadência é decisão, não esquecimento" (plano 7.4). |
| 9 | Provedor de pagamento e hospedagem | Patrocinador | — | **Não**, como planejado | — | **Nenhuma.** |

**Resumo:** três mensagens com evidência de envio e de recebimento (1, 3 e 7), duas em silêncio planejado (8 e 9) e quatro sem registro de envio ou de resposta (2, 4, 5 e 6).

### 4.2 A mensagem recebida da PSW em 13/11

Texto recebido no grupo de mensagens, no dia do commit `1a1e686` (transcrição fornecida pelo grupo):

> "oi gente, boa noite! coloquei uma atualização la da implementação do mongo db, infelizmente deu um problema no meu computador e eu n consegui testar nem terminar como eu queria. eu devo mexer mais nesse fim de semana ainda, principalmente domingo, mas como não sabia se o resto do pessoal ia mexer preferi jogar no github logo"

| O que a mensagem informa | O que ela não informa | Leitura da GPTI |
|---|---|---|
| A entrega foi publicada. Houve impedimento (computador). **O código não foi testado nem terminado.** Haverá mais trabalho no fim de semana. | O que falta, por atividade. Quantas horas foram gastas e quantas faltam. Se o fluxo de compra funciona. | É o comportamento que o plano pede (avisar na hora), e é **a primeira evidência escrita** de comunicação da PSW no período. Confirma, pela própria autora, que o backend foi integrado sem teste, o que é o sinal de RT05 (seção 5). O commit de 16/11 ("precisa de mais ajustes") confirma que o trabalho continuou no domingo, como dito. |

A GPTI lê essa retomada como **aceite prático da linha de base** pela PSW: ao implementar o MongoDB, ela seguiu o M2 do plano (backend próprio), e não a opção C. Isso é leitura da GPTI a partir do que foi feito. **Não há registro escrito da PSW dizendo isso**, e é um dos pontos da ação 3.

### 4.3 Ruídos encontrados

| Ruído | Evidência | Correção | Dono |
|---|---|---|---|
| **Duas versões do Status Report 2 com números diferentes** (Q-28) | A branch `docs/Status-report-2` do repositório (commit de 02/11, 17:57) tem `status_report_2.md` com CR principal de 97,5 h, IDP da PSW de 0,47 e M2 na semana 21. A versão final tem 68 h, IDP de 0,39 e M2 na semana 22. | Publicar na branch a versão entregue e dizer no README qual vale. | Matheus |
| **Manual do repositório descreve um sistema que não existe mais** (Q-14) | O README da raiz ainda fala em JSON Server e na porta 5173. Não cita MongoDB, a configuração nem o comando de carga. Quem segue o manual não sobe o sistema. | A PSW atualiza os três README. | Letícia |
| **Código novo fora da branch de entrega** | A `develop` está em `9e857eb` desde 06/10. | A PSW indica o commit de entrega (ação 3). | Letícia |

---

## 5. Riscos: resposta executada e efeito observado

### 5.1 Registro de riscos atualizado

Para cada risco do plano (6.3.2): a resposta ocorreu? Qual é o artefato? Reduziu chance ou efeito? "Ficar de olho" não conta como resposta (aula 10). Risco que ocorreu deixa de ser possibilidade e vira questão, com dono e data.

| ID | Risco | Situação em 02/11 | Resposta do plano | Executada? Artefato | Efeito observado em 16/11 | Situação e prioridade agora | Dono |
|---|---|---|---|---|---|---|---|
| **RT01** | Aprendizagem de Express e MongoDB estoura o pacote técnico | Gatilho disparado | Concentrar a PSW no fluxo de compra; suspender acabamento de feed e materiais; usar a fatia de 8 h | **Não.** O commit de 09/11 mexeu em publicações, stories e administração. O de 13/11 fez todos os módulos de uma vez, e pagamento simulado e avaliação ficaram com zero linha. | **Nenhum.** O backend existe, mas o fluxo de compra não fecha. | **Ocorreu → Q-19 e Q-23.** Prioridade alta. | Letícia |
| **RT02** | Compra, liberação ou divisão falham | Disparado na semana 8 (Q-05 e Q-06) | Correção conjunta de D15 e D16; a GPTI prepara e registra os casos de teste (fatia de 5 h + 3 h) | **Não.** Não há arquivo de casos de teste na pasta da GPTI (SR2, ação 11). O código novo repete a conta antiga. | **Nenhum.** `calculateRevenueSplit` arredonda as duas partes em separado: R$ 39,90 → 33,91 + 5,98 = **39,89**; R$ 49,90 → 42,41 + 7,48 = **49,89**. Não há bloqueio de compra repetida nem recusa de pagamento. | **Ocorreu → Q-04, Q-05 e Q-06 abertas.** Prioridade alta. | Maria Clara |
| **RT03** | Dados simulados divergem da API | Disparado (MUD-01) | Congelar o contrato, corrigir o adaptador e fazer regressão | **Não.** Continua sem contrato escrito (1.2.3). O responsável era o Kauã. | **Piorou.** Há uma nova divergência, agora entre o frontend e a API própria: 9 incompatibilidades pela leitura (Q-24). | **Ocorreu de novo → Q-24.** Prioridade sobe de média para **alta**. | **Vago** (era o Kauã). Proposta: Letícia. |
| **RT04** | Ambiente ou MongoDB falha tarde | Disparado (backend não iniciado na semana 9) | Fixar versões, manter a carga de dados e testar a persistência na semana 9 | **Em parte, com quatro semanas de atraso.** Artefatos: `backend/src/scripts/seed.js`, `backend/.env.example` e `npm run seed`. | **Não verificado.** O sinal do plano é "outro aluno sobe o ambiente e lê o que gravou"; isso não foi feito. O README não cita o MongoDB. Pela leitura, a carga pode parar nos stories antes de carregar aulas, compras e vendas. | **Aberto, com resposta parcial.** Prioridade média. | **Vago** (era o Kauã). Proposta: Maria Clara, autora do script. |
| **RT05** | Código apoiado por IA com erro ou trecho que a equipe não compreende. **Este relatório não afirma nada sobre uso de IA pela PSW;** o que se observa é o gatilho do plano, "defeito crítico". | Não avaliado | Revisão humana, testes e explicação antes de integrar | **Em parte.** Artefato: o commit de revisão de 16/11 e dois arquivos de teste. Mas a autora informou que publicou **sem testar** (seção 4.2), e os testes cobrem só a validação de formulário, não as regras de compra. | **Fraco.** Pela leitura, dois defeitos críticos passaram pela revisão: o login e a tela de pagamento (Q-24). Um dos três testes de integração deve falhar. | **Gatilho disparado** (defeito crítico), a confirmar na execução. Prioridade sobe para **alta**. | Letícia |
| **RG01** | Pedido fora da EAP | Disparado (MUD-02 a MUD-05) | Registrar como pendência futura; não investir mais horas (DEC-3) | **Registrada, sem efeito.** Artefato: registro de mudanças. A decisão não saiu. | **Nenhum.** Chat, stories, administração e seguir ganharam backend, e surgiram três itens novos (MUD-07 a MUD-09). Cerca de 780 das 3.063 linhas do backend. | **Ocorreu de novo.** Prioridade sobe para **alta**. | Gabriel |
| **RG02** | Aluno abaixo da carga | Ocorreu (Kauã) | Redistribuir, reduzir escopo e comunicar o patrocinador | **Em parte.** Comunicado no SR1 e no SR2. Redistribuição (SR2, ação 9) sem registro. Redução de escopo pedida (DEC-5), sem decisão. | A PSW segue com duas pessoas, no limite do critério de cancelamento do termo. | **Ocorreu → Q-02 aberta.** Risco residual: ver RN-02. | Matheus |
| **RG03** | Regra muda depois da semana 4 | Não disparou | Controle de mudanças; adiar a mudança não essencial | — | **Disparou.** O código novo traz regras que o plano não tem: cancelamento de compra com reembolso simulado, e exclusão de aula que apaga a aula mesmo com compra feita (contra a regra 7). Sem pedido. | **Novo gatilho → MUD-08 e Q-09.** Prioridade média. | Gabriel |
| **RG04** | Artefato rejeitado | Não disparou | Lista de verificação antes de cada status | **Sim**, para a AV1 (97/100). | Sem avaliação recebida do SR1 e do SR2 até 16/11. | **Aberto.** Prioridade média. | Guilherme |
| **RG05** | Decisão de marco atrasa | Disparado (DEC-1 a DEC-4) | Levar a decisão ao patrocinador; manter a hipótese documentada | **Em parte.** Levada nos relatórios. Hipótese mantida: vale o plano original. | **Nenhum.** Cinco decisões abertas. A PSW decidiu na prática ao construir o backend da linha de base. | **Ocorreu → Q-22 aberta.** Prioridade sobe de baixa para **alta**: o aceite é em 30/11. | Guilherme |
| **OP01** | Reaproveitar a lista de aulas no catálogo uma semana antes | — | Explorar só se D07 fosse aceito na semana 6; senão, aceitar | **Aceita.** D07 não teve aceite na semana 6. | Sem ganho. | **Encerrada**, como o plano previa. | Maria Clara |

**Contagem:** 7 ocorridos (RT01, RT02, RT03, RG01, RG02, RG03 e RG05), 3 abertos (RT04, RT05 e RG04) e a oportunidade encerrada.

### 5.2 Riscos novos

A aula 10 pede risco novo com causa.

| ID | Risco, com causa | Probabilidade | Impacto | Prioridade | Resposta, com data e dono | Evidência que vai mostrar a resposta |
|---|---|---|---|---|---|---|
| **RN-01** | Como o backend foi publicado sem execução de ponta a ponta e o login e o pagamento não fecham pela leitura, a demonstração para o aceite de 30/11 pode não rodar o fluxo de compra. | Alta | Alto: perda do marco | **Alta** | **Mitigar.** A GPTI executa o roteiro de verificação sobre o commit que a PSW indicar. Guilherme, até 23/11. | Roteiro preenchido, com resultado por pacote e data. |
| **RN-02** | Como a PSW tem exatamente duas pessoas, a ausência de uma atinge o critério de cancelamento do termo (seção 6). | Média | Alto | **Alta** | **Escalar.** Entra na folha de decisão: o que o patrocinador faz se isso ocorrer. Guilherme, 16/11. | A folha entregue, com a linha de RN-02. |
| **RN-03** | Como o calendário da PSW no plano terminou na semana 12 (10/11), as horas depois dessa data não estão planejadas, e a capacidade até 30/11 é desconhecida. | Alta | Médio | **Alta** | **Mitigar.** A PSW informa quantas horas tem até 23/11 (um dos três números da seção 3.4). Matheus, 17/11. | A resposta da PSW, por escrito. |

### 5.3 Reservas: a reserva pede o nome do evento

| Reserva | No plano | Uso até 16/11 | Leitura |
|---|---|---|---|
| Contingência técnica da PSW | 18 h, com fatias para RT01 a RT05 | **Nenhuma hora lançada com o nome de um risco.** | RT01 a RT04 ocorreram, então as fatias podiam sair com esse nome. Sem apontamento, **não há como dizer se a reserva foi usada**. O calendário da PSW acabou em 10/11. |
| Contingência da GPTI | 26 h, com fatias por risco | Nenhuma hora lançada com o nome de um risco. | As fatias de RT02 (3 h, casos de teste) e RG05 (2 h, levar a decisão) continuam disponíveis para as ações 1 e 4. |
| Reserva gerencial | R$ 414,24 (cerca de 22 h) | Não pedida. | Depende do patrocinador e não representa hora disponível (plano 6.4). |

"Atraso sem nome no registro não usa a contingência" (aula 10). As horas que a PSW trabalhou depois de 10/11 precisam ser lançadas com o nome do risco a que respondem, ou como hora fora do calendário.

### 5.4 O conjunto ainda cabe no semestre?

**Não, para o escopo da linha de base.** RT01, RT02 e RT03 ocorreram juntos sobre o mesmo ponto, o fluxo de compra. O M2 venceu em 10/11. Até o aceite de 30/11 há duas semanas, sem horas planejadas da PSW (RN-03). Dos 19 pacotes do M2, pela leitura, só dois têm código que corresponde ao critério, e cinco não têm código (seção 6.2). **Se não cabe, a decisão é do patrocinador** (aula 10; plano 6.3.3). É a DEC-6.

---

## 6. Efeito em escopo, prazo e custo (atualização do Status Report 2)

O valor agregado não é refeito neste relatório, porque faltam as duas entradas dele: hora apontada e aceite verificado por execução. O que segue é só o que mudou desde 02/11.

### 6.1 Questões do M1 depois dos commits novos (por leitura)

| Situação pela leitura do código | Questões |
|---|---|
| **Corrigida no código**, a confirmar na execução | Q-11 (a) editar e remover publicação; Q-11 (b) moderação fora do caminho da publicação; Q-13 (a) mensagens simultâneas no login; Q-13 (c) acentuação |
| **Parcial** | Q-08 (totais calculados, mas sem a parte da plataforma por venda); Q-09 (a tela recusa preço zero, a API aceita; a exclusão apaga aula já comprada); Q-10 (cadastro de material só na API, sem tela); Q-12 (há comando de carga, com ressalvas); Q-15 (a API recusa quem não é criadora; as telas seguem abertas) |
| **Não corrigida** | Q-03, Q-04, Q-05, Q-06, Q-07, Q-14, Q-17; Q-11 (c) curtida por usuária; Q-13 (b) aplicação abre já logada |

**Nenhum pacote do M1 muda de situação neste relatório:** continuam 3 verificados, 9 pendentes e 1 não demonstrado, até a verificação executada (ação 4).

### 6.2 Pacotes do M2 (por leitura)

| Situação pela leitura | Pacotes |
|---|---|
| Há código que corresponde ao critério | 1.3.2 API Express com rota de verificação; 1.3.3 banco MongoDB |
| Há código parcial | 1.5.1, 1.5.2, 1.5.3, 1.5.4, 1.5.7, 1.5.9, 1.5.10, 1.6.1, 1.6.2, 1.6.4 e 1.6.5 |
| Não há código para o critério | 1.5.5 compra e estante (nasce concluída, aceita repetida); 1.5.6 pagamento simulado; 1.5.8 avaliação; 1.6.3 compra de ponta a ponta; 1.6.6 erros dos fluxos prioritários |
| Sem como afirmar | 1.6.7 demonstração final (não há roteiro nem registro) |

No Status Report 2, os 19 pacotes do M2 tinham zero evidência. Agora 13 têm código, e **nenhum foi verificado**.

### 6.3 Prazo e custo

| Item | Situação em 16/11 |
|---|---|
| **M2 (10/11)** | **Vencido.** Sem registro de demonstração e sem aceite. O backend chegou em 13/11. |
| **Caminho crítico** | D11 (prevista para 13/10) começou em 13/11, **um mês depois**. D11 a D14 e D16 a D18 têm saída iniciada; D15 (simulador de pagamento) não começou. O M1 segue sem aceite. |
| **Valor agregado da PSW** | **Não recalculado.** Pela regra 50/50 do SR2, as atividades com saída iniciada passariam a "em andamento", mas a regra exige evidência verificada, e a verificação deste relatório foi só por leitura. O cálculo entra no relatório final, depois da ação 4. |
| **CR** | **Não medido.** Nenhuma hora lançada depois de 02/11 pelos dois grupos (Q-18). As 68 h da PSW seguem sem validação. |
| **IDC, ENT e EPT** | **Não recalculados**, por falta de CR. Valem os do SR2, com data de status 02/11. |
| **GPTI** | G10 concluída (SR2 entregue em 09/11). G11 é este relatório. Horas de G10 e G11 a lançar (ação 7). |

---

## 7. Questões e mudanças

### 7.1 Registro de questões

**Questões anteriores.** Q-01 a Q-17: situação na seção 6.1; **todas seguem abertas**, com os mesmos donos, até a verificação executada. As demais:

| ID | Questão | Dono | Situação em 16/11 |
|---|---|---|---|
| Q-02 | Integrante a menos na PSW | Matheus | **Aberta.** Redistribuição dos pacotes do Kauã sem registro. |
| Q-18 | Pessoa sem hora apontada | Matheus e Letícia | **Aberta, prazo vencido (03/11).** O apontamento semanal não foi concluído por nenhum dos dois grupos. |
| Q-19 | Atraso no caminho crítico | Letícia | **Aberta.** D11 começou em 13/11, um mês depois do previsto. Como o marco venceu, o tratamento segue em Q-23. |
| Q-20 | Custo acima do planejado na PSW | Matheus e Letícia | **Aberta, sem medição nova.** |
| Q-21 | Nenhuma correção depois do M1 | Letícia | **Em tratamento.** O commit de 09/11 corrige parte das questões (seção 6.1). |
| Q-22 | Decisões do patrocinador sem resposta | Guilherme prepara; Matheus responde | **Aberta.** Agora são cinco decisões. |

**Questões novas:**

| ID | Questão e evidência | Dono | Data | Impacto: escopo / prazo / custo |
|---|---|---|---|---|
| **Q-23** | **M2 vencido sem demonstração nem aceite.** A data era 10/11. O backend foi publicado em 13/11 e 16/11, numa branch de trabalho. Não há registro de demonstração. | Letícia (coordenadora da PSW) | 17/11: indicar o commit de entrega e o que será demonstrado | Escopo: 19 pacotes do M2 / **Prazo: marco perdido** / Custo: horas fora do calendário, não medidas |
| **Q-24** | **A integração entre o frontend e a API nova não fecha (pela leitura).** O login compara a senha com a lista de usuárias, e a API não devolve mais a senha. A tela de pagamento usa uma variável removida em 09/11 (`PaymentPage.jsx:122`). A curtida, a suspensão de usuária e a desativação de aula enviam campos que a API descarta. | Letícia. O A de 1.6 está vago. | 20/11 | Escopo: 1.6.1 a 1.6.3 / Prazo: bloqueia a demonstração / Custo: não estimado |
| **Q-25** | **Trabalho novo fora da EAP**, depois da recomendação de não investir mais horas: backend de chat, stories, administração e seguir; autenticação com senha cifrada e token; cancelamento de compra; exclusão de conta. | Gabriel (registro); Letícia (PSW) | 17/11: entra na folha de decisão | Escopo: MUD-02 a MUD-05 e MUD-07 a MUD-09 / Prazo: — / Custo: cerca de um quarto do backend |
| **Q-26** | **Testes não cobrem as regras do aceite.** Os testes verificam só a validação de formulário. Compra, liberação, divisão, avaliação e acesso não têm teste (1.7.1 e 1.7.2). Pela leitura, um dos três testes de integração falha. | Guilherme (A de 1.7); a PSW executa | 23/11 | Escopo: 1.7.1 e 1.7.2 |
| **Q-27** | **Furos de acesso na API (pela leitura).** A alteração de usuária aceita troca de perfil sem autenticação, inclusive para administradora. O resumo de vendas responde sem identificação. A consulta de vendas devolve as vendas de todas as criadoras. | Maria Clara (A de 1.5) | 23/11 | Escopo: 1.5.9; REQ-09 |
| **Q-28** | **Duas versões do Status Report 2 com números diferentes** (seção 4.3). | Matheus | 17/11 | Comunicação: o leitor do repositório vê número que não é o final |
| **Q-29** | **Comunicação sem registro.** Não há ata da reunião conjunta, nem registro do envio das decisões e do material do M2 ao patrocinador, nem do pedido de validação das horas. | Matheus (reunião); Guilherme (patrocinador) | 16/11 em diante | Sem registro, não há como mostrar o que foi combinado nem cobrar resposta |

### 7.2 Registro de mudanças

Regra: enquanto a mudança espera decisão, vale o plano original. **Nenhuma tem pedido escrito nem decisão.**

| ID | O que é | Situação em 16/11 | Recomendação da equipe GPTI |
|---|---|---|---|
| MUD-01 | JSON Server como fonte de dados do M1 | **Pendente, e o fato mudou.** A API do JSON Server foi substituída pela API em Express e MongoDB, e o `db.json` virou arquivo de carga. O M1 continua sem aceite em qualquer das duas formas. | Decidir junto com a DEC-6: o aceite passa a ser um só, sobre a API própria. |
| MUD-02 a MUD-05 | Administração e moderação, chat, stories, seguir e pesquisa ampla | **Pendentes, e cresceram:** ganharam modelos, rotas e controladores no backend. | Não aprovar. Fora do aceite e da demonstração. Sem mudança de recomendação. |
| MUD-06 | Proposta da GPTI: redefinir o M2 como o fluxo de compra sobre a API local (opção C) | **Sem decisão, e superada pelos fatos:** a PSW construiu o backend próprio. A pré-condição e o ponto de controle de 06/11 não têm registro; não havia commit novo da PSW em 06/11. | **Retirar** e substituir pela DEC-6. |
| **MUD-07** | Autenticação com senha cifrada e token de acesso | Nova, sem pedido. O plano prevê **login simulado** (1.3.5 e 1.5.9). O frontend não usa o que foi feito. | Não aprovar. Manter o login simulado da linha de base. |
| **MUD-08** | Cancelamento de compra com reembolso simulado | Nova, sem pedido. Cria regra que o plano não tem (RG03). | Não aprovar. Pendência futura (1.7.6). |
| **MUD-09** | Exclusão de conta pela usuária e pela administradora | Nova, sem pedido. | Não aprovar. Pendência futura. |

As horas das mudanças novas não foram informadas pela PSW nem reconstituídas neste relatório.

### 7.3 Acompanhamento das ações do Status Report 2 (seção 12)

| # | Ação do SR2 | Responsável | Prazo | Situação em 16/11 |
|---|---|---|---|---|
| 1 | Validar as 68 h com a PSW | Gabriel | 06/11 | **Não concluída.** Sem resposta da PSW. |
| 2 | Ponto de controle da opção C | Matheus, Gabriel e Guilherme | 06/11 | **Sem objeto:** não havia commit novo em 06/11. O primeiro é de 09/11. |
| 3 | Implantar o apontamento semanal | Matheus e Letícia | 03/11 | **Não concluída** (Q-18). |
| 4 | Recalcular o CR, se a validação mudasse as 68 h | Gabriel | 08/11 | **Sem objeto:** não houve validação. |
| 5 | Redigir a solicitação da MUD-01 | Gabriel | 05/11 | **Sem artefato** na pasta da GPTI. |
| 6 | Redigir a MUD-06 | Matheus | 05/11 | **Sem artefato.** Proposta de retirada (seção 7.2). |
| 7 | Confirmar com o professor o que PSW exige no M2 | Matheus | 05/11 | **Sem registro.** |
| 8 | Levar DEC-1 a DEC-5 por escrito | Guilherme e Matheus | 05/11 | **Sem registro** de envio separado do SR2. |
| 9 | Redistribuir os pacotes do Kauã | Matheus com Letícia | 03/11 | **Sem registro.** |
| 10 | A PSW informa o que fez nas semanas 9 e 10 | Letícia | 03/11 | **Não informado.** |
| 11 | Casos de teste do fluxo de compra | Guilherme | 06/11 | **Sem artefato** na pasta da GPTI. |
| 12 | Registrar o aceite ou a recusa do M1 | Guilherme | Data da decisão | **Aguarda** a DEC-1. |
| 13 | Nova verificação sobre o commit do M2 | Guilherme, Matheus e Gabriel | 10/11 | **Feita só por leitura,** em 16/11, sobre `ad6c33a`. A execução é a ação 4 deste relatório. |
| 14 | Status Report 3 | Guilherme | 16/11 | **Concluída** com este relatório. |

De 14 ações, 1 foi concluída, 1 foi feita em parte, 3 ficaram sem objeto ou aguardam decisão, e 9 não foram concluídas ou não têm registro. Dessas nove, seis eram só da GPTI e duas eram divididas com a PSW. É o que a equipe de gestão mais precisa corrigir em si mesma.

---

## 8. Decisão pedida ao patrocinador

### DEC-6 (nova): o que se demonstra e se aceita em 30/11

**Situação:** o M2 venceu, o backend da linha de base existe sem as regras do aceite, e restam duas semanas.

As opções são numeradas para não se confundirem com as letras da DEC-5, que nomeavam outras alternativas.

| Opção | O que acontece | Efeito |
|---|---|---|
| **1** — manter o M2 inteiro da linha de base | A PSW tenta fechar os 19 pacotes até 30/11. | Pela leitura, faltam cinco pacotes inteiros e onze parciais, sem horas planejadas. **Não cabe.** |
| **2** — aceite focado no fluxo de compra, sobre a API própria | A PSW conserta só o que impede a demonstração e o critério geral de aceite, em duas etapas. Até 23/11: login, tela de pagamento e bloqueio de compra repetida, que a GPTI verifica no ponto de controle. Até 27/11: recusa de pagamento e divisão que soma o preço, com verificação final da GPTI. Em 30/11, o M2 é aceito **com limitações registradas** (avaliação, materiais, publicações e o que estiver fora da EAP vão para 1.7.6). | É a opção C do SR2, adaptada ao fato de que o backend próprio agora existe. **Custo estimado: 14,25 h da PSW.** Pela referência do plano, o simulador de pagamento (D15, 4,5 h) e o restante das regras (D04, 6,75 h) somam 11,25 h. O conserto do login e da tela de pagamento foi estimado em 3 h pela equipe GPTI, com apoio de IA na leitura do código; a PSW ainda não validou esse número. **Não cabe em uma semana** (9 h nominais da dupla; teto de 10 h). **Cabe nas duas semanas até 30/11** (18 h), se a PSW mantiver a carga do plano, o que ela ainda não confirmou (RN-03). Por isso o ponto de controle de 23/11 cobra a primeira metade: login, tela de pagamento e bloqueio de compra repetida. Recusa de pagamento e divisão ficam para a verificação final, até 27/11. |
| **3** — encerramento com limitações | Para o desenvolvimento. M1 e M2 são registrados como não aceitos, com as pendências em 1.7.6. | Previsto no termo (seção 6). Sem demonstração do fluxo de compra. |

**Recomendação da equipe GPTI: opção 2, com ponto de controle em 23/11.** Ela preserva o núcleo da declaração do escopo (comprar com pagamento simulado, ver na estante, vender com 85/15) e aproveita o backend que já existe. Se a verificação de 23/11 não rodar o fluxo de compra de ponta a ponta, a recomendação passa a ser a opção 3. A decisão é do patrocinador.

### Decisões anteriores que continuam pendentes

| ID | Decisão | Pedida em | Recomendação da GPTI | O que a equipe assume sem resposta até 23/11 |
|---|---|---|---|---|
| DEC-1 | Aceite do M1 | 26/10 | Aceitar com as limitações registradas, se a DEC-6 for a opção 2 | M1 **não aceito**, registrado com limitações no encerramento |
| DEC-2 | MUD-01 | 26/10 | Tratar junto com a DEC-6 | O aceite é verificado sobre a API própria |
| DEC-3 | MUD-02 a MUD-05, agora com MUD-07 a MUD-09 | 26/10 | Não aprovar; ficam fora do aceite | Ficam fora do aceite e da demonstração |
| DEC-4 | Pacotes do Kauã | 26/10 | Redistribuir o A entre Letícia e Maria Clara | A proposta do SR2 passa a valer |
| DEC-5 | Escopo e prazo do M2 | 09/11 | **Substituída pela DEC-6** | — |

A última coluna aplica a contingência de RG05 (plano 6.3.2): manter a hipótese documentada quando a decisão for reversível. Em todas as linhas a hipótese é a mais conservadora, a que decorre do plano original sem mudança aprovada. Por isso a hipótese da DEC-1 é "não aceito", embora a recomendação seja aceitar com limitações: sem decisão, vale o resultado da verificação, e nela o M1 não passou. Todas são reversíveis até o termo de encerramento.

---

## 9. Ações da próxima semana

| # | Ação | Responsável | Prazo | Evidência esperada |
|---|---|---|---|---|
| 1 | Entregar ao patrocinador a **folha de decisão de uma página** (DEC-6, DEC-1 a DEC-4 e RN-02), com a hipótese assumida sem resposta | Guilherme prepara; Matheus responde | 16/11, na aula | A folha e a data de entrega |
| 2 | Registrar a resposta do patrocinador, ou a falta dela, em 23/11 | Guilherme | 23/11 | Linha no registro de decisões |
| 3 | Pedir à PSW, por mensagem: o commit de entrega, o que será demonstrado, as horas gastas desde 09/11 e as horas que tem até 23/11 | Matheus, com Letícia | 17/11 | A mensagem e a resposta, copiadas no registro |
| 4 | Executar o roteiro de verificação sobre o commit indicado, com MongoDB instalado, e preparar os casos do fluxo de compra (aprovado, recusado, repetida, própria aula, R$ 29,99 e R$ 39,90) | Guilherme, Matheus e Gabriel | 23/11 (ponto de controle) e 27/11 (verificação final) | Roteiro preenchido por pacote; arquivo de casos de teste |
| 5 | Fazer ata de três linhas a cada reunião conjunta: presentes, combinado e pendente | Matheus | A cada reunião | Arquivo de atas na pasta da GPTI |
| 6 | Redistribuir o A dos pacotes do Kauã e o dono de RT03, RT04 e da pendência de hospedagem | Matheus com Letícia | 17/11 | Tabela atualizada no README da GPTI |
| 7 | Lançar na planilha as horas da GPTI de G10 e G11 e, com a resposta da ação 3, as da PSW | Gabriel | 20/11 | Linhas novas na planilha combinada |
| 8 | Publicar no repositório a versão entregue do Status Report 2 e dizer qual vale (Q-28) | Matheus | 17/11 | Commit na branch de documentos |
| 9 | Atualizar os três README para o sistema atual: MongoDB, configuração, carga e porta (Q-14) | Letícia | 20/11 | Outro aluno sobe o sistema seguindo o manual |
| 10 | Recalcular valor agregado, CR e previsão com as horas e a verificação executada; termo de encerramento e lições aprendidas (G12) | Matheus, Gabriel e Guilherme | 30/11 | Relatório final |

---

## Anexo A — Como a verificação do código foi feita

- **Objeto:** commit `ad6c33a` (16/11/2026), branch `feature/migracao-mongodb`, comparado com a base `158bace` (06/10).
- **Método:** leitura do código e do histórico (`git log`, `git diff`, `git show`). **O sistema não foi executado:** não se instalou dependência nem se subiu servidor.
- **Critérios:** os do [dicionário da EAP](../dicionario-eap.md) e as questões do [registro do SR1](../status-report-1/registro-de-questoes.md).
- **Conta da divisão:** reproduzida com a fórmula do próprio código (`backend/src/utils/helpers.js`, função `calculateRevenueSplit`): cada parte é arredondada em separado para duas casas. R$ 39,90 → 33,91 + 5,98 = 39,89. R$ 49,90 → 42,41 + 7,48 = 49,89. R$ 29,99 → 25,49 + 4,50 = 29,99. R$ 40,00 → 34,00 + 6,00 = 40,00. Os dois preços de exemplo do dicionário passam; os outros dois não.
- **Contagem de linhas:** `git diff --numstat`, sem os arquivos `package-lock.json`.
- **Limitações:** leitura não substitui execução. O que este relatório marca como "pela leitura" (login, tela de pagamento, carga de dados, teste que falha) precisa ser confirmado na ação 4. A leitura também não mede horas.

## Anexo B — Registro de uso de IA neste relatório

| Campo | Conteúdo |
|---|---|
| Data | 16/11/2026 |
| Ferramenta | Claude (Claude Code) |
| Quem usou | Gabriel Barretto Galdino dos Santos |
| Para quê | Ler os slides da aula 10, o plano e os relatórios anteriores; ler o repositório da PSW e conferir os commits novos contra os critérios do dicionário; montar as tabelas; redigir o texto e fazer a revisão final de redação e de consistência. |
| O que foi enviado | Código e documentação do repositório, artefatos da GPTI, slides da aula 10 e a mensagem da PSW de 13/11. Nenhum dado pessoal além dos nomes dos integrantes. |
| O que o grupo decidiu, e não a IA | A posição de cada parte na matriz, a prioridade revista de cada risco, as recomendações das seções 7.2 e 8 (incluindo a opção 2 da DEC-6 e a retirada da MUD-06), os donos e as datas das ações. A IA redigiu essas leituras como proposta; o grupo as revisou e responde por elas. |
| Estimativas deste relatório | As 3 h do conserto do login e da tela de pagamento (seção 8) e as 3 h das correções de comunicação (seção 2) são estimativas da equipe GPTI, a que se chegou em conjunto, com informações levantadas pela IA na leitura do código e dos artefatos. Não são horas medidas nem validadas pela PSW. |
| Como foi verificado | Os achados centrais do código (tela de pagamento, login e conta da divisão) foram conferidos uma segunda vez no arquivo e por execução da fórmula. Os fatos de comunicação vêm do que o grupo informou. |
| Responsabilidade | O grupo responde pelo conteúdo final. |

## Referências

- [Plano de projeto v1.0](../plano-de-projeto.md): seções 6.3.1, 6.3.2, 6.3.3, 6.4, 7.1 a 7.5 e 8.
- [Dicionário da EAP v1.0](../dicionario-eap.md) e [termo de abertura](../termo-de-abertura.md), seção 6.
- [Status Report 1](../status-report-1/status-report-1.md), com os registros de questões e de mudanças, e [Status Report 2](../status-report-2/status-report-2.md).
- MENDONÇA, D. S. Gerenciamento de Projetos de TI, aula 10 (Engajar, comunicar e responder ao risco). CEFET/RJ, 2026.
- PROJECT MANAGEMENT INSTITUTE. *Guia PMBOK*. 8. ed. Newtown Square: PMI, 2025 (citado na aula 10: Tabela 2-1, §2.5.1, §2.5.2.2, §2.5.2.3, §2.7.2.4 e §5).
