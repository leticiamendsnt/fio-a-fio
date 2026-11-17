# Status Report 2 — Fio a Fio

**Projeto:** Fio a Fio — protótipo de rede social de crochê com venda de vídeo-aulas
**Patrocinador:** Prof. Diogo Mendonça
**Gerente do projeto:** Matheus Cunha Schwab
**Equipe de gestão (GPTI):** Matheus Cunha Schwab, Gabriel Barretto Galdino dos Santos e Guilherme Barboza Araújo de Almeida
**Equipe de produto (PSW):** Letícia Mendonça dos Santos (coordenadora) e Maria Clara Mousinho de Salles. Kauã Di Franco de Andrade Monteiro consta da linha de base e saiu da equipe (Q-02).
**Entrega deste relatório:** 09/11/2026, aula de GPTI da semana 10 (atividade G10)
**Linha de base usada:** plano de projeto v1.0, dicionário da EAP v1.0 e declaração do escopo, todos de 05/10/2026 (AV1). **Nenhuma mudança foi aprovada pelo patrocinador até a data de status.** Por isso vale o plano original em todas as partes (MUD-01 a MUD-05 seguem pendentes).
**Relatório anterior:** [Status Report 1](../status-report-1/status-report-1.md), entregue em 26/10/2026, com data de status 06/10/2026

Este relatório mede o projeto contra a linha de base da AV1 e responde se o marco 2 cabe no prazo e no orçamento. Ele continua o Status Report 1: o escopo entra atualizado, e o que se acrescenta é cronograma, valor agregado e recursos (aula 9, "Status Report 2: o que acrescenta").

