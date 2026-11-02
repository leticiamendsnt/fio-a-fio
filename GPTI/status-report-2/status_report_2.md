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

> **⚠ Observação obrigatória sobre as horas (leia antes dos números).**
> **A PSW não informou horas, e as duas coisas estão ligadas: depois do M1 (06/10), a PSW não desenvolveu nada, e sem desenvolvimento não houve o que apontar.** A planilha combinada no Status Report 1 ficou sem nenhuma linha da PSW até a data de status. Por isso, o CR da PSW **não foi medido diretamente**: adota-se como **cenário principal e reprodutível** o valor de **97,5 h** (calculado diretamente pelas regras de referência da linha de base), mantendo o cenário de **68 h** em validação/ajuste contínuo com a Letícia e a Maria Clara. Os valores podem mudar nas próximas reuniões conjuntas, e qualquer ajuste entra no Status Report 3.
> - **PSW, semanas 1 a 10:** **68 h (em validação)** ou **97,5 h (reprodutível)**. São 45,5 h em atividades da EAP e 22,5 h fora dela no cenário de 68 h. As semanas 9 e 10 têm 0 h, porque não houve entrega. A PSW indicou **20 h de esforço restante** para passar nos critérios de aceite pendentes até 10/11, sem detalhar por atividade.
> - **GPTI, semanas 4 a 10:** **65 h**, na [planilha da GPTI](apontamento-de-horas-gpti.csv). As horas da GPTI foram **registradas por atividade e conferidas pelos integrantes**: cada um lançou as horas de cada atividade G01 a G10 e conferiu as próprias linhas.
> - **Kauã:** 0 h. Não há commit dele nem retorno de contato.
>
> O método da reconstituição das horas da PSW está no **[Anexo A](#anexo-a--reconstituição-das-horas-cr)** e no **[README desta pasta](README.md)**. **A conclusão sobre capacidade não depende do CR:** pelo plano, faltam 98,25 h de trabalho da PSW, contra 18 h de capacidade até o M2 (seção 8.3).

---

## 0. Respostas às três perguntas

| Pergunta | Resposta | Número | De onde vem |
|---|---|---|---|
| **1. O caminho crítico ainda entrega o marco 2 na data planejada?** | **Não.** | M2 previsto para o **fim da semana 21 de PSW**, contra a semana 12 (10/11). São **9 semanas de atraso**, e o calendário do projeto não tem semana 13. | Seção 5: rede da seção 5.2 do plano, com o esforço restante nivelado na capacidade real de 9 h/semana (duas pessoas). O M1 continua sem aceite. D11, primeira atividade crítica depois do M1, estava prevista para 13/10 e não começou. |
| **2. O valor agregado mostra trabalho feito no ritmo e no custo planejados?** | **No ritmo, não.** No custo por hora, quase: o IDC fica dentro do limite de 10%, mas com ressalva. | PSW: **IDP 0,47** e **IDC 0,94** (no cenário 68 h) ou **0,65** (no cenário 97,5 h). GPTI: IDP 1,08 e IDC 1,20 (com a ressalva de G05/G09/G10). Total: IDP 0,68 e IDC 1,07. | Seções 6 e 7. Regra de crédito 50/50. A PSW agregou 63,75 h dos 135 h planejados até 02/11. Um terço das horas da PSW foi para trabalho fora da EAP, que não gera valor. |
| **3. As horas que faltam cabem na capacidade que resta até o marco 2?** | **PSW: não**, para o escopo da linha de base. Só cabe com o corte de escopo da opção C. **GPTI: sim.** | **PSW:** restam **98,25 h** pelo plano (ONT 162 − VA 63,75) ou **104,8 h** pela previsão (ENT 172,8 − CR 68). A capacidade é de **18 h** (2 pessoas × 4,5 h × 2 semanas; teto de 20 h a 5 h/semana). **Faltam de 80,25 h a 86,8 h.** A reestimativa da própria PSW é de **20 h** até 10/11: cobre só os aceites pendentes, sem o backend (D11–D18, 54 h), e só cabe no teto de 20 h. **GPTI:** restam **30 h** pelo plano (108 − 78) ou 25 h pela previsão, contra **36 h** (3 pessoas × 4 h × 3 semanas; teto de 45 h). **Sobram de 6 h a 11 h.** | Seções 8.2, 9.1 e 9.2. Semanas restantes: PSW 11 e 12 (até 10/11); GPTI 10, 11 e 12 (até 30/11). Kauã: 0 h. |

**Decisão central pedida ao patrocinador (DEC-5, seção 11):** com prazo fixo e 5 h/semana fixas, a única alavanca que resta é o **escopo**, por mudança aprovada. A equipe GPTI recomenda a **opção C**: concentrar o M2 no fluxo de compra correto sobre a API local, o que reduz o restante de 98,25 h para 20,75 h. Pelo plano, ela cabe no limite da capacidade. A reestimativa da própria PSW (20 h) cai no teto de 20 h. A decisão é do patrocinador.

---

## 1. Data de status e período coberto

| Item | Valor |
|---|---|
| **Data de status** | **02/11/2026.** Os números deste relatório valem até esse dia. Não houve aula nesse dia (plano, seção 5.1). |
| Período coberto por este relatório | **07/10/2026 a 02/11/2026**, depois da data de status do Status Report 1 (06/10). Os valores de VP, VA e CR são **acumulados desde o início do projeto** (03/08/2026). |
| Semanas letivas no período | PSW: semanas 9 (aula de 13/10) e 10 (aula de 27/10). GPTI: semana 9 (aula de 26/10) e parte da semana 10 (aula em 09/11). |
| Repositório verificado | [github.com/leticiamendsnt/fio-a-fio](https://github.com/leticiamendsnt/fio-a-fio). `git fetch` e `git ls-remote` em 02/11/2026: **nenhum commit novo em nenhuma branch depois de 06/10/2026.** A `develop` continua em `9e857eb`, o mesmo commit verificado no Status Report 1. |
| Medição do CR | **PSW:** o CR foi estabelecido em **97,5 h (cenário principal reprodutível)** e **68 h (cenário em validação)** com Letícia e Maria Clara. **GPTI:** semanas 4 a 10, 65 h ([planilha da GPTI](apontamento-de-horas-gpti.csv)), confirmadas pelos integrantes. |
| Marco avaliado | **M2 — Sistema integrado ao backend próprio**: PSW em 10/11/2026 (semana 12); aceite de GPTI em 30/11/2026 |

---

## 2. Situação geral

| Dimensão | Cor | Número | Justificativa |
|---|---|---|---|
| **Escopo** | 🔴 **Vermelho** | **3 de 13** pacotes do M1 passaram (23%). **0 de 19** pacotes do M2 começaram. **5** mudanças sem decisão. | Não houve commit depois de 06/10; nenhuma das 17 questões do SR1 foi corrigida. Os pacotes de backend e integração não têm evidência. |
| **Prazo** | 🔴 **Vermelho** | M2 previsto para a **semana 21**, contra a 12: **+9 semanas**. IDP da PSW **0,47**: variação de prazo de 53%. | M1 segue sem aceite e atividades críticas D11 e D13 não começaram. |
| **Custo** | 🟡 **Amarelo** | IDC da PSW **0,94** (ou **0,55** / **0,78** dependendo do cenário de CR). ENT da PSW **172,8 h**, contra ONT de 162 h. | Dentro do limite com alerta: 22,5 h foram fora da EAP. Com qualquer cálculo de CR o custo indica desvio/alerta vermelho de execução. |
| **Geral** | 🔴 **Vermelho** | **M2 fora do calendário. A PSW precisa de 80 h a 87 h além da capacidade.** | Exige redefinição de escopo via DEC-5. |

---

## 3. Escopo desde o Status Report 1

### 3.1 Pacotes do M1
Mantidos exatamente como em 06/10: 3 verificados (1.3.1, 1.3.5, 1.4.4), 9 pendentes (1.3.4, 1.3.6, 1.3.7, 1.4.1 a 1.4.3, 1.4.5 a 1.4.7) e 1 não demonstrado (1.4.8).

### 3.2 Pacotes de gestão e requisitos (1.1 e 1.2)
- **1.2.1 Escopo funcional:** Passou.
- **1.2.2 Atores e perfis:** Falhou (dá suporte técnico para classificar a atividade D01 em 50% de valor agregado segundo o dicionário).
- **1.2.3 Modelo e contratos:** Falhou.
- **1.2.6 Navegação:** Não verificado.

---

## 4. Cronograma

*Premissa de Nivelamento:* As alocações e células entre os membros da equipe de desenvolvimento são consideradas **intercambiáveis**, permitindo que uma integrante absorva até 5 h numa semana de maior pico (ex: D06).

### 4.1 Atividades de produto — PSW

| ID | Atividade | Responsável (células da seção 5.5) | Início plan. | Fim plan. | Início real | Fim real | Duração restante | Situação |
|---|---|---|---|---|---|---|---:|---|
| D01 | Detalhar escopo, atores, casos de uso e critérios de aceite | Letícia, Maria Clara e Kauã¹ | S1 · 04/08 | S1 · 04/08 | sem registro | ≤ 22/09 | 0 sem. (0 h) | **Concluída** (1.2.1 passou; 1.2.2 fundamenta 50% de VA) |
| D02 | Navegação, HTML/CSS e protótipos das telas | Letícia, Maria Clara e Kauã¹ | S2 · 18/08 | S2 · 18/08 | sem registro | — | 1 sem. (6,75 h) | **Em andamento, atrasada** |
| D03 | Modelo de domínio, contratos e dados dos mocks | Letícia, Maria Clara e Kauã¹ | S3 · 25/08 | S3 · 25/08 | sem registro | — | 1 sem. (6,75 h) | **Em andamento, atrasada** |
| D04 | Regras e validações em JavaScript | Letícia, Maria Clara e Kauã¹ | S4 · 01/09 | S4 · 01/09 | sem registro | — | 1 sem. (6,75 h) | **Em andamento, atrasada** (Essencial na Opção C) |
| D05 | Aplicação React, rotas, identidade visual e componentes | Letícia, Maria Clara e Kauã¹ | S5 · 08/09 | S5 · 08/09 | ≤ 22/09 | 22/09 | 0 sem. (0 h) | **Concluída** (1.3.1 passou) |
| D06 | Frontend de publicações, curtida e comentário | **Letícia** | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 | — | 2 sem. (5 h) | **Em andamento, atrasada** |
| D07 | Frontend de vídeo-aulas da criadora | **Maria Clara** | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 | — | 2 sem. (5 h) | **Em andamento, atrasada** |
| D08 | Frontend de materiais gratuitos | **Kauã¹ — sem dono** (DEC-4) | S5 · 08/09 | S7 · 22/09 | ≤ 22/09 | — | 2 sem. (5 h) | **Em andamento, atrasada** |
| D09 | Catálogo, detalhe, compra, pagamento, estante e vendas | Letícia, Maria Clara, Kauã¹ | S7 · 22/09 | S8 · 06/10 | ≤ 22/09 | — | 1 sem. (5,25 h) | **Em andamento, atrasada** |
| D10 | Testar, corrigir e demonstrar o M1 | Letícia, Maria Clara, Kauã¹ | S8 · 06/10 | S8 · 06/10 | 06/10 | — | 1 sem. (3,75 h) | **Em andamento, atrasada** |
| D11 a D18 | Backend Express, MongoDB, APIs e Integração | Letícia, Maria Clara, Kauã¹ | S9 a S12 | S12 | — | — | 7 sem. (54 h) | **Não iniciadas** |

¹ Célula do Kauã, que saiu da equipe.

### 4.2 Atividades de gerenciamento — GPTI
G01 a G09 concluídas. G10 em andamento com esforço restante de 6 h (2 h por integrante), alinhado ao CSV de apontamento.

---

## 5. Caminho crítico atualizado e data prevista do marco 2

### 5.1 O caminho crítico
Linha de base: D01 → D02 → D03 → D04 → D05 → D06–D08 → D09 → D10 → M1 → D11 → D13 → D16 → D18 → M2.

### 5.2 Previsão pela rede e conferência por esforço
- **Conferência por esforço restante total:** 
  $$\text{Semanas necessárias} = \frac{108,75\text{ h}}{9\text{ h/semana}} = 12,08\text{ semanas}$$
  A partir da **S12**, 12,1 semanas levam ao fim da **S24** (e não S23).
- **Impacto de D01, D02 e D04:** A data do M2 (S22 no cronograma nivelado simples) deixaria de fora 20,25 h referentes a D01, D02 e D04. Como **D04 (regras de compra)** é essencial para a **Opção C**, a sua inclusão eleva o término previsto para a S24.

---

## 6. Valor agregado por atividade

### 6.1 Regra de crédito
Regra 50/50 mantida para atividades em andamento. D01 recebe 50% de crédito com base na ausência das verificações do pacote 1.2.2.

### 6.2 Tabela de valor agregado e ressalva do IDC da GPTI
- **Ressalva do IDC da GPTI (1,20 / 1,16):** O IDC da GPTI decorre do lançamento do planejado em G05 e de referências de G09/G10. **Não deve ser utilizado isoladamente como evidência de economia de custo.**

---

## 7. Variações e índices

| Grupo | VP (h) | VA (h) | CR (h) | IDP | IDC |
|---|---:|---:|---:|---|---|
| **PSW (Cenário 68 h)** | 135 | 63,75 | 68 | 0,47 | 0,94 |
| **PSW (Cenário 97,5 h principal)** | 135 | 63,75 | 97,5 | 0,47 | 0,65 |
| **GPTI** | 72 | 78 | 65 | 1,08 | 1,20 (com ressalva) |
| **Total** | 207 | 141,75 | 133 | 0,68 | 1,07 |

---

## 8. Previsão e Recursos

- Capacidade PSW até M2 (10/11): **18 h** (duas pessoas × 4,5 h × 2 semanas; teto de 20 h a 5 h/semana).
- Faltam de 80,25 h a 86,8 h para a linha de base original.

---

## 11. Decisões pedidas ao patrocinador

### DEC-5 — Opção C (Detalhamento de Datas e Premissas)

- **Duas Datas da Opção C:**
  1. **A partir da S12 efetiva (trabalho acumulado):** As 18,5 h restantes da PSW a 9 h/semana estendem-se da S12 até o final da **S14**.
  2. **Contagem Nominal com S11 contada:** Se a S11 for contabilizada como semana decorrida do calendário letivo, o término ocorre na **S12**.
- **Capacidade da GPTI:** As 6 h de apoio técnico da GPTI saem do seu **teto de capacidade nominal** (5 h/semana por pessoa = 15 h/semana no grupo, totalizando até 45 h de capacidade total, das quais 36 h são de atividades próprias e 6 h dedicadas ao apoio de D10).

---

## Anexo A — Reconstituição das horas (CR)

A reconstituição adota como **cenário principal reprodutível** o valor de **97,5 h**, derivado da aplicação direta das regras de esforço aos módulos entregues no commit `9e857eb`. O cenário de **68 h** é mantido como **cenário em validação/ajuste contínuo** com a equipe de produto (PSW).

---

## Anexo C — Registro de uso de IA neste relatório

| Campo | Conteúdo |
|---|---|
| **1. Ferramenta utilizada** | IA Conversacional / Modelo de Linguagem (Claude / ChatGPT) |
| **2. Data do uso** | 02/11/2026 |
| **3. O que foi solicitado (Prompt)** | Auditoria dos artefatos e repositório, validação de fórmulas de valor agregado, recálculo da rede do caminho crítico e simulações do cronograma nivelado por script Python, além de apoio na revisão textual do relatório. |
| **4. O que foi sugerido pela IA** | Correção da projeção de término por esforço (S24), eliminação de contradições sobre alteração de linha de base, estruturação dos cenários de CR (97,5 h principal vs 68 h em validação), apresentação das duas datas da Opção C e inclusão de ressalva no IDC da GPTI. |
| **5. O que o grupo decidiu** | O grupo aprovou o recálculo matemático, adotou a Opção C como recomendação central, definiu o CR reprodutível em 97,5 h mantendo 68 h sob validação com a PSW e assumiu total responsabilidade pelo conteúdo. |