> **⚠ Como as horas (CR) foram obtidas — leia antes dos números.**
>
> **O método combinado no Status Report 1 não foi seguido.** O combinado era cada aluno informar as próprias horas por atividade e por semana, com as semanas 1 a 8 lançadas numa reunião de apontamento conduzida por Matheus e Letícia (plano, seção 7.4). A reunião não aconteceu, e ninguém apontou hora semana a semana: nem a PSW nem a GPTI.
>
> - **PSW, semanas 1 a 10: 68 h, reconstituídas pela GPTI em 02/11/2026** a partir do que está no repositório, e **em validação com a Letícia e a Maria Clara** num processo de acompanhamento contínuo. Os valores podem mudar nas próximas reuniões conjuntas, e qualquer ajuste entra no Status Report 3.
>   - **Semanas 1 a 8:** houve desenvolvimento, mas a PSW não informou horas.
>   - **Semanas 9 e 10:** a PSW não desenvolveu nada e por isso não tem horas a informar. As linhas de 0 h dessas semanas foram lançadas pela GPTI.
>   - A divisão por pessoa (34 h para cada, em partes iguais) é premissa. A semana de cada atividade não foi informada.
> - **GPTI, semanas 4 a 9: 62 h, registradas por atividade depois do fato e conferidas pelos integrantes.** Não houve anotação semana a semana desde a semana 4. G05, G09 e G10 foram registradas a partir do plano e da referência pelo entregável.
> - **Kauã:** 0 h. Não há commit dele nem retorno de contato.
> - **Medição:** o CR não foi medido em nenhuma semana. O apontamento semanal dos dois grupos começa em 03/11 (semana 11 de PSW, semana 10 de GPTI).
>
> A aula 9 (questão 5) pede que o relatório declare isso. O método completo está no **[Anexo A](#anexo-a--reconstituição-das-horas-cr)** e no **[README desta pasta](README.md)**.
>
> **A conclusão sobre capacidade não depende do CR.** Pelo plano, faltam 108,75 h de trabalho da PSW, contra 18 h nominais de capacidade até o M2 (seção 8.3).

---

## 0. Respostas às três perguntas

| Pergunta | Resposta | Número | De onde vem |
|---|---|---|---|
| **1. O caminho crítico ainda entrega o marco 2 na data planejada?** | **Não.** | M2 previsto para o **fim da semana 22 de PSW**, contra a semana 12 (10/11/2026): **+10 semanas**. Em semanas corridas, sem recesso, seria **19/01/2027**. Se a PSW usar a semana 11, que fecha em 03/11, o M2 fica na semana 21 (12/01/2027). O calendário do projeto termina na semana 12. | Seção 5: a rede da seção 5.2 do plano, com o esforço restante nivelado na capacidade real de 9 h/semana (duas pessoas). O M1 continua sem aceite. D11, primeira atividade crítica depois do M1, estava prevista para 13/10 e não começou. |
| **2. O valor agregado mostra trabalho feito no ritmo e no custo planejados?** | **Não**, na PSW. **Sim**, na GPTI. | PSW: **IDP 0,39** e **IDC 0,78**. GPTI: IDP 1,00 e IDC 1,16. Total: IDP 0,61 e IDC 0,96. | Seções 6 e 7. Regra de crédito 50/50. A PSW agregou 53,25 h dos 135 h planejados até 02/11. Um terço das horas reconstituídas da PSW (22,5 de 68 h) foi para trabalho fora da EAP, que não gera valor. |
| **3. As horas que faltam cabem na capacidade que resta até o marco 2?** | **PSW: não.** **GPTI: sim, sem folga pelo plano.** | **PSW:** restam **108,75 h** pelo plano (ONT 162 − VA 53,25) ou **138,9 h** pela previsão (ENT 206,9 − CR 68). A capacidade nominal é de **18 h** (2 pessoas × 4,5 h × 2 semanas; teto de 20 h). A capacidade efetiva é de 9 h se a semana 11 não for usada. **Faltam de 90,75 h a 120,9 h** sobre a nominal. **GPTI:** restam 36 h pelo plano (108 − 72) ou 31 h pela previsão, contra 36 h (3 pessoas × 4 h × 3 semanas; teto de 45 h). | Seções 8 e 9. A PSW indicou 20 h restantes, mas sem detalhar por atividade. O número coincide com o teto de capacidade, e por isso não é usado como evidência (seção 8.2). |

**Decisão central pedida ao patrocinador (DEC-5, seção 11).** Com prazo fixo e 5 h por semana fixas, a alavanca que resta é o **escopo**, por mudança aprovada (aula 9, "No seu projeto: decisão com prazo fixo").

- **Recomendação da equipe GPTI: opção C.** O M2 passa a ser o fluxo de compra correto sobre a API local. O restante da PSW cai de 108,75 h para 18,5 h, com até 6 h de apoio da GPTI.
- **Mesmo a opção C só cabe no teto de 20 h e usando a semana 11.**
- **Pré-condições:** o professor confirma que a disciplina de PSW aceita o M2 sobre a API local, e a PSW passa por um ponto de controle em 06/11.
- **Se o ponto de controle falhar,** a recomendação passa a ser o encerramento antecipado (opção E). A decisão é do patrocinador.

---

## 1. Data de status e período coberto

| Item | Valor |
|---|---|
| **Data de status** | **02/11/2026.** Os números deste relatório valem até esse dia. Não houve aula nesse dia (plano, seção 5.1). |
| Período coberto por este relatório | **07/10/2026 a 02/11/2026**, depois da data de status do Status Report 1 (06/10). Os valores de VP, VA e CR são **acumulados desde o início do projeto** (03/08/2026). |
| Semanas letivas no período | **PSW:** semanas 9 (aula de 13/10) e 10 (aula de 27/10) fechadas; semana 11 em curso, fecha na aula de 03/11. **GPTI:** semana 9 (aula de 26/10) fechada; semana 10 em curso, fecha na aula de 09/11. |
| Repositório verificado | [github.com/leticiamendsnt/fio-a-fio](https://github.com/leticiamendsnt/fio-a-fio). `git fetch` e `git ls-remote` em 02/11/2026: **nenhum commit novo em nenhuma branch depois de 06/10/2026.** A `develop` continua em `9e857eb` ("update README", 06/10/2026 16:53), o mesmo commit verificado no Status Report 1. |
| Medição do CR (o que a aula 9 pede declarar) | **A partir de que semana o CR foi medido:** de nenhuma, até a data de status, nos dois grupos. O apontamento semanal começa em 03/11 (semana 11 de PSW e semana 10 de GPTI), e a primeira semana medida aparece no Status Report 3. **Semanas reconstituídas:** PSW, semanas 1 a 10, pela GPTI em 02/11/2026 (68 h, em validação com a Letícia e a Maria Clara); GPTI, semanas 4 a 9, registradas por atividade depois do fato e conferidas pelos integrantes (62 h). Detalhes no Anexo A. |
| Planilha de horas | A [planilha combinada](../status-report-1/apontamento-de-horas.csv) do SR1 traz as linhas das duas equipes. O arquivo [`apontamento-de-horas-gpti.csv`](apontamento-de-horas-gpti.csv) é um extrato das linhas da GPTI, idêntico às da planilha combinada. |
| Marco avaliado | **M2 — Sistema integrado ao backend próprio**: PSW em 10/11/2026 (semana 12); aceite de GPTI em 30/11/2026 |

**Convenção de semana, a mesma para os dois grupos.** A unidade do plano é a semana letiva, e a semana só avança na aula da disciplina (plano, seção 5.1). A semana termina na aula que a fecha: o M1, por exemplo, caiu em 06/10, aula da semana 8 de PSW. Daí as três regras das contas:

1. **VP, VA e CR são medidos até a última semana fechada de cada grupo:** PSW até a semana 10 (27/10) e GPTI até a semana 9 (26/10).
2. **O que está na semana em curso não entra em VP, VA nem CR.** Isso vale para a semana 11 de PSW (28/10 a 03/11) e para a semana 10 de GPTI (27/10 a 09/11). Entra no SR3.
3. **Por isso, G10 fica fora da medição.** É este relatório, com 3 h registradas até 02/11. D16 e D17, previstas para a semana 11, aparecem como "janela em curso". Na semana 11 a PSW não fez nada até 02/11, então quase toda a semana foi perdida (seção 9.2).

---

## 2. Situação geral

**Critério de cor**, tirado dos limites de controle do plano (seções 5.1 e 8):

- **Verde:** variação até 10%, sem alerta registrado.
- **Amarelo:** variação até 10%, mas com um alerta nomeado que pode tirar a dimensão do limite; ou fora do limite, com ação corretiva que cabe na capacidade e na contingência restantes.
- **Vermelho:** fora do limite de 10%, com marco ameaçado e sem ação que caiba na capacidade restante.

| Dimensão | Cor | Número | Justificativa |
|---|---|---|---|
| **Escopo** | 🔴 **Vermelho** | **3 de 13** pacotes do M1 passaram (23%), sem mudança desde o SR1. **0 de 19** pacotes do M2 começaram. **5** mudanças sem decisão. | Não houve commit depois de 06/10, então nenhuma questão do SR1 foi corrigida. Os pacotes de backend e integração (1.3.2, 1.3.3, 1.5.1 a 1.5.10 e 1.6.1 a 1.6.7) não têm nenhuma evidência. O núcleo da declaração do escopo continua sem passar: não há recusa de pagamento, a compra repetida é aceita, as partes da divisão não somam o preço e a avaliação não é gravada. |
| **Prazo** | 🔴 **Vermelho** | M2 previsto para a **semana 22**, contra a 12: **+10 semanas**. IDP da PSW **0,39**: variação de prazo de −60,6%, contra o limite de 10%. | O M1 segue sem aceite, e as atividades críticas D11 (13/10) e D13 (27/10) não começaram. Mesmo com a capacidade original de três pessoas, o M2 não sairia antes da semana 18 (seção 5). |
| **Custo** | 🔴 **Vermelho** | IDC da PSW **0,78**: variação de custo de −14,75 h (−27,7% do VA). ENT da PSW **206,9 h**, contra ONT de 162 h (+27,7%), acima também dos 180 h de capacidade total da PSW no plano. | Fora do limite de 10%, e nenhuma ação cabe na capacidade. O EPT da PSW, de 138,9 h, não tem pessoa para ser executado: a capacidade nominal até o M2 é de 18 h. A contingência de programação da PSW, de 18 h no plano, virou 2 h com a saída do Kauã (seção 9.3). O IDC é com o CR reconstituído (68 h). Com a primeira reconstituição (97,5 h), cairia para 0,55 (seção 8.3). A GPTI está dentro do custo (IDC 1,16). |
| **Geral** | 🔴 **Vermelho** | **M2 fora do calendário. Para o escopo da linha de base, a PSW precisa de 90,75 h a 120,9 h além da sua capacidade nominal.** | Com a data fixa, só resta mexer no escopo. A decisão DEC-5 precisa sair antes de 10/11 (plano, seção 5.1: "desvio que dispare gatilho é levado ao patrocinador sem esperar o Status Report seguinte"). |

**Leitura da equipe GPTI.** A PSW, responsável pelo desenvolvimento, investiu esforço até 06/10: o repositório tem 31 telas, 26 componentes e, em duas semanas, uma API local de demonstração. Esse esforço, porém, foi em boa parte para acabamento visual e funções fora da EAP (MUD-01 a MUD-05, 22,5 h, um terço das 68 h reconstituídas), enquanto as regras que o aceite exige ficaram de fora. Depois do M1, a PSW não produziu mais nada e não corrigiu nenhuma questão. A saída do Kauã reduziu a capacidade, mas não explica sozinha as semanas 9 e 10 paradas: Letícia e Maria Clara tinham 18 h planejadas nesse período.

A GPTI cumpriu o calendário de gestão (AV1 com 97/100 e SR1 entregue em 26/10). Ela também tem pontos a corrigir:

- o apontamento semanal, que era ação conjunta de Matheus e Letícia, não foi implantado por nenhum dos dois grupos (Q-18);
- o aceite de 1.4.7, fixado em `src/mocks` na linha de base, divergia do M1 da disciplina de PSW, como a avaliação da AV1 registrou (MUD-01).

Os dois pontos estão no registro, com ação e prazo.

---

## 3. Escopo desde o Status Report 1

### 3.1 Pacotes do M1: verificados, pendentes e não demonstrados

Não há commit novo desde 06/10. Por isso, **o resultado de cada pacote é o mesmo do SR1**, sobre o mesmo commit `9e857eb`. Nenhuma nova verificação foi feita, porque não havia entrega nova a verificar. Critério copiado do [dicionário](../dicionario-eap.md).

| Pacote | Critério observável (dicionário) | Resultado no SR1 (06/10) | Situação em 02/11 | Questão |
|---|---|---|---|---|
| 1.3.1 Aplicação React | Outro aluno executa seguindo a instrução do repositório e vê as cores da identidade visual. | Passou | **Verificado** | Q-14 (ressalva) |
| 1.3.4 Dados simulados em `src/mocks` | O frontend do M1 funciona só com os módulos locais, sem API e sem servidor. | Falhou | **Pendente.** Depende de DEC-2 e MUD-01. | Q-03 |
| 1.3.5 Cadastro e login simulados | O cadastro cria usuária fictícia; o login termina sem serviço externo nem dado real. | Passou | **Verificado** | Q-12, Q-13 (ressalvas) |
| 1.3.6 Simulador de pagamento | O dado de aprovação sempre aprova e o de recusa sempre recusa; nenhum cartão é gravado. | Falhou | **Pendente** | Q-04 |
| 1.3.7 Perfis e dados de demonstração | A carga cria os mesmos dados a cada execução; a usuária edita o perfil e ativa a criadora. | Falhou | **Pendente** | Q-12 |
| 1.4.1 Publicações | Criar, consultar, editar e remover a própria; curtir e comentar; a segunda curtida não soma. | Falhou | **Pendente** | Q-11 |
| 1.4.2 Vídeo-aulas da criadora | Cadastrar, consultar e editar a própria; preço zero ou negativo não é salvo; a retirada some do catálogo. | Falhou | **Pendente** | Q-09 |
| 1.4.3 Materiais gratuitos | Cadastrar, editar e remover o próprio; filtro por tipo. | Falhou | **Pendente. Sem dono** desde a saída do Kauã (A e R do pacote). | Q-10, Q-02 |
| 1.4.4 Catálogo e detalhe | Só aulas ofertadas; busca por título e filtro por nível; o detalhe mostra todos os campos. | Passou | **Verificado** | Q-17 (ressalva) |
| 1.4.5 Compra, pagamento e estante | Informar o dado de teste e ver aprovada ou recusada; sem aprovação, a aula fica fora da estante. | Falhou | **Pendente** | Q-04, Q-05 |
| 1.4.6 Avaliação e vendas | Só a aula comprada aceita nota de 1 a 5; as vendas mostram preço, parte da criadora e parte da plataforma. | Falhou | **Pendente** | Q-06, Q-07, Q-08 |
| 1.4.7 Frontend ligado aos dados simulados | Os fluxos de 1.4.1 a 1.4.6 leem `src/mocks`, não uma API. | Falhou | **Pendente.** Depende de DEC-2 e MUD-01. | Q-03 |
| 1.4.8 Demonstração do M1 | A demonstração executa o roteiro e registra a limitação dos dados simulados. | Não demonstrado | **Não demonstrado.** Continua sem registro. | Q-16 |

**Resumo:** 3 verificados, 9 pendentes e 1 não demonstrado, **exatamente como em 06/10**. **Nenhum pacote está aceito**: o aceite é do patrocinador (DEC-1), e a decisão não saiu.

### 3.2 Pacotes de gestão e de requisitos (1.1 e 1.2)

O SR1 não verificou estes pacotes. A GPTI os verifica aqui, porque as atividades D01, D02 e D04, medidas na seção 6, dependem deles.

| Pacote | Critério (dicionário) | Situação em 02/11 | Evidência |
|---|---|---|---|
| 1.1.1 Termo e plano mantidos | A versão citada na AV1 é a usada no controle das semanas 9 a 12, ou a mudança está registrada. | **Passou** | SR1 e SR2 usam o plano v1.0. |
| 1.1.2 Decisões, riscos e mudanças | Cada mudança de escopo, prazo ou custo tem pedido, decisão e efeito. | **Pendente** | MUD-01 a MUD-05 não têm pedido escrito nem decisão do patrocinador (seção 10.2). |
| 1.1.3 Aceites dos marcos | Há registro de aceite ou de recusa do M1 na semana 8. | **Pendente** | Aguarda a decisão DEC-1 (Q-22). O registro é feito na data da decisão. |
| 1.1.4 Revisão técnica organizada | Nenhum incremento entra na demonstração sem revisão de outro aluno. | **Não verificado** | A PSW não apresentou evidência de revisão por outro aluno nos commits da `develop` (pacote da PSW; A: Letícia). |
| 1.2.1 Escopo funcional priorizado | A declaração cabe em uma leitura, e a seção 4.4 diz o que está dentro e fora. | **Passou** | Plano v1.0, seções 4.1 e 4.4. A avaliação da AV1 confirma o recorte ("Escopo e EAP", 14/15). |
| 1.2.2 Atores, perfis e fluxo de compra | A usuária sem perfil de criadora não cadastra aula nem consulta vendas. | **Falhou** | Q-15. Por isso D01 fica em andamento (seção 6). |
| 1.2.3 Modelo e contratos | O mesmo exemplo de dados serve a `src/mocks` e à API do backend. | **Falhou** | Não há contrato escrito (plano 5.1.1). A API do backend não existe. |
| 1.2.4 Regras de pagamento, liberação e divisão | Estados, simulador e divisão estão escritos com um exemplo numérico cada. | **Não verificado** | As regras estão no plano (seção 3), mas só a divisão tem exemplo numérico (dicionário 1.5.7). |
| 1.2.5 Hipóteses e limitações | Cada regra sem validação externa está marcada como hipótese. | **Passou** | Plano, seções 1 e 3. |
| 1.2.6 Navegação revisada | Um roteiro percorre catálogo, detalhe, compra, estante e avaliação sem passo oral fora da tela. | **Não verificado** | No SR1, a tela de avaliação foi aberta digitando o endereço ([registro de uso de IA do SR1](../status-report-1/registro-de-uso-de-ia.md)). Há indício de passo fora da tela, sem verificação formal. |

### 3.3 Pacotes do M2

Nenhum dos 19 pacotes do M2 começou: 1.3.2, 1.3.3, 1.5.1 a 1.5.10 e 1.6.1 a 1.6.7. Não há pasta de backend em Express, conexão com MongoDB, API própria, nem rota de verificação. O JSON Server da MUD-01 **não** é o backend da linha de base. Ele só contaria com uma mudança aprovada (DEC-2 e MUD-06).

### 3.4 Requisitos

Sem mudança desde o SR1. O **REQ-01** está atendido. Do **REQ-02 ao REQ-10**, os requisitos estão pendentes no M1, e nenhum pacote do M2 ligado a eles começou. O **REQ-11** está em andamento: o registro do aceite do M1 (1.1.3) depende de DEC-1.

### 3.5 Acompanhamento das ações do Status Report 1 (seção 6.2)

| Ação do SR1 | Responsável | Prazo | Situação em 02/11 |
|---|---|---|---|
| Cada integrante de GPTI roda o roteiro na própria máquina | Matheus, Gabriel e Guilherme | 20/10 | **Concluída.** A coluna "Conferido por" está preenchida nos 13 pacotes. |
| Apresentar Q-01 a Q-17 à Letícia e confirmar donos e datas | Matheus | 13/10 | **Sem registro escrito** da reunião. As questões constam do SR1 entregue em 26/10. |
| Confirmar quem saiu da PSW | Matheus | 13/10 | **Concluída:** foi o **Kauã**. A data da confirmação não foi registrada. |
| Pedir à PSW a solicitação escrita da MUD-01 | Gabriel | 13/10 | **A solicitação escrita da PSW não foi recebida.** A GPTI passa a redigi-la junto com a Letícia (ação 5). |
| Começar o apontamento de horas por aluno e por atividade | Matheus e Letícia | desde 05/10; conferência em 13/10 | **Não realizada semana a semana** em nenhum dos dois grupos (Q-18). As horas foram reconstituídas ou registradas depois do fato (Anexo A). |
| Lançar o uso de IA no registro | Matheus | 26/10 | **Concluída**, em arquivo próprio ([registro-de-uso-de-ia.md](../status-report-1/registro-de-uso-de-ia.md)). |
| Registrar o aceite ou a recusa do M1 (1.1.3) | Guilherme | 26/10 | **Aguarda o patrocinador:** o registro depende da decisão DEC-1 (Q-22). |
| Nova verificação do M1 sobre o commit corrigido | Guilherme | 09/11 | **Sem objeto:** a PSW não publicou commit novo. Mantida para o commit que a PSW indicar. |

---

## 4. Cronograma

**Fonte do planejado:** plano, seções 5.2 (atividades e precedências), 5.5 (alocação individual da PSW) e 5.6 (alocação individual da GPTI). As datas planejadas são as das aulas que fecham cada semana (seção 1).

**Fonte do real:** histórico do repositório (`git log` de todas as branches, consultado em 02/11), entregas da AV1 (05/10) e do SR1 (26/10). Onde não há commit, entrega nem apontamento, o campo diz "não medido".

**Responsável:** a avaliação da AV1 descontou o uso de "Equipe PSW" como responsável nas linhas de D01 a D05 e de D09 a D18. Aqui cada linha traz os **nomes das células da seção 5.5**. As células do Kauã estão marcadas: ficaram sem execução, e a redistribuição depende de DEC-4.

**Previsão restante:** as semanas de início e de fim vêm do nivelamento da seção 5.2. A capacidade é de 9 h por semana para a dupla, a partir da semana 12, já que a 11 está em curso sem trabalho. É a mesma conta nas duas tabelas.

### 4.1 Atividades de produto — PSW

| ID | Atividade | Responsável (células da seção 5.5) | Início plan. | Fim plan. | Início real | Fim real | Previsão restante (seção 5.2) | Situação |
|---|---|---|---|---|---|---|---|---|
| D01 | Detalhar escopo, atores, casos de uso e critérios de aceite | Letícia, Maria Clara e Kauã¹ | S1 · 04/08 | S1 · 04/08 | não medido | — | Fora da rede restante; cortada na opção C | **Em andamento, atrasada** (1.2.1 passou; 1.2.2 falhou, Q-15) |
| D02 | Navegação, HTML/CSS e protótipos das telas | Letícia, Maria Clara e Kauã¹ | S2 · 18/08 | S2 · 18/08 | não medido | — | Fora da rede restante; cortada na opção C | **Em andamento, atrasada** (1.2.6 não verificado) |
| D03 | Modelo de domínio, contratos e dados dos mocks | Letícia, Maria Clara e Kauã¹ | S3 · 25/08 | S3 · 25/08 | não medido | — | S15 → S15 | **Em andamento, atrasada** (sem contrato; 1.3.4 e 1.3.7 falharam) |
| D04 | Regras e validações em JavaScript | Letícia, Maria Clara e Kauã¹ | S4 · 01/09 | S4 · 01/09 | não medido | — | Fora da rede restante; mantida na opção C | **Em andamento, atrasada** (Q-05, Q-06, Q-07, Q-09) |
| D05 | Aplicação React, rotas, identidade visual e componentes | Letícia, Maria Clara e Kauã¹ | S5 · 08/09 | S5 · 08/09 | ≤ 22/09 (1º commit) | 22/09 (plano 5.1.1); verificado em 10/10 | — | **Concluída** (1.3.1 passou) |
| D06 | Frontend de publicações, curtida e comentário | **Letícia** | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 (1º commit) | — | S12 → S12 | **Em andamento, atrasada** (1.4.1 falhou) |
| D07 | Frontend de vídeo-aulas da criadora | **Maria Clara** | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 (1º commit) | — | S12 → S13 | **Em andamento, atrasada** (1.4.2 falhou) |
| D08 | Frontend de materiais gratuitos | **Kauã¹ — sem dono** (DEC-4) | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 (lista feita por outra pessoa) | — | S13 → S13 | **Em andamento, atrasada, sem responsável** (1.4.3 falhou) |
| D09 | Catálogo, detalhe, compra, pagamento, estante, avaliação e vendas | Letícia (catálogo e avaliação), Maria Clara (detalhe, compra, pagamento e vendas), Kauã¹ (estante) | S7 · 22/09 | S8 · 06/10 | ≤ 22/09 (1º commit) | — | S13 → S14 | **Em andamento, atrasada** (1.4.4 passou; 1.4.5 e 1.4.6 falharam) |
| D10 | Testar, corrigir e demonstrar o M1 | Letícia (teste de publicações), Maria Clara (teste da compra), Kauã¹ (materiais e demonstração) | S8 · 06/10 | S8 · 06/10 | não iniciada | — | S14 → S15 | **Não iniciada, atrasada.** Não há teste nem registro de demonstração. O commit de 06/10 (`158bace`) é a integração do JSON Server (MUD-01). |
| **M1** | **Frontend aceito com dados simulados** | Equipes e patrocinador | — | **06/10** | — | — | Fim da S15 | **Não aceito** (DEC-1 sem decisão) |
| D11 | Confirmar a tecnologia do backend; Express, MongoDB e persistência | Letícia, Maria Clara e Kauã¹ (2 h cada) | S9 · 13/10 | S9 · 13/10 | não iniciada | — | S16 → S16 | **Não iniciada, atrasada.** **Crítica.** |
| D12 | APIs dos três cadastros | Letícia (publicações), Maria Clara (vídeo-aulas), Kauã¹ (materiais) | S9 · 13/10 | S9 · 13/10 | não iniciada | — | S16 → S17 | **Não iniciada, atrasada** |
| D13 | API de catálogo, compra e estante | Letícia (catálogo), Maria Clara (compra), Kauã¹ (estante) | S10 · 27/10 | S10 · 27/10 | não iniciada | — | S17 → S18 | **Não iniciada, atrasada.** **Crítica.** |
| D14 | Perfis e controle de acesso com login simulado | Letícia (usuária), Maria Clara (criadora), Kauã¹ (login) | S10 · 27/10 | S11 · 03/11 | não iniciada | — | S18 → S19 | **Não iniciada, atrasada** (início previsto na S10) |
| D15 | Simulador de pagamento | Letícia, Maria Clara e Kauã¹ | S10 · 27/10 | S11 · 03/11 | não iniciada | — | S18 → S18 | **Não iniciada, atrasada** (início previsto na S10) |
| D16 | Aprovação, liberação, divisão e consulta de vendas | Letícia (vendas), Maria Clara (aprovação e divisão), Kauã¹ (liberação) | S11 · 03/11 | S11 · 03/11 | não iniciada | — | S19 → S20 | **Não iniciada; janela S11 em curso** (fecha em 03/11), com predecessoras atrasadas. **Crítica.** |
| D17 | Avaliação, média e busca | Letícia (busca), Maria Clara (avaliação), Kauã¹ (média) | S11 · 03/11 | S12 · 10/11 | não iniciada | — | S20 → S20 | **Não iniciada; janela S11 em curso**, com predecessora atrasada |
| D18 | Integrar, testar, documentar e demonstrar | Letícia (testes e API), Maria Clara (testes da compra), Kauã¹ (integração e demonstração) | S12 · 10/11 | S12 · 10/11 | não iniciada | — | S21 → S22 | **Não iniciada**, com predecessoras atrasadas. **Crítica.** |
| **M2** | **Sistema integrado ao backend próprio** | Equipes e patrocinador | — | **10/11** (aceite 30/11) | — | — | **Fim da S22** | **Previsto para a semana 22** (seção 5) |

¹ Célula do Kauã, que saiu da equipe. Ele não tem nenhum commit no histórico do repositório, e o README da entrega diz que "as tentativas de contato realizadas não tiveram retorno no período do projeto". A redistribuição é a DEC-4.

**Observação sobre as células.** O histórico mostra que a autoria não seguiu a célula da seção 5.5. Os commits da Maria Clara, por exemplo, tratam de publicações, perfil, navegação e chat, e não das vídeo-aulas de D07. As telas de materiais e de login, das células do Kauã, foram feitas por outras pessoas. A equipe se reorganizou depois da saída (README da entrega, "Organização do grupo"). Mas o plano diz que a célula é o contrato, e a avaliação da AV1 confirma: "a etapa seguinte cobra essa célula". Como a PSW não informou horas por pessoa, ainda não há como saber quantas horas cada uma pôs em cada célula. Esse ponto está em validação (ação 1).

### 4.2 Atividades de gerenciamento — GPTI

| ID | Atividade | Responsável (células da seção 5.6) | Início plan. | Fim plan. | Início real | Fim real | Previsão restante | Situação |
|---|---|---|---|---|---|---|---|---|
| G01 | Consolidar Business Case | Matheus | S4 · 24/08 | S4 · 24/08 | não medido | 05/10 (AV1) | — | **Concluída** (AV1: 10/10) |
| G02 | Consolidar Termo de Abertura | Gabriel | S4 · 24/08 | S4 · 24/08 | não medido | 05/10 (AV1) | — | **Concluída** (AV1: 15/15) |
| G03 | Stakeholders, governança e riscos iniciais | Guilherme | S4 · 24/08 | S4 · 24/08 | não medido | 05/10 (AV1) | — | **Concluída** |
| G04 | Escopo, EAP e dicionário | Matheus e Gabriel | S5 · 31/08 | S5 · 31/08 | não medido | 05/10 (AV1) | — | **Concluída** (AV1: 14/15 e 14/15) |
| G05 | Requisitos, mudanças e responsabilidades | Guilherme | S5 · 31/08 | S5 · 31/08 | não medido | 05/10 (AV1) | — | **Concluída** |
| G06 | Atividades, precedências, estimativas, recursos e cronograma | Matheus, Gabriel e Guilherme | S6 · 14/09 | S6 · 14/09 | não medido | 05/10 (AV1) | — | **Concluída** (AV1: 24/25) |
| G07 | Orçamento, riscos, engajamento e comunicações | Matheus, Gabriel e Guilherme | S7 · 21/09 | S7 · 21/09 | não medido | 05/10 (AV1) | — | **Concluída** (AV1: 15/15) |
| G08 | Integrar, revisar e entregar a AV1 | Matheus, Gabriel e Guilherme | S8 · 05/10 | S8 · 05/10 | não medido | 05/10 | — | **Concluída** (AV1: 97/100) |
| G09 | Controlar escopo e tempo; Status Report 1 | Matheus (escopo), Gabriel (cronograma), Guilherme (SR1) | S9 · 26/10 | S9 · 26/10 | 10/10 (abertura dos registros de questões e mudanças) | 26/10 | — | **Concluída.** Critério usado: SR1 entregue na data do calendário. A avaliação do professor ainda não saiu. |
| G10 | Controlar custos e recursos; Status Report 2 | Matheus (custo), Gabriel (recursos e reservas), Guilherme (SR2) | S10 · 09/11 | S10 · 09/11 | ≤ 02/11 | — | Entrega em 09/11 | **Em andamento; janela S10 em curso** (fecha em 09/11). Fora da medição (seção 1). |
| G11 | Stakeholders e riscos; Status Report 3 | Matheus, Gabriel e Guilherme | S11 · 16/11 | S11 · 16/11 | — | — | S11 | **Não iniciada, no prazo** |
| G12 | Termo de encerramento e lições aprendidas | Matheus, Gabriel e Guilherme | S12 · 30/11 | S12 · 30/11 | — | — | S12 | **Não iniciada, no prazo** |

---

## 5. Caminho crítico atualizado e data prevista do marco 2

**A data vem da rede, não do IDP** (aula 9: "o caminho crítico diz a data; o índice diz a tendência").

### 5.1 O caminho da linha de base e onde ele parou

Linha de base (plano 5.4): D01 → D02 → D03 → D04 → D05 → D06–D08 → D09 → D10 → **M1** → D11 → D13 → D16 → D18 → **M2**.

- **D06, D07, D08 e D09 não terminaram, e D10 não começou** (os aceites falharam ou não foram demonstrados). O **M1 não foi aceito**. Pela rede, D11 depende do M1 em término–início, então o caminho está parado no M1 desde 06/10.
- **D11 estava prevista para a semana 9 (13/10) e D13 para a semana 10 (27/10). Nenhuma começou.** Pela regra da aula 9, atraso no caminho crítico empurra a data.
- A folga de D12 (1 semana, plano 5.4.1) foi consumida: D12 também não começou.

### 5.2 Previsão pela rede com a capacidade real

**Premissas da conta:**

1. **Esforço restante:** é o da seção 6 (ONT − VA), o restante pelo plano. Não é reestimativa da PSW. A PSW indicou só um total de 20 h, que não permite refazer a rede por atividade.
2. **Capacidade:** **9 h por semana**, de Letícia e Maria Clara, 4,5 h cada (plano 5.5). O Kauã conta 0 h. **A conta começa na semana 12**, porque a semana 11 fecha em 03/11 e não teve trabalho até 02/11. Se a PSW usar a semana 11, tudo antecipa uma semana.
3. **Precedências:** as da seção 5.2 do plano. Uma atividade FS começa na semana seguinte ao fim da predecessora (controle semanal). **D17 → D18 é SS**, como na alocação da semana 12 do plano (D17 1 h e D18 3,5 h na mesma semana).
4. **Atividades já iniciadas** (D03 e D06 a D09) seguem sem esperar predecessoras não concluídas. É a regra de progresso sobre lógica, porque elas já começaram.
5. **Prioridade:** a ordem do caminho crítico.
6. **Fora da data:** D01, D02 e D04 (20,25 h restantes) não são predecessoras de nenhuma atividade restante. D03 entra, porque é predecessora de D15.

Resultado do nivelamento semana a semana:

| Atividade restante | Esforço restante | Semanas de PSW (início → fim) |
|---|---:|---|
| D06 | 5 h | S12 → S12 |
| D07 | 5 h | S12 → S13 |
| D08 | 5 h | S13 → S13 |
| D09 | 5,25 h | S13 → S14 |
| D10 | 7,5 h | S14 → S15 → **M1 no fim da S15** |
| D03 (restante) | 6,75 h | S15 → S15 |
| D11 | 6 h | S16 → S16 |
| D12 | 7,5 h | S16 → S17 |
| D13 | 6 h | S17 → S18 |
| D15 | 4,5 h | S18 → S18 |
| D14 | 6 h | S18 → S19 |
| D16 | 7,5 h | S19 → S20 |
| D17 | 6 h | S20 → S20 |
| D18 | 10,5 h | S21 → S22 → **M2 no fim da S22** |
| **Total na rede** | **88,5 h** |  |

**Caminho crítico atualizado:** D06/D07/D08 → D10 → M1 → D11 → D13 → D16 → D18 → M2. É o mesmo caminho da linha de base, deslocado.

| Medida | Valor |
|---|---|
| **Data planejada do M2** | Semana 12 de PSW, **10/11/2026** (aceite de GPTI em 30/11/2026) |
| **Data prevista do M2, pelo caminho crítico nivelado** | **Fim da semana 22 de PSW: +10 semanas.** Em semanas corridas a partir de 10/11 (semana N = 10/11 + 7 × (N − 12) dias), **sem considerar recesso, feriado nem fim do período letivo**, isso dá **19/01/2027**. O calendário do projeto termina na semana 12. **O M2 com o escopo da linha de base não cabe no calendário.** |
| Se a PSW usar a semana 11 | Fim da semana 21, 12/01/2027 pela mesma premissa: +9 semanas. |
| Se a capacidade do plano voltasse (3 pessoas, 13,5 h por semana) | Fim da semana 18, 22/12/2026 pela mesma premissa: +6 semanas. |
| Com D01, D02 e D04 incluídos no nivelamento | O M2 continua na semana 22. Os 20,25 h dessas atividades empurram só elas mesmas até a semana 24. |
| Conferência por esforço | 108,75 h restantes ÷ 9 h por semana ≈ **12,1 semanas de dupla** a partir da semana 12, ou seja, a semana 23, contando D01, D02 e D04. Só na rede: 88,5 ÷ 9 ≈ 9,8 semanas. A rede dá a semana 22 porque as precedências deixam folgas que o nivelamento não preenche. Conta e rede concordam na ordem de grandeza. |

A previsão foi calculada com um script que reproduz a tabela acima, com as seis premissas listadas.

---

## 6. Valor agregado por atividade

### 6.1 Regra de crédito (decisão do grupo)

**Regra adotada: 50/50**, a mesma da medição da seção 5.1.2 do plano.

- **Concluída**: 100% do esforço planejado. Uma atividade só conta como concluída se o **critério do dicionário foi verificado**.
- **Em andamento** (iniciada, com evidência de saída, mas sem aceite verificado): 50%.
- **Não iniciada** (sem evidência de saída da atividade): 0%.

**Por que 50/50:** as atividades em andamento da PSW atravessam vários períodos de medição (D06 a D08 duram 3 semanas, e D09 dura 2). A aula 9 indica 50/50 para atividade que "atravessa dois períodos". Manter a regra do plano também permite comparar com a medição da AV1. **Percentual estimado de cabeça não é usado.** A regra 0/100 entra na seção 8.3, como sensibilidade.

**Mudanças de leitura em relação ao plano 5.1.2 (03/10):**

- **D01, de 100% para 50%:** o pacote 1.2.2 (atores e perfis) falhou (Q-15).
- **D02, de 100% para 50%:** o pacote 1.2.6 não foi verificado.
- **D10 fica em 0%, como no plano:** o SR1 não encontrou teste nem registro de demonstração, e o commit de 06/10 é a integração do JSON Server (MUD-01), não teste nem correção para o aceite.

Só até a semana 8, o IDP da PSW cai de 0,62 (plano 5.1.2) para 53,25 ÷ 108 = 0,49.

### 6.2 Mapeamento atividade → pacote usado para decidir "concluída"

O plano liga cada atividade a um pacote só no nível do grupo (seção 6.2.1). O mapeamento abaixo foi montado para este relatório a partir das descrições da seção 5.2 e do dicionário.

| Atividade | Pacotes cujo aceite decide a conclusão |
|---|---|
| D01 | 1.2.1 e 1.2.2 |
| D02 | 1.2.6 |
| D03 | 1.2.3, 1.3.4, 1.3.5 e 1.3.7 |
| D04 | 1.2.4 e as regras do plano, seção 3 (preço, compra única, divisão e avaliação) |
| D05 | 1.3.1 |
| D06 | 1.4.1 |
| D07 | 1.4.2 |
| D08 | 1.4.3 |
| D09 | 1.4.4, 1.4.5, 1.4.6 e 1.3.6 |
| D10 | 1.4.7, 1.4.8 e os testes do M1 |
| D11 a D18 | 1.3.2, 1.3.3, 1.5.x e 1.6.x (nenhum começou) |
| G01 a G08 | Artefatos da AV1, entregues em 05/10 e avaliados pelo patrocinador (97/100) |
| G09 | Status Report 1, entregue em 26/10 na data do calendário |

### 6.3 Tabela de valor agregado

Taxa-sombra: **R$ 18,8461538 por hora** (plano 6.1), a mesma para PSW e GPTI. Com taxa única, os índices em horas e em reais coincidem (aula 9, "Hora só vale como dinheiro quando a hora vale o mesmo"). As colunas estão em horas; os totais aparecem também em reais.

- **Esforço planejado (ONT da atividade):** plano 5.2.
- **VP até 02/11:** semanas fechadas até a data de status, pela alocação semanal das seções 5.5 e 5.6 (seção 1).
- **Horas gastas (CR):** da PSW, reconstituídas pela GPTI em 02/11/2026 e em validação com a Letícia e a Maria Clara; da GPTI, registradas por atividade depois do fato e conferidas pelos integrantes (Anexo A).
- **Esforço restante:** ONT − VA, o restante pelo plano. **Não é estimativa de ninguém.** A PSW indicou só um total de 20 h (seção 8.2).

#### PSW

| ID | Esforço plan. (ONT) | VP até 02/11 | Horas gastas (CR) | Esforço restante | Aceite / situação | Regra → crédito | VA (h) |
|---|---:|---:|---:|---:|---|---|---:|
| D01 | 13,5 | 13,5 | 6 | 6,75 | 1.2.1 passou; 1.2.2 falhou | Em andamento → 50% | **6,75** |
| D02 | 13,5 | 13,5 | 6 | 6,75 | 1.2.6 não verificado | Em andamento → 50% | **6,75** |
| D03 | 13,5 | 13,5 | 5 | 6,75 | 1.3.5 passou; 1.2.3, 1.3.4 e 1.3.7 falharam | Em andamento → 50% | **6,75** |
| D04 | 13,5 | 13,5 | 2 | 6,75 | Regras de compra única, preço e avaliação ausentes; divisão errada | Em andamento → 50% | **6,75** |
| D05 | 6 | 6 | 5 | 0 | 1.3.1 passou | Concluída → 100% | **6** |
| D06 | 10 | 10 | 3 | 5 | 1.4.1 falhou | Em andamento → 50% | **5** |
| D07 | 10 | 10 | 3 | 5 | 1.4.2 falhou | Em andamento → 50% | **5** |
| D08 | 10 | 10 | 3 | 5 | 1.4.3 falhou | Em andamento → 50% | **5** |
| D09 | 10,5 | 10,5 | 10 | 5,25 | 1.4.4 passou; 1.4.5, 1.4.6 e 1.3.6 falharam | Em andamento → 50% | **5,25** |
| D10 | 7,5 | 7,5 | 2,5² | 7,5 | Sem teste nem registro de demonstração | Não iniciada → 0% | 0 |
| D11 | 6 | 6 | 0 | 6 | — | Não iniciada → 0% | 0 |
| D12 | 7,5 | 7,5 | 0 | 7,5 | — | Não iniciada → 0% | 0 |
| D13 | 6 | 6 | 0 | 6 | — | Não iniciada → 0% | 0 |
| D14 | 6 | 4,5 | 0 | 6 | — | Não iniciada → 0% | 0 |
| D15 | 4,5 | 3 | 0 | 4,5 | — | Não iniciada → 0% | 0 |
| D16 | 7,5 | 0 | 0 | 7,5 | Janela S11 em curso | Não iniciada → 0% | 0 |
| D17 | 6 | 0 | 0 | 6 | Janela S11 em curso | Não iniciada → 0% | 0 |
| D18 | 10,5 | 0 | 0 | 10,5 | — | Não iniciada → 0% | 0 |
| **FORA-EAP** (MUD-01 a MUD-05) | — | — | **22,5** | — | Trabalho sem solicitação de mudança | Não gera VA | 0 |
| **Total PSW** | **162** | **135** | **68** | **108,75** |  |  | **53,25** |

**VP de D14 e D15:** só a parte da semana 10 (1,5 h × 3 e 1 h × 3, plano 5.5). A parte da semana 11 está na semana em curso.

² **As 2,5 h de D10** estão na reconstituição como "correções de 06/10 e demonstração". Não há saída verificável de D10, e o commit de 06/10 é da MUD-01. A classificação dessas horas, se em D10 ou em MUD-01, está em validação com a PSW. O total de 68 h não muda.

#### GPTI

| ID | Esforço plan. (ONT) | VP até 02/11 | Horas gastas (CR) | Esforço restante | Aceite / situação | Regra → crédito | VA (h) |
|---|---:|---:|---:|---:|---|---|---:|
| G01 | 4 | 4 | 6 | 0 | Entregue e avaliado na AV1 | Concluída → 100% | **4** |
| G02 | 4 | 4 | 6 | 0 | Idem | Concluída → 100% | **4** |
| G03 | 4 | 4 | 6 | 0 | Idem | Concluída → 100% | **4** |
| G04 | 8 | 8 | 6 | 0 | Idem | Concluída → 100% | **8** |
| G05 | 4 | 4 | 4 | 0 | Idem | Concluída → 100% | **4** |
| G06 | 12 | 12 | 10 | 0 | Idem | Concluída → 100% | **12** |
| G07 | 12 | 12 | 10 | 0 | Idem | Concluída → 100% | **12** |
| G08 | 12 | 12 | 6 | 0 | AV1 entregue em 05/10 | Concluída → 100% | **12** |
| G09 | 12 | 12 | 8 | 0 | SR1 entregue em 26/10 | Concluída → 100% | **12** |
| G10 | 12 | 0 | —³ | 12 | Janela S10 em curso; fora da medição | — | — |
| G11 | 12 | 0 | 0 | 12 | — | Não iniciada → 0% | 0 |
| G12 | 12 | 0 | 0 | 12 | — | Não iniciada → 0% | 0 |
| **Total GPTI** | **108** | **72** | **62** | **36** |  |  | **72** |

³ **G10** tem 3 h registradas até 02/11, na semana 10, que está em curso. Pela convenção da seção 1, elas não entram em VP, VA nem CR deste relatório e são medidas no SR3. Por isso o IDP da GPTI é de 1,00, sem crédito antecipado.

### 6.4 Totais de VP, VA e CR: de onde cada número sai

| Grandeza | Conta | Horas | R$ (× 18,8461538) |
|---|---|---:|---:|
| **VP PSW** | D01–D04 (4 × 13,5 = 54) + D05 (6) + D06–D08 (3 × 10 = 30) + D09 (10,5) + D10 (7,5) + D11 (6) + D12 (7,5) + D13 (6) + D14 até S10 (4,5) + D15 até S10 (3). Confere com 10 semanas × 13,5 h. | **135** | R$ 2.544,23 |
| **VP GPTI** | G01–G03 (3 × 4 = 12) + G04 (8) + G05 (4) + G06–G09 (4 × 12 = 48). Confere com 6 semanas × 12 h. | **72** | R$ 1.356,92 |
| **VP total** | 135 + 72 | **207** | **R$ 3.901,15** |
| **VA PSW** | Concluída: D05 (6). Em andamento, 50% de D01, D02, D03, D04 (4 × 13,5 = 54), D06, D07, D08 (30) e D09 (10,5): 0,5 × 94,5 = 47,25. D10 a D18: 0. Soma: 6 + 47,25. | **53,25** | R$ 1.003,56 |
| **VA GPTI** | Concluídas G01–G09 = 72. G10 fora da medição. | **72** | R$ 1.356,92 |
| **VA total** | 53,25 + 72 | **125,25** | **R$ 2.360,48** |
| **CR PSW (reconstituído, em validação com a PSW)** | Atividades da EAP: D01 6 + D02 6 + D03 5 + D04 2 + D05 5 + D06 3 + D07 3 + D08 3 + D09 10 + D10 2,5 = 45,5. Fora da EAP: MUD-01 8 + MUD-02 6,5 + MUD-03 3,5 + MUD-04 3,5 + MUD-05 1 = 22,5. D11–D18: 0 (não feitas). Soma: 45,5 + 22,5. | **68** | R$ 1.281,54 |
| **CR GPTI (registrado por atividade e conferido)** | G01 6 + G02 6 + G03 6 + G04 6 + G05 4 + G06 10 + G07 10 + G08 6 + G09 8 (semanas 4 a 9) | **62** | R$ 1.168,46 |
| **CR total** | 68 + 62 | **130** | **R$ 2.450,00** |
| **ONT (orçamento no término)** | Atividades niveladas: 162 PSW + 108 GPTI (plano 6.4). A contingência de 44 h fica fora do ONT, como no exemplo da aula 9. | **270** | **R$ 5.088,46** |

---

## 7. Variações e índices

Fórmulas da aula 9: **VPr = VA − VP**, **VC = VA − CR**, **IDP = VA ÷ VP** e **IDC = VA ÷ CR**. Negativo é ruim nas variações; menor que 1 é ruim nos índices. Todas as entradas vêm da seção 6.4.

**Entradas** (horas, até a última semana fechada de cada grupo):

| Grupo | VP | VA | CR | Origem do CR |
|---|---:|---:|---:|---|
| PSW | 135 | 53,25 | 68 | Reconstituído pela GPTI em 02/11/2026; em validação com a Letícia e a Maria Clara |
| GPTI | 72 | 72 | 62 | Registrado por atividade depois do fato e conferido pelos integrantes |
| **Total** | **207** | **125,25** | **130** |  |

**Variações e índices:**

| Grupo | VPr = VA − VP | VPr ÷ VP | VC = VA − CR | VC ÷ VA | IDP = VA ÷ VP | IDC = VA ÷ CR |
|---|---|---:|---|---:|---|---|
| **PSW** | 53,25 − 135 = **−81,75 h** (−R$ 1.540,67) | −60,6% | 53,25 − 68 = **−14,75 h** (−R$ 277,98) | −27,7% | 53,25 ÷ 135 = **0,39** | 53,25 ÷ 68 = **0,78** |
| **GPTI** | 72 − 72 = **0 h** (R$ 0,00) | 0,0% | 72 − 62 = **+10 h** (+R$ 188,46) | +13,9% | 72 ÷ 72 = **1,00** | 72 ÷ 62 = **1,16** |
| **Total** | 125,25 − 207 = **−81,75 h** (−R$ 1.540,67) | −39,5% | 125,25 − 130 = **−4,75 h** (−R$ 89,52) | −3,8% | 125,25 ÷ 207 = **0,61** | 125,25 ÷ 130 = **0,96** |

Os valores em reais são as horas × R$ 18,8461538. Com taxa única, os índices em reais são iguais aos índices em horas.

**Conta auxiliar, só para a leitura (não substitui o índice oficial):** sem as 22,5 h fora da EAP, o CR da PSW seria de 45,5 h e o IDC de 53,25 ÷ 45,5 = 1,17.

**Leitura da equipe GPTI:**

- **PSW, prazo:** fez cerca de 39% do que deveria estar pronto (IDP 0,39). Na AV1, com o repositório de 03/10, o IDP da PSW era 0,62 (plano 5.1.2). Três coisas explicam a queda: as semanas 9 e 10 somaram 27 h de VP e nenhum VA; D01 e D02 passaram a ser lidas pelo critério do dicionário; e D10 não tem saída.
- **PSW, custo:** cada hora gasta rendeu 0,78 h de valor planejado (IDC 0,78), fora do limite de 10%. Há duas causas:
  - **um terço das horas não gera valor:** são 22,5 h de 68 h fora da EAP (MUD-01 a MUD-05);
  - **o trabalho começou sem fechar aceite:** a regra 50/50 ainda adianta crédito a atividades com pouco gasto. Em D04, por exemplo, o VA é de 6,75 h para 2 h gastas. Por isso a conta auxiliar dá 1,17. Esse número vem do adiantamento da regra, não de produtividade.
  - Com a primeira reconstituição (97,5 h), o IDC seria de 0,55 (seção 8.3). Nos dois casos, a leitura é a mesma: abaixo de 0,9.
- **GPTI:** no prazo (IDP 1,00) e abaixo do custo (IDC 1,16). As entregas da AV1 e do SR1 saíram nas datas do calendário, com menos horas do que as 12 h semanais reservadas. O plano já previa isso: o calendário da GPTI ficou 28 h acima da estimativa pelo entregável (6.2.1: "vários artefatos, em especial os status, não consomem as 12 h"). As horas foram registradas depois do fato, por atividade (Anexo A.4).
- **Total:** o IDC de 0,96 e o IDP de 0,61 misturam dois grupos com situações opostas. **A decisão deve ler a PSW**, porque só a PSW programa, e a hora de GPTI não substitui programação (plano 5.3).

---

## 8. Previsão

### 8.1 ENT e EPT — previsão principal

**Fórmula:** ENT = ONT ÷ IDC e EPT = ENT − CR (aula 9). Também VNT = ONT − ENT e IDPT = (ONT − VA) ÷ (ONT − CR).

**Premissa:** **o desvio de custo continua.** A mesma equipe, agora menor, vai entrar em tecnologia nova para ela (Express e MongoDB, nunca iniciados), sem as regras de negócio prontas. Nada indica que o rendimento por hora vá melhorar.

**O total é a soma das partes.** A previsão é feita por grupo, e a ENT total soma as duas. A conta direta com o IDC total (270 ÷ 0,96 = 280,2 h) misturaria dois grupos com desempenhos opostos, então não é usada.

| Grupo | ENT = ONT ÷ IDC | EPT = ENT − CR | VNT = ONT − ENT | IDPT |
|---|---|---|---|---|
| **PSW** | 162 ÷ 0,7831 = **206,9 h** (R$ 3.898,76) | 206,9 − 68 = **138,9 h** (R$ 2.617,23) | **−44,9 h** | (162 − 53,25) ÷ (162 − 68) = 108,75 ÷ 94 = **1,16** |
| **GPTI** | 108 ÷ 1,1613 = **93,0 h** (R$ 1.752,69) | 93,0 − 62 = **31,0 h** (R$ 584,23) | **+15,0 h** | (108 − 72) ÷ (108 − 62) = 36 ÷ 46 = **0,78** |
| **Total (soma das partes)** | 206,9 + 93,0 = **299,9 h** (R$ 5.651,45) | 138,9 + 31,0 = **169,9 h** (R$ 3.201,46) | **−29,9 h** | — |

**Leitura:**

- O **IDPT da PSW é de 1,16**: para fechar no orçamento, cada hora restante teria de render 1,16 h de valor. A aula 9 registra que, acima de 1,1, o orçamento original raramente se sustenta.
- O desvio previsto da PSW (44,9 h) é mais que o dobro da contingência de programação do plano (18 h), que hoje é de 2 h (seção 9.3).
- A ENT total (299,9 h) fica abaixo das 314 h da linha de base de custos **só porque a GPTI fica abaixo do planejado**, e a hora de GPTI não vira programação. O limite que decide o projeto é a capacidade da PSW (seção 9).

### 8.2 Previsões alternativas

**(a) Desvio pontual.** Fórmula: ENT = CR + (ONT − VA). Premissa: o que falta custa o que o plano previu.

| Grupo | ENT | EPT |
|---|---|---|
| PSW | 68 + (162 − 53,25) = **176,75 h** (R$ 3.331,06) | **108,75 h** (R$ 2.049,52) |
| GPTI | 62 + (108 − 72) = **98 h** (R$ 1.846,92) | **36 h** (R$ 678,46) |
| Total | 176,75 + 98 = **274,75 h** (R$ 5.177,98) | **144,75 h** (R$ 2.727,98) |

**(b) Indicação da PSW.** A PSW indicou **20 h** para passar nos critérios de aceite pendentes até 10/11. Essa indicação **não é usada como previsão**, por duas razões:

1. não vem por atividade, então não dá para saber o que cobre;
2. coincide exatamente com o teto de capacidade (2 pessoas × 5 h × 2 semanas = 20 h), o que sugere que é a capacidade disponível, e não uma estimativa do trabalho.

Ela fica registrada para a validação contínua com a PSW (ação 1).

A equipe GPTI mantém como principal a fórmula ONT ÷ IDC. A alternativa (a) supõe que o desvio parou, e não há commit desde 06/10.

### 8.3 Sensibilidade: CR × regra de crédito (PSW)

| Cenário | VA PSW | CR PSW | IDC PSW | ENT PSW | EPT PSW | Restante (ONT − VA) contra 18 h nominais |
|---|---:|---:|---:|---:|---:|---|
| **Principal:** 50/50 e CR de 68 h (referências revisadas) | 53,25 | 68 | 0,78 | 206,9 | 138,9 | 108,75 h: **não cabe** |
| 50/50 e CR de 97,5 h (primeira reconstituição, referências do plano) | 53,25 | 97,5 | 0,55 | 296,6 | 199,1 | 108,75 h: **não cabe** |
| 0/100 (só concluída) e CR de 68 h | 6 | 68 | 0,09 | 1.836,0 | 1.768,0 | 156 h: **não cabe** |
| 0/100 (só concluída) e CR de 97,5 h | 6 | 97,5 | 0,06 | 2.632,5 | 2.535,0 | 156 h: **não cabe** |

Os dois valores de CR estão explicados no Anexo A.2. Os cenários 0/100 têm ENT absurda porque só D05 está concluída: a regra 0/100 quase não credita nada a uma PSW sem aceites.

**A resposta à pergunta 3 é "não" em todos os cenários.** Ela só muda se o escopo mudar.

---

## 9. Recursos

### 9.1 Horas planejadas e realizadas por pessoa

O planejado vem das seções 5.5 e 5.6 do plano, até a última semana fechada de cada grupo. **Nenhum dos dois grupos apontou horas semana a semana** (Q-18). O realizado da PSW é a reconstituição de 02/11/2026, em validação com a Letícia e a Maria Clara. O realizado da GPTI são as horas registradas por atividade depois do fato e conferidas pelos integrantes.

| Pessoa | Grupo | Planejado até a última semana fechada | **Realizado** | Origem do realizado | Diferença (realizado − planejado) | Planejado da data de status ao M2 | **Capacidade restante até o M2** |
|---|---|---:|---:|---|---:|---:|---:|
| Letícia | PSW | 45 h (S1–S10 × 4,5) | 34 h¹ | Reconstituído pela GPTI; em validação | −11 h | 9 h (S11–S12) | **9 h** nominais (teto: 10 h); 4,5 h efetivas se a S11 não for usada |
| Maria Clara | PSW | 45 h | 34 h¹ | Reconstituído pela GPTI; em validação | −11 h | 9 h | **9 h** nominais (teto: 10 h); 4,5 h efetivas se a S11 não for usada |
| Kauã | PSW | 45 h | 0 h | Saiu da equipe | −45 h | 9 h | **0 h** |
| **PSW** |  | **135 h** | **68 h** |  | **−67 h** | 27 h | **18 h** nominais (teto: 20 h); **9 h** efetivas se a S11 não for usada |
| Matheus | GPTI | 24 h (S4–S9 × 4) | 20,33 h² | Registrado por atividade e conferido | −3,67 h | 12 h (S10–S12) | **12 h** (teto: 15 h) |
| Gabriel | GPTI | 24 h | 20,33 h² | Registrado por atividade e conferido | −3,67 h | 12 h | **12 h** (teto: 15 h) |
| Guilherme | GPTI | 24 h | 21,33 h² | Registrado por atividade e conferido | −2,67 h | 12 h | **12 h** (teto: 15 h) |
| **GPTI** |  | **72 h** | **62 h** |  | **−10 h** | 36 h | **36 h** (teto: 45 h) |

¹ **A divisão 34/34 é premissa da GPTI.** A PSW não informou quem fez cada atividade. As 4,25 h por semana que resultam dessa divisão (34 h ÷ 8 semanas) saem da própria premissa e não provam nada sobre a carga real.

² Semanas 4 a 9. As 3 h de G10 (1 h por pessoa, semana 10 em curso) ficam fora, pela convenção da seção 1, e são medidas no SR3.

**Contas da tabela:**

| Item | Conta | Resultado |
|---|---|---:|
| Planejado, por aluno de PSW | 10 semanas fechadas (S1–S10) × 4,5 h | 45 h |
| Planejado, PSW | 3 × 45 h (confere com o VP da PSW, seção 6.4) | 135 h |
| Planejado, por aluno de GPTI | 6 semanas fechadas (S4–S9) × 4 h | 24 h |
| Planejado, GPTI | 3 × 24 h (confere com o VP da GPTI) | 72 h |
| Realizado, PSW | 45,5 h na EAP + 22,5 h fora dela (Anexo A.3), divididas em partes iguais entre as duas alunas ativas | 34 h cada; 68 h |
| Realizado, GPTI | Horas por célula da seção 5.6 nas semanas 4 a 9 (Anexo A.4) | 20,33 + 20,33 + 21,33 = 62 h |
| Diferença, PSW | 68 − 135 | −67 h |
| Diferença, GPTI | 62 − 72 | −10 h |
| Capacidade nominal até o M2, PSW (10/11) | 2 alunas ativas × 4,5 h × 2 semanas (S11 e S12). Teto: 2 × 5 h × 2 | 18 h (teto: 20 h) |
| Capacidade efetiva até o M2, PSW | Só a S12, porque a S11 fecha em 03/11 sem trabalho até 02/11: 2 × 4,5 h. Teto: 2 × 5 h | 9 h (teto: 10 h) |
| Capacidade até o M2, GPTI (30/11) | 3 alunos × 4 h × 3 semanas (S10, S11 e S12). Teto: 3 × 5 h × 3 | 36 h (teto: 45 h) |
| Capacidade perdida com a saída do Kauã | 10 × 4,5 h até 02/11 + 2 × 4,5 h até o M2 | 45 h + 9 h = 54 h |

**Base de capacidade diferente da do SR1.** A Q-02 do SR1 usou o teto de 5 h por aluno: de 15 h para 10 h por semana. Este relatório usa o planejado de 4,5 h por aluno (plano 5.5): de 13,5 h para 9 h por semana. Os dois números estão certos e medem coisas diferentes. Aqui o teto aparece sempre entre parênteses.

**Leitura:**

- **Nenhum dos dois grupos apontou semana a semana** (Q-18). O método combinado (cada aluno informa as próprias horas, numa reunião de apontamento conduzida por Matheus e Letícia) não foi seguido. "Hora planejada e não apontada é capacidade perdida" (aula 9).
- **PSW:** nas semanas 1 a 8 houve desenvolvimento, mas a PSW não informou horas, e a GPTI reconstituiu os 68 h pelo repositório. Nas semanas 9 e 10 não houve desenvolvimento, e as linhas de 0 h foram lançadas pela GPTI. A reconstituição está em validação com a Letícia e a Maria Clara.
- **As 67 h da PSW abaixo do planejado têm três origens:**
  - **45 h** das células do Kauã, que saiu;
  - **18 h** das semanas 9 e 10, em que Letícia e Maria Clara não produziram entrega (2 × 4,5 h × 2 semanas);
  - **4 h** de diferença nas semanas 1 a 8 (72 h planejadas para a dupla, contra 68 h reconstituídas).
- **Mesmo com horas abaixo do plano, um terço das horas da PSW foi para fora da EAP** (22,5 de 68 h, seção 10.2).
- **Kauã:** 45 h planejadas e 0 h realizadas até a data de status. Ele perde ainda 9 h nas semanas 11 e 12, e é responsável (A) por 14 pacotes do dicionário (Q-02).
- **GPTI:** 62 h realizadas, contra 72 h planejadas no mesmo período (−10 h), com todas as entregas no prazo (AV1 em 05/10 e SR1 em 26/10). As horas foram registradas por atividade depois do fato e conferidas pelos integrantes.

### 9.2 As horas que faltam cabem na capacidade até o M2?

| Grupo | Restante pelo plano (ONT − VA) | Restante pela previsão (EPT = ENT − CR) | Capacidade até o M2 | Saldo |
|---|---:|---:|---:|---|
| **PSW** | 162 − 53,25 = **108,75 h** | 206,9 − 68 = **138,9 h** | **18 h** nominais (teto: 20 h); **9 h** efetivas | **Sobre a nominal:** 18 − 108,75 = **−90,75 h** a 18 − 138,9 = **−120,9 h**. Não cabe. A 9 h por semana, são de 10,1 a 13,4 semanas de dupla. Sobre a efetiva, faltam de 99,75 h a 129,9 h. |
| **GPTI** | 108 − 72 = **36 h** | 93,0 − 62 = **31 h** | **36 h** (teto: 45 h) | 36 − 36 = **0 h** a 36 − 31 = **+5 h**. Cabe, sem folga pelo plano. |

**A capacidade da GPTI não substitui a da PSW.** Das reservas técnicas, no máximo 6 h podem ser apoio da GPTI em dados de teste, critérios, execução e registro de testes e documentação (plano 5.3 e 6.3.3). A opção C da DEC-5 usa essas horas.

### 9.3 Reservas e riscos que dispararam

O plano diz que o SR2 é a **última revisão que ainda permite resposta** (seção 6.3.2).

**Dois "18 h" diferentes.** Neste relatório aparecem duas grandezas de 18 h, que não devem ser confundidas:

- **Contingência de programação da PSW:** 18 h no plano (seção 6.3.3 e termo, seção 6), formadas pela folga de 0,5 h por aluno por semana (0,5 × 3 × 12). Hoje restam **2 h** (0,5 × 2 alunas × 2 semanas).
- **Capacidade nominal da PSW até o M2:** 18 h (2 × 4,5 h × 2 semanas). É a hora planejada de trabalho que ainda existe, e não reserva.

| Risco | Gatilho do plano | Disparou? | Evidência | Fatia de contingência (plano 6.3.3) |
|---|---|---|---|---|
| RT01, aprendizagem estoura o pacote técnico | Atividade técnica com mais de 4 h restantes | **Sim** | D11, D12 e D13 seguem com 100% restantes | 8 h PSW |
| RT02, compra, liberação ou divisão falham | Caso prioritário incorreto | **Sim**, na semana 8 | Q-05 e Q-06 | 5 h PSW + 3 h GPTI |
| RT03, dados simulados divergem da API | Divergência na forma de acesso | **Sim**, na semana 8 | MUD-01 | 3 h PSW + 1 h GPTI |
| RT04, ambiente ou MongoDB | Ambiente não reproduzível ao fim da semana 9 | **Sim** | Backend não iniciado | 1 h PSW + 2 h GPTI |
| RT05, código de IA não explicável | Defeito crítico ou código não explicável | Não avaliado | A revisão de 1.1.4 não foi verificada | 1 h PSW |
| RG01, pedido fora da EAP | Pedido acima de 3 h | **Sim** | MUD-02 a MUD-05, com 14,5 h reconstituídas | 5 h GPTI |
| RG02, aluno abaixo da carga | Participante abaixo da carga por duas semanas | **Sim** | Kauã | 6 h GPTI |
| RG03, regra muda depois da semana 4 | Mudança de regra | Não | — | 4 h GPTI |
| RG04, artefato da AV1 rejeitado | Artefato rejeitado | Não | AV1 com 97/100 | 3 h GPTI |
| RG05, decisão de marco atrasa | Decisão pendente por uma semana | **Sim** | DEC-1 a DEC-4 em aberto desde 26/10 (Q-22) | 2 h GPTI |

**As fatias autorizadas pelos gatilhos disparados somam 17 h PSW e 19 h GPTI.**

- **PSW:** essas horas não existem mais em pessoa. A contingência de programação restante é de 2 h.
- **GPTI:** tem 9 h de folga até a semana 12 (1 h × 3 pessoas × 3 semanas).
- **Reserva gerencial** (R$ 414,24, cerca de 22 h): depende do patrocinador e "não representa horas disponíveis" (plano 6.4). Reserva sem pessoa não vira hora.

---

## 10. Questões e mudanças

### 10.1 Registro de questões, atualizado

Regras: a questão é um fato que já aconteceu (aula 8). O dono responde pelo tratamento. A data é o prazo para corrigir ou para registrar como limitação. Atraso no caminho crítico, custo acima do planejado e pessoa sem hora apontada vão para este registro (enunciado do SR2). **Os donos são os do SR1**, salvo onde a mudança está registrada.

**Questões do SR1:** nenhuma foi resolvida até 02/11.

| ID | Questão (resumo do SR1) | Dono | Prazo no SR1 | Situação em 02/11 | Impacto: escopo / prazo / custo |
|---|---|---|---|---|---|
| Q-01 | M1 parcial: 9 pacotes falharam e 1 não foi demonstrado | Matheus | 26/10 | **Aberta, prazo vencido.** Depende de DEC-1 e de correção da PSW. | Escopo: 10 pacotes / Prazo: bloqueia o M1 e a D11 / Custo: 27,75 h restantes em D06–D10 |
| Q-02 | Integrante a menos na PSW | Matheus | 13/10 | **Confirmada: Kauã.** Segue aberta até DEC-4. **Atualização abaixo.** | Escopo: 14 pacotes sem A / Prazo: capacidade de 13,5 h para 9 h por semana / Custo: 45 h planejadas sem execução até S10 |
| Q-03 | M1 depende do JSON Server | Letícia | 13/10 | **Aberta, prazo vencido** (depende de DEC-2) | Escopo: 1.3.4 e 1.4.7 |
| Q-04 | Pagamento sem dado de teste e sem recusa | Maria Clara | 27/10 | **Aberta, prazo vencido** | Escopo: 1.3.6 e 1.4.5; REQ-02 e REQ-10 |
| Q-05 | Compra repetida aceita | Maria Clara | 27/10 | **Aberta, prazo vencido** | Viola o critério geral de aceite |
| Q-06 | As partes da divisão não somam o preço | Maria Clara | 27/10 | **Aberta, prazo vencido** | Viola o critério geral de aceite |
| Q-07 | Avaliação aceita aula não comprada e não grava | Letícia | 27/10 | **Aberta, prazo vencido** | Escopo: 1.4.6; REQ-06 |
| Q-08 | Vendas sem parte da plataforma e com totais errados | Letícia | 27/10 | **Aberta, prazo vencido** | Escopo: 1.4.6; REQ-04 |
| Q-09 | Preço 0 e negativo salvos; criadora não retira aula | Maria Clara | 27/10 | **Aberta, prazo vencido** | Escopo: 1.4.2; REQ-05 |
| Q-10 | Materiais sem cadastro; filtro por categoria | Maria Clara (rever após Q-02) | 27/10 | **Aberta, prazo vencido, sem dono definitivo** | Escopo: 1.4.3; REQ-08 |
| Q-11 | Publicação sem editar e remover; moderação; curtida não é por usuária | Letícia | 27/10 | **Aberta, prazo vencido** | Escopo: 1.4.1; REQ-07 |
| Q-12 | Carga de dados não reproduzível | Letícia | 13/10 | **Aberta, prazo vencido** | Escopo: 1.3.7 |
| Q-13 | Login com mensagem de sucesso na senha errada | Maria Clara | 27/10 | **Aberta, prazo vencido** | Uso |
| Q-14 | README com porta 5173; a interface sobe na 3000 | Maria Clara | 13/10 | **Aberta, prazo vencido** | Escopo: 1.7.4 |
| Q-15 | Usuária sem perfil de criadora abre telas de criadora | Gabriel (A de 1.2.2) | 27/10 | **Aberta, prazo vencido.** A correção é no código, feita pela PSW. A GPTI acompanha e verifica quando houver commit. | Escopo: 1.2.2; REQ-09. Mantém D01 em 50% (seção 6). |
| Q-16 | Sem registro da demonstração do M1 | Guilherme (A de 1.4.8) | 26/10 | **Aberta, prazo vencido.** Não há registro da demonstração de 06/10: nem roteiro executado pela PSW (R de 1.4.8) nem registro da GPTI. | Escopo: 1.4.8. Mantém D10 em 0% (seção 6). |
| Q-17 | A busca procura na descrição; id inexistente abre outra aula | Maria Clara | 27/10 | **Aberta, prazo vencido** | Ressalva de 1.4.4 |

**Atualização de Q-02.** O integrante ausente é o **Kauã**. Ele é **A (presta contas)** de 1.2.3, 1.3.2, 1.3.3, 1.3.4, 1.3.5, 1.4.3, 1.4.7, 1.5.3, 1.5.8, 1.5.9, 1.5.10, 1.6.2, 1.6.5 e 1.7.4, e dos pacotes de primeiro nível 1.3 e 1.6 (README da GPTI). Com a saída, **a PSW ficou com exatamente dois alunos**, o limite do critério de cancelamento do termo de abertura (seção 6: "equipe ficar com menos de dois alunos de PSW"). Qualquer nova ausência atinge esse critério. A capacidade vai de 13,5 h para 9 h por semana pela carga planejada (4,5 h por aluno). O SR1 usou o teto de 5 h por aluno, de 15 h para 10 h (seção 9.1).

**Questões novas deste relatório:**

| ID | Questão e evidência | Dono | Data | Impacto: escopo / prazo / custo |
|---|---|---|---|---|
| **Q-18** | **Pessoa sem hora apontada.** O método combinado no SR1 (cada aluno informa as próprias horas, com reunião de apontamento conduzida por Matheus e Letícia, plano 7.4) não foi seguido, e nenhum dos dois grupos apontou semana a semana. **PSW:** nas semanas 1 a 8 houve desenvolvimento, mas nenhuma hora informada; nas semanas 9 e 10 não houve desenvolvimento, e as linhas de 0 h foram lançadas pela GPTI. As 68 h foram reconstituídas pela GPTI em 02/11/2026 e estão em validação com a Letícia e a Maria Clara. **GPTI:** horas registradas por atividade depois do fato e conferidas pelos integrantes. | Matheus e Letícia (plano 5.1 e 7.4; ação do SR1) | Validação contínua nas reuniões conjuntas; apontamento semanal dos dois grupos a partir de 03/11 | Escopo: nenhum / Prazo: sem esforço restante por atividade / **Custo: o CR não foi medido em nenhuma semana** |
| **Q-19** | **Atraso no caminho crítico.** O M1 está sem aceite, D10 não começou, D11 (prevista para 13/10) e D13 (27/10) não começaram, e não há commit desde 06/10. M2 previsto para o fim da semana 22, contra a 12. | Letícia (coordenadora da PSW e A de 1.4). O A de 1.6 está vago (Kauã). | Decisão DEC-5 antes de 10/11 | Escopo: 19 pacotes do M2 / **Prazo: +10 semanas** / Custo: EPT de 138,9 h na PSW |
| **Q-20** | **Custo acima do planejado na PSW**, fora do limite. VC de −14,75 h (−27,7%), IDC de 0,78 e ENT da PSW de 206,9 h (+44,9 h sobre o ONT de 162 h). As causas são as 22,5 h fora da EAP (33% do CR) e o trabalho iniciado sem aceite. | Matheus (controle do custo, G10) e Letícia (PSW) | Acompanhar no apontamento semanal a partir de 03/11; nenhuma hora nova em MUD-02 a MUD-05 (DEC-3) | Escopo: trabalho fora da EAP / Prazo: — / **Custo: VNT de −44,9 h na PSW** |
| **Q-21** | **Nenhuma correção depois do M1.** As questões com dono na PSW (Q-03 a Q-14 e Q-17) passaram do prazo (13/10 e 27/10) sem commit. As questões com dono na GPTI (Q-01, Q-15 e Q-16) também estão abertas, porque dependem de DEC-1 e de correção da PSW. As semanas 9 e 10 da PSW não produziram entrega. | Letícia | 03/11, na reunião conjunta: a PSW informa o que fez nas semanas 9 e 10 e o que entrega até 10/11 | Escopo: 9 pacotes do M1 / Prazo: 27 h de VP sem VA / Custo: — |
| **Q-22** | **Decisões do patrocinador sem resposta.** DEC-1 a DEC-4, pedidas em 26/10, não têm decisão registrada, o que dispara RG05. Por isso, o aceite ou a recusa do M1 (1.1.3) não foi registrado. | Guilherme prepara; Matheus responde (plano 5.7) | Levar por escrito até 05/11 | Escopo: 1.1.2 e 1.1.3 / Prazo: a D11 depende do M1 / Custo: — |

### 10.2 Registro de mudanças, atualizado

Regra (plano, seção 8; aula 9): a mudança começa por pedido escrito, com o que muda, em qual pacote e o efeito em escopo, prazo e custo. O patrocinador aprova. **Enquanto a mudança espera decisão, vale o plano original.**

| ID | O que foi feito ou proposto | Pedido escrito | Horas gastas (reconstituídas; em validação com a PSW) | Impacto: escopo / prazo / custo | Decisão do patrocinador | Recomendação da equipe GPTI |
|---|---|---|---:|---|---|---|
| MUD-01 | JSON Server como fonte de dados do M1, no lugar de `src/mocks` | **Não há** | 8 h (R$ 150,77) | Escopo: aceite de 1.3.4, 1.3.7 e 1.4.7 / Prazo: nenhum, se aprovada; cerca de 8 h de retrabalho para voltar a `src/mocks`, o mesmo esforço da troca / Custo: 8 h fora da EAP até aqui | **Pendente** | **Muda em relação ao SR1:** antes, a GPTI recomendava decidir só com o pedido da PSW e não recomendava (b). Agora recomenda **aprovar a opção (b) para o M1**. Motivo: a avaliação da AV1 registra que "o marco 1 da disciplina de PSW, e a branch develop entregue, usam o JSON Server como API", e descontou 1 ponto em "Escopo e EAP" e 1 em "Dicionário" porque a linha de base fixou 1.4.7 em `src/mocks`. A aprovação também reverte uma decisão do registro de IA do plano (seção 9), que recusou o `json-server`, e por isso precisa ser explícita. Como a PSW não entregou o pedido escrito, a GPTI o redige junto com a Letícia (ação 5). |
| MUD-02 | Moderação e administração com gravação | Não há | 6,5 h (R$ 122,50) | Escopo: bloqueia 1.4.1 / Custo: 6,5 h | **Pendente** | Não aprovar. Fica fora do aceite, sem novas horas (DEC-3 b). Sem mudança em relação ao SR1. |
| MUD-03 | Chat com gravação | Não há | 3,5 h (R$ 65,96) | Custo: 3,5 h | **Pendente** | Não aprovar. Sem novas horas. |
| MUD-04 | Stories | Não há | 3,5 h (R$ 65,96) | Custo: 3,5 h | **Pendente** | Não aprovar. Sem novas horas. |
| MUD-05 | Seguir e pesquisa ampla | Não há | 1 h (R$ 18,85) | Custo: 1 h | **Pendente** | Não aprovar. Sem novas horas. |
| **MUD-06** | **Proposta da GPTI: redefinir o M2** como o fluxo de compra correto sobre a API local. 1.3.2, 1.3.3, 1.5.x e 1.6.x em Express e MongoDB passam para pendências futuras (1.7.6). É a opção C da DEC-5. | **A redigir pela GPTI** (ação 6) | — (proposta) | Escopo: retira 19 pacotes do M2 e muda o termo (M2 "backend próprio") / Prazo: o M2 volta à semana 12, no limite / Custo: −84,25 h de trabalho restante | **A pedir** | Ver DEC-5, com pré-condição e ponto de controle. |

**Total fora da EAP: 22,5 h (R$ 424,04)**, 33% do CR da PSW. Nenhuma dessas horas gera valor agregado, e todas saíram da mesma capacidade que faltou para os aceites.

Não se identificou trabalho novo fora da EAP depois de 06/10, porque não houve commit.

---

## 11. Decisões pedidas ao patrocinador

**Situação:** prazo fixo (M2 em 10/11 e aceite em 30/11), 5 h por semana fixas e PSW com duas pessoas. Pela aula 9, a alavanca que resta é o **escopo, por mudança aprovada**. Hora extra não é resposta disponível (plano 6.3.3: "Continuar sem cortar, pedindo hora extra, não é resposta disponível").

**Base comum das contas:**

- **restante da PSW:** 108,75 h (ONT − VA, pelo plano);
- **capacidade nominal até 10/11:** 18 h (teto de 20 h);
- **capacidade efetiva:** 9 h, se a semana 11 não for usada.

### DEC-5 (nova e central): escopo e prazo do M2

| Opção | O que muda | Efeito em horas da PSW | Resultado |
|---|---|---|---|
| **A** — manter escopo e data | Nada | 108,75 h restantes contra 18 h: **faltam 90,75 h** (120,9 h pela previsão com IDC) | **Inviável.** O M2 previsto fica na semana 22. |
| **B** — resposta do plano 6.3.3 (feed e materiais só com o cadastro básico) | Corta o restante de D06 (5 h), o restante de D08 (5 h) e as APIs de publicações e de materiais em D12 (2 × 2,5 h = 5 h) | **−15 h**: restam 93,75 h, e **faltam 75,75 h** | **Insuficiente** sozinha. |
| **C** — M2 = fluxo de compra correto sobre a API local (MUD-01 e MUD-06) | **Fica:** D04, regras de preço, compra única, divisão e avaliação (6,75 h); D07, preço válido e retirada (5 h); D09, recusa, estante, avaliação e vendas (5,25 h); D10, teste e demonstração (7,5 h). Total: 24,5 h. **Sai:** os restantes de D01 (6,75 h), D02 (6,75 h), D03 (6,75 h), D06 (5 h) e D08 (5 h), e D11 a D18 (54 h). **A GPTI assume até 6 h de D10** (dados e casos de teste, roteiro e registro da demonstração), que é o apoio técnico máximo do plano (5.3 e 6.3.3). | **−84,25 h.** Restam 24,5 h, das quais **18,5 h são da PSW**. **Pelo plano, cabe só no teto de 20 h e só usando a semana 11**; contra as 18 h nominais, faltam 0,5 h. Com só a semana 12 (9 a 10 h), não cabe. Pelo IDC atual (18,5 ÷ 0,78 ≈ 23,6 h), não cabe. | **No limite, com risco alto.** Preserva o núcleo da declaração do escopo (encontrar, comprar com pagamento simulado, ver na estante, avaliar, e vendas com 85/15). Deixa de fora o backend próprio, previsto no termo para o M2. |
| **D** — manter o escopo e mover a data (prazo flexível) | Nova linha de base de prazo | 108,75 h a 9 h por semana: M2 no fim da **semana 22** (+10 semanas; cerca de 19/01/2027, sem recesso) | Fora do calendário letivo. Na prática, inviável. |
| **E** — encerramento antecipado (termo de abertura, seção 6) | Para o desenvolvimento. O M1 é registrado com limitações, e 1.5 e 1.6 vão para pendências futuras. | PSW: 0 h. GPTI: G12 antecipado (12 h). | Previsto no termo quando "a demonstração do fluxo de compra não cabe nas 18 h de programação reservadas e o patrocinador não aprova um corte de escopo". As "18 h" do termo são a contingência de programação, que hoje é de 2 h (seção 9.3). |

**Recomendação da equipe GPTI: opção C, com duas pré-condições e uma saída definida.**

1. **Pré-condição (até 05/11):** o professor confirma que a disciplina de PSW aceita o M2 sobre a API local, sem Express e MongoDB. Se não aceitar, a opção C não serve, e restam a combinação B + D ou a opção E.
2. **Ponto de controle em 06/11:** a PSW apresenta um commit com o critério geral de aceite do plano funcionando: recusa de pagamento, bloqueio de compra repetida e divisão que soma o preço (Q-04, Q-05 e Q-06).
3. **Se o ponto de controle falhar,** a recomendação passa a ser a **opção E**.

**Dentro da opção C, a ordem de corte, se as horas não bastarem, é:**

- primeiro a avaliação (REQ-06);
- depois a retirada de aula (parte de D07).

O critério geral de aceite é preservado sempre. A PSW deve detalhar por atividade as 20 h que indicou (ação 1).

**Por que não a opção E já:** ela encerra o projeto sem demonstrar o fluxo de compra, que é o núcleo da declaração do escopo. A opção C ainda tem uma chance, pequena, se a PSW usar a semana 11. O ponto de controle limita a exposição a uma semana.

### Decisões do SR1 que continuam pendentes, com efeito em horas

| ID | Decisão | Opções e efeito em horas | Recomendação no SR1 | **Recomendação agora** e motivo da mudança | Prazo |
|---|---|---|---|---|---|
| DEC-1 | Aceite do M1 | (a) aceitar: 0 h, mas viola o critério geral de aceite (compra repetida e soma das partes). (b) recusar e exigir correção antes de D11: 27,75 h (D06–D10) antes de liberar a D11, com o M2 na semana 22. (c) aceitar com as limitações Q-01 a Q-17 registradas: libera a rede, e as correções do fluxo de compra vão para o M2. | (b) recusar | **(c), se DEC-5 = C; senão, (b). Mudou:** com a opção C, as correções do fluxo de compra passam a ser o próprio M2, e manter o M1 recusado só bloquearia a rede sem ganho. | 05/11 |
| DEC-2 | MUD-01 (JSON Server) | (a) voltar a `src/mocks`: cerca de 8 h de retrabalho da PSW sem valor novo. (b) aprovar a API local no M1: 0 h de PSW e cerca de 1 h de GPTI para reescrever o aceite de 1.3.4, 1.3.7 e 1.4.7. A carga reproduzível (Q-12) ainda pede um comando de restauração, que a PSW não estimou. | Não recomendava (b) sem o pedido escrito da PSW | **(b). Mudou:** a avaliação da AV1 mostrou que o M1 da disciplina de PSW usa o JSON Server (seção 10.2). | 05/11 |
| DEC-3 | MUD-02 a MUD-05 | (a) retirar da demonstração: horas de retirada não estimadas. (b) não aprovar e manter como está, fora do aceite: 0 h. (c) aprovar: exigiria aceite e teste novos, sem capacidade. | (b), tirando a moderação do caminho da publicação | **(b). Sem mudança.** Na opção C, o feed sai do M2, e a moderação deixa de bloquear o aceite. | 05/11 |
| DEC-4 | Saída do Kauã | (a) redistribuir as células e o A dos 14 pacotes entre Letícia e Maria Clara: **não cria capacidade** (9 h por semana). (b) reduzir escopo: vira a DEC-5. | (b), se a capacidade caísse para duas pessoas | **(a) + (b). Mudou:** a saída foi confirmada, e os pacotes precisam de dono mesmo se forem para pendências. O A dos pacotes de 1.3 e 1.6 passa à Letícia; o de 1.5.3, 1.5.8, 1.5.9 e 1.5.10, à Maria Clara (A de 1.5). | 03/11, na reunião conjunta |

---

## 12. Próximas ações

| # | Ação | Responsável | Prazo |
|---|---|---|---|
| 1 | Seguir a validação das 68 h reconstituídas com a Letícia e a Maria Clara, em acompanhamento contínuo nas reuniões conjuntas. Pedir quem fez cada atividade, em que semana, como as 20 h indicadas se distribuem por atividade e onde ficam as 2,5 h de D10 | Gabriel, com Letícia e Maria Clara | 06/11 |
| 2 | Ponto de controle da opção C: verificar o commit da PSW com recusa de pagamento, bloqueio de compra repetida e soma correta da divisão | Matheus, Gabriel e Guilherme | 06/11 |
| 3 | Implantar o apontamento semanal dos dois grupos na [planilha combinada](../status-report-1/apontamento-de-horas.csv), com conferência na reunião conjunta | Matheus e Letícia | 03/11 |
| 4 | Recalcular CR, IDC, ENT e EPT se a validação da ação 1 mudar as 68 h | Gabriel | 08/11 |
| 5 | Redigir, com a Letícia, a solicitação de mudança MUD-01, citando a avaliação da AV1 e a decisão da seção 9 do plano que ela reverte, e a proposta de reescrita do aceite de 1.3.4, 1.3.7 e 1.4.7 | Gabriel (A de 1.1.2) | 05/11 |
| 6 | Redigir a MUD-06 (redefinição do M2, opção C) com o efeito em escopo, prazo e custo | Matheus | 05/11 |
| 7 | Confirmar com o professor o que a disciplina de PSW exige no M2 (pré-condição da opção C) | Matheus | 05/11 |
| 8 | Levar DEC-1 a DEC-5 ao patrocinador por escrito, sem esperar 09/11 (plano 5.1 e gatilho de RG05) | Guilherme prepara; Matheus responde | 05/11 |
| 9 | Redistribuir as células e o A dos pacotes do Kauã, conforme DEC-4 | Matheus com a Letícia | 03/11 |
| 10 | A PSW informa o que fez nas semanas 9 e 10 e o que entrega até 10/11 (Q-21) | Letícia | 03/11 |
| 11 | Preparar os dados e casos de teste do fluxo de compra (aprovado, recusado, repetida, própria aula e preço de R$ 29,99) e o roteiro da demonstração, como apoio da GPTI (até 6 h; RT02, plano 6.3.3) | Guilherme (A de 1.7) | 06/11 |
| 12 | Registrar o aceite ou a recusa do M1 (1.1.3) assim que DEC-1 sair | Guilherme | Data da decisão |
| 13 | Nova verificação, com o roteiro do SR1, sobre o commit que a PSW indicar para o M2 | Guilherme, Matheus e Gabriel | 10/11 |
| 14 | Status Report 3 (riscos, partes interessadas, verificação do M2 e primeira semana medida) | Guilherme | 16/11 |

---

## Anexo A — Reconstituição das horas (CR)

### A.1 Por que o CR é reconstituído e quem o fez

O SR1 combinou um método: cada aluno informaria as próprias horas por atividade e por semana (D01–D18 e G01–G12), com as semanas 1 a 8 lançadas numa reunião de 15 minutos conduzida por Matheus e Letícia (plano 7.4). **O método não foi seguido.** A reunião não aconteceu, e nenhum dos dois grupos apontou semana a semana.

- **PSW:** **as horas foram reconstituídas pela GPTI**, a partir do repositório. Nas semanas 1 a 8 houve desenvolvimento, mas a PSW não informou horas; nas semanas 9 e 10 não houve desenvolvimento, e por isso não há horas a informar. Os valores estão **em validação com a Letícia e a Maria Clara**, num acompanhamento contínuo, e qualquer ajuste entra no SR3.
- **GPTI:** os integrantes **registraram as horas por atividade depois do fato e as conferiram** (A.4).

Para a PSW, havia três caminhos: não informar custo, usar o planejado como gasto ou reconstituir pelo que foi entregue. A equipe GPTI escolheu o terceiro.

- **Não informar custo** deixaria o relatório sem IDC, ENT e EPT, que o enunciado exige.
- **Usar o planejado como gasto** daria IDC = IDP e esconderia o trabalho fora da EAP, que existe e é visível no repositório.
- **Reconstituir pelo entregável** liga cada hora a uma evidência no repositório, que a PSW pode conferir linha por linha.

**Histórico da reconstituição da PSW:**

1. **Primeira versão (02/11/2026): 97,5 h**, pelas referências de esforço do plano (seção 6.2.1).
2. **Segunda versão (02/11/2026): 68 h**, com referências revisadas para baixo (A.2) e valores adotados por atividade (A.3). **Esse é o CR da PSW usado no relatório.** A primeira versão continua na sensibilidade (seção 8.3).

### A.2 Regras e referências

1. **Só recebe hora o que foi feito e está no repositório**, no commit `9e857eb`. O que não foi feito (banco de dados, backend Express, APIs próprias, integrações do M2 e testes) tem **CR = 0**. Não há como apontar tempo para o que não foi executado, e esse trabalho continua inteiro no esforço restante.
2. **Referências de esforço:**

   | Ref. | Entregável | Primeira versão (plano 6.2.1) | **Revisada (segunda versão)** |
   |---|---|---:|---:|
   | R1 | Cadastro de uma tela com validação | 11 h | **4 h** |
   | R2 | Catálogo e detalhe | 6 h | **3 h** |
   | R2 | Compra, pagamento e estante | 10 h | **3 h** |
   | R2 | Avaliação e vendas | 6 h | **3 h** |
   | R3 | Cada item de base técnica (por exemplo, login simulado) | 3 h | **1 h** |
   | R5 | Trocar os dados simulados por uma API | 10 h | **10 h** |

3. **A revisão das referências não é mudança de linha de base.** O ONT (162 h da PSW) e o VP não mudam. Muda só o método de reconstituir o CR, que não foi medido. As referências do plano estimam o esforço de um pacote inteiro, com aceite, para quem está aprendendo React. As revisadas estimam o esforço do que se observa entregue, que na maior parte não passou no aceite. Como a escolha muda o IDC (de 0,55 para 0,78), **os dois CR aparecem na seção 8.3**, e a conclusão sobre capacidade não depende de qual se usa.
4. **Fração entregue:** quando o entregável está incompleto, a referência é multiplicada pela fração de itens do aceite que se observam entregues no SR1. Exemplo: em 1.4.1, 4 de 6 operações dão 4 h × 4/6.
5. **Valor adotado:** o valor de cada atividade é o da coluna "Valor adotado" da A.3. Onde ele difere da conta pela referência revisada, a diferença está registrada na tabela e faz parte da validação com a PSW.
6. **Semanas 9 e 10 da PSW:** 0 h, lançadas pela GPTI. Não houve entrega nem commit.
7. **Kauã:** 0 h em todas as semanas. Não há nenhum commit dele, e o README da entrega diz que as tentativas de contato não tiveram retorno.
8. **Esforço restante indicado pela PSW:** 20 h no total. Não vem por atividade e coincide com o teto de capacidade (seção 8.2).

### A.3 Horas por atividade — PSW (reconstituídas pela GPTI em 02/11/2026; em validação com a PSW)

| Atividade | O que se observa no repositório (evidência) | Primeira versão (referências do plano) | Conta pela referência revisada | **Valor adotado** |
|---|---|---:|---:|---:|
| D01 — escopo, atores e casos de uso | `DocumentacaoFioAFio.md`: 30 casos de uso e 7 entidades; sem contrato | 13,5 h | sem referência revisada (R4 não revisada) | **6 h** |
| D02 — navegação e protótipos de tela | Protótipo de telas anterior ao repositório e navegação em React | 6 h | sem referência revisada | **6 h** |
| D03 — modelo de dados, mocks, cadastro e login simulados | 9 módulos em `src/mocks` (1.3.4), cadastro e login (1.3.5) e perfil editável (1.3.7, metade) | 7,5 h | 1 + 1 + 0,5 = 2,5 h | **5 h** |
| D04 — regras em JavaScript | Só a divisão 85/15 no checkout, com erro de soma (1 de 4 regras) | 3,5 h | sem referência; 13,5 × 1/4 = 3,4 h pelo planejado | **2 h** |
| D05 — base React, rotas, identidade visual e componentes | Vite, Router, Tailwind, logo, 13 componentes de interface e 5 de layout (1.3.1 passou) | 6 h | 2 itens × 1 = 2 h | **5 h** |
| D06 — publicações | Criar, consultar, curtir e comentar (4 de 6 operações de 1.4.1) | 7,5 h | 4 × 4/6 = 2,7 h | **3 h** |
| D07 — vídeo-aulas da criadora | Cadastrar, consultar e editar (3 de 5 itens de 1.4.2) | 6,5 h | 4 × 3/5 = 2,4 h | **3 h** |
| D08 — materiais | Lista e detalhe, filtro por categoria (1 de 4 itens de 1.4.3) | 3 h | 4 × 1/4 = 1 h | **3 h** |
| D09 — catálogo, compra, pagamento, estante, avaliação e vendas | Catálogo e detalhe (passou), compra e estante (2,5 de 4), simulador (1/2) e avaliação e vendas (2 de 4) | 17 h | 3 + 1,9 + 0,5 + 1,5 = 6,9 h | **10 h** |
| D10 — testes, correções e demonstração do M1 | Sem teste e sem registro de demonstração; o commit de 06/10 é da MUD-01 | 2,5 h | sem saída verificável | **2,5 h** (classificação em validação) |
| D11–D18 | Nada feito | 0 h | 0 h | **0 h** |
| **Subtotal na EAP** |  | 73 h |  | **45,5 h** |
| MUD-01 — JSON Server | Pasta `backend/`, `services/api.js` e troca da fonte de dados (62 arquivos) | 10 h | R5 = 10 h | **8 h** |
| MUD-02 — administração e moderação | 7 telas de administração (708 linhas) | 6,5 h | mantida a conta da primeira versão (106 linhas por hora) | **6,5 h** |
| MUD-03 — chat | Tela e contextos de chat (380 linhas) | 3,5 h | idem | **3,5 h** |
| MUD-04 — stories | Criação e exibição de stories (381 linhas) | 3,5 h | idem | **3,5 h** |
| MUD-05 — pesquisa ampla e seguir | Tela de pesquisa (117 linhas) | 1 h | idem | **1 h** |
| **Subtotal fora da EAP** |  | 24,5 h |  | **22,5 h** |
| Semanas 9 e 10 (13/10 a 27/10) | Nenhum commit; linhas de 0 h lançadas pela GPTI | 0 h | 0 h | **0 h** |
| **Total PSW** |  | 97,5 h |  | **68 h** |

**Divisão por pessoa (premissa):** 68 h ÷ 2 = **34 h para a Letícia e 34 h para a Maria Clara**; Kauã, 0 h. A GPTI **não** dividiu pela autoria dos commits, porque o primeiro commit (22/09, 5.173 linhas, da Letícia) concentra trabalho anterior ao repositório e não mostra quem fez cada parte. As horas estão na [planilha combinada](../status-report-1/apontamento-de-horas.csv), uma linha por aluna e por atividade, com "reconstituída" na observação. A semana de cada linha é a janela do plano, porque não foi informada.

### A.4 Horas por atividade — GPTI (registradas por atividade depois do fato e conferidas pelos integrantes)

**Como as horas da GPTI foram obtidas.** Cada integrante registrou as horas de cada atividade, G01 a G10, depois do fato, e conferiu as próprias linhas. **Não houve anotação semana a semana desde a semana 4.** A semana de cada linha é a da atividade no plano. G05, G09 e G10 foram registradas a partir do plano e da referência pelo entregável (plano 6.2.1):

- **G05:** o planejado, 4 h;
- **G09:** 6 h de status mais 2 h do roteiro de verificação (40 minutos × 3 pessoas);
- **G10:** metade da referência de status, até 02/11.

| Atividade | Semana | Entregável | Horas | Divisão pelas células da seção 5.6 |
|---|---|---|---:|---|
| G01 | S4 | Caso de negócio | 6 h | Matheus 6 |
| G02 | S4 | Termo de abertura | 6 h | Gabriel 6 |
| G03 | S4 | Partes interessadas e riscos iniciais | 6 h | Guilherme 6 |
| G04 | S5 | Escopo, EAP e dicionário | 6 h | Matheus 3 e Gabriel 3 |
| G05 | S5 | Requisitos, mudanças e responsabilidades | 4 h | Guilherme 4 |
| G06 | S6 | Cronograma | 10 h | 3,33 cada |
| G07 | S7 | Orçamento e riscos | 10 h | 3,33 cada |
| G08 | S8 | Revisão e entrega da AV1 | 6 h | 2 cada |
| G09 | S9 | Verificação do M1 e Status Report 1 | 8 h | 2,67 cada |
| **Subtotal medido (S4–S9)** |  |  | **62 h** | Matheus 20,33; Gabriel 20,33; Guilherme 21,33 |
| G10 | S10 (em curso) | Status Report 2, até 02/11 | 3 h | 1 cada; fora da medição (seção 1) |
| **Total registrado** |  |  | **65 h** |  |

As linhas estão na [planilha combinada](../status-report-1/apontamento-de-horas.csv) e no extrato [`apontamento-de-horas-gpti.csv`](apontamento-de-horas-gpti.csv). Em G06, G07 e G09, a planilha mostra 3,33 h e 2,67 h por pessoa, arredondadas; a soma exata é 10 h, 10 h e 8 h.

### A.5 Limitações declaradas

- O CR não foi medido semana a semana em nenhum dos dois grupos.
- As horas da PSW foram reconstituídas pela GPTI depois do fato e estão em validação com a Letícia e a Maria Clara. Faltam a divisão por pessoa, a semana de cada atividade e a classificação das 2,5 h de D10.
- A troca das referências do plano pelas revisadas muda o IDC da PSW de 0,55 para 0,78. Os dois cenários estão na seção 8.3.
- O esforço restante indicado pela PSW (20 h) não vem por atividade e coincide com o teto de capacidade. Não é usado como previsão.
- A contagem de itens entregues usa o resultado do SR1, conferido pelos três integrantes da GPTI.

---

## Anexo B — Memória de cálculo

- **Taxa-sombra:** R$ 2.450 ÷ (30 × 52 ÷ 12) = R$ 18,8461538 por hora (plano 6.1). Os valores em reais são as horas × a taxa não arredondada.
- **ONT:** 270 h = R$ 5.088,46 (atividades). A linha de base de custos, com a contingência, é de 314 h = R$ 5.917,69. O orçamento total, com a reserva gerencial, é de R$ 6.331,93.
- **Janela de medição:** até a última semana fechada de cada grupo: PSW S10 (27/10) e GPTI S9 (26/10) (seção 1).
- **VP:** soma das horas das semanas fechadas, pela alocação das seções 5.5 e 5.6.
- **VA:** ONT da atividade × crédito pela regra 50/50 (seção 6.1).
- **CR:** Anexo A.
- **VPr = VA − VP; VC = VA − CR; IDP = VA ÷ VP; IDC = VA ÷ CR** (aula 9).
- **ENT = ONT ÷ IDC** (principal, por grupo; o total é a soma das partes) e **ENT = CR + (ONT − VA)** (alternativa). **EPT = ENT − CR; VNT = ONT − ENT; IDPT = (ONT − VA) ÷ (ONT − CR)** (aula 9).
- **Data do M2:** rede da seção 5.2 do plano, nivelada em 9 h por semana a partir da semana 12 (seção 5.2). A data de calendário é a semana N = 10/11/2026 + 7 × (N − 12) dias, **sem recesso, feriado nem fim do período letivo**.
- **Capacidade:** pessoas ativas × 4,5 h (PSW) ou 4 h (GPTI) × semanas até o marco. O teto da premissa é de 5 h por pessoa por semana (plano 5.1 e 8).
- As contas foram refeitas por script e conferem com as tabelas. Diferenças de centavos vêm de arredondamento.

## Anexo C — Registro de uso de IA neste relatório

| Campo | Conteúdo |
|---|---|
| Data | 02/11/2026 |
| Ferramenta | Claude (Claude Code) |
| Quem usou | Gabriel Barretto Galdino dos Santos |
| Para quê | Apoio de revisão e de produção textual: ler o repositório da PSW e conferir a ausência de commits depois de 06/10, resumir os artefatos da AV1 e do SR1 e os slides das aulas, montar e formatar as tabelas, conferir fórmulas e refazer as contas por script (VP, VA, CR, índices, previsões e nivelamento da rede) e redigir o texto a partir das decisões do grupo. |
| O que foi enviado | Código e documentação do repositório, artefatos da GPTI, slides das aulas 1 a 9 e o texto da avaliação da AV1. Nenhum dado pessoal real. |
| O que o grupo decidiu, e não a IA | **Toda a parte estratégica e de gestão:** a regra de crédito (50/50); a leitura de D01 e D10 pelo dicionário; a convenção de semana; a revisão das referências de esforço e as 68 h reconstituídas da PSW (em validação com a PSW); as horas da GPTI, registradas por atividade e conferidas pelos integrantes; a leitura dos índices; a cor de cada dimensão; as recomendações das seções 10 e 11, incluindo a opção C da DEC-5, as pré-condições e o ponto de controle; e as próximas ações. A IA não decidiu nenhuma recomendação, regra ou aceite. |
| Como foi verificado | O grupo revisou o texto e as tabelas em várias rodadas, incluindo uma revisão crítica de um colega, que levou às correções desta versão (por exemplo, D10 a 0%, D01 a 50%, a convenção de semana única e os dois cenários de CR). O grupo conferiu as somas das seções 6.4, 7, 8 e 9 a partir das tabelas, e as contas também foram refeitas por script e conferem com o texto. |
| Responsabilidade | O grupo responde pelo conteúdo final. |

## Referências

- [Plano de projeto v1.0](../plano-de-projeto.md): seções 3, 4, 5.1, 5.1.1, 5.1.2, 5.2, 5.3, 5.4, 5.4.1, 5.5, 5.6, 5.7, 6.1, 6.2.1, 6.3.2, 6.3.3, 6.4, 7.4, 8 e 9.
- [Dicionário da EAP v1.0](../dicionario-eap.md).
- [Termo de abertura](../termo-de-abertura.md): seção 5 (marcos) e seção 6 (critérios de encerramento e cancelamento).
- [Status Report 1](../status-report-1/status-report-1.md), [registro de questões](../status-report-1/registro-de-questoes.md), [registro de mudanças](../status-report-1/registro-de-mudancas.md) e [apontamento de horas](../status-report-1/apontamento-de-horas.md).
- Avaliação da AV1 de GPTI (Grupo G, 97/100), texto recebido do patrocinador.
- MENDONÇA, D. S. Gerenciamento de Projetos de TI, aula 8 (Mobilizar a equipe e executar o trabalho) e aula 9 (Controlar prazo e custo com valor agregado). CEFET/RJ, 2026.
- PROJECT MANAGEMENT INSTITUTE. *Guia PMBOK*. 8. ed. Newtown Square: PMI, 2025 (citado nas aulas 8 e 9: Tabela 2-1, Tabela 5-1, §2.1.6.7, §2.1.6.8, §2.3.2.3 e §2.6.2.5).
