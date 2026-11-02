# Status Report 2 — Fio a Fio — leia antes

Esta pasta contém o **Status Report 2** da disciplina de GPTI, com data de status 02/11/2026 e entrega em 09/11/2026. Ele mede o projeto contra a linha de base da AV1: cronograma, valor agregado e recursos.

| Arquivo | O que é |
|---|---|
| [`status-report-2.md`](status-report-2.md) | O relatório completo: escopo, cronograma, caminho crítico, valor agregado, índices, previsão, recursos, questões, mudanças, decisões e próximas ações. |
| `README.md` (este arquivo) | A observação sobre as horas, premissas de reconstituição e o que está em validação com a PSW. |
| [`../status-report-1/apontamento-de-horas.csv`](../status-report-1/apontamento-de-horas.csv) | A planilha de apontamento combinada, contendo as horas reconstituídas da PSW e o registro da GPTI. |
| [`apontamento-de-horas-gpti.csv`](apontamento-de-horas-gpti.csv) | Apontamento de horas da GPTI (G01–G10), por pessoa, atividade e semana. Horas confirmadas pelos integrantes. |

---

## ⚠ OBSERVAÇÃO IMPORTANTE SOBRE AS HORAS

**A PSW não informou horas, porque depois do M1 não desenvolveu nada: uma coisa é consequência da outra.** O CR da PSW foi reconstituído em 02/11/2026 e está **em validação com a Letícia e a Maria Clara**. É um processo de acompanhamento contínuo: os valores podem ser ajustados nas reuniões conjuntas e serão atualizados no Status Report 3.

### O que aconteceu

No Status Report 1 (26/10), GPTI e PSW combinaram anotar as horas de cada pessoa, por atividade do cronograma (D01 a D18 e G01 a G12) e por semana, numa planilha. As semanas 1 a 8 seriam lançadas de uma vez, numa reunião de 15 minutos.

**A PSW (Letícia, Maria Clara e Kauã) não lançou nenhuma hora até 02/11.** Depois do M1 não houve desenvolvimento, e por isso não houve o que apontar. O relatório registra isso como questão (Q-18). As horas da GPTI estão registradas e confirmadas pelos integrantes em [`apontamento-de-horas-gpti.csv`](apontamento-de-horas-gpti.csv).

### O que foi feito no lugar

O professor pede o **custo real (CR)**, ou seja, as horas gastas, para calcular o índice de custo (IDC) e a previsão de término (ENT e EPT). Sem o apontamento da PSW, consideraram-se dois cenários de análise:

1. **Cenário Principal (Reprodutível pela Regra Direta — 97,5 h):** Aplica as referências de esforço diretamente aos entregáveis do repositório no commit `9e857eb`, sem aplicar frações redutoras duplas.
2. **Cenário em Validação com a PSW (68 h):** Reavaliação refinada com a PSW, ajustando o tempo efetivo de cada tela/módulo observado no repositório.

Regras adotadas na reconstituição:
- **Atividades D11 a D18:** Permanecem com **0 h gasta**, pois nada foi desenvolvido no backend/persistência.
- **Funções fora do escopo (MUD-01 a MUD-05):** Somam 22,5 h (contam como gasto real, mas não geram valor agregado no escopo oficial da AV1).
- **Kauã:** 0 h (sem commits e sem retorno). Semanas 9 e 10: 0 h (sem entrega no período).

### Duas grandezas de 18 h e Capacidade

| Grandeza | O que representa | Valor / Impacto |
|---|---|---|
| **Capacidade Restante da PSW** | Limite nominal de horas da PSW até o M2 (2 pessoas × 4,5 h × 2 semanas) | **18 h** (teto máximo de 20 h a 5 h/semana) |
| **Horas Restantes na Opção C** | Esforço necessário para concluir os aceites do M1 na Opção C | **17 h de PSW** (+ 3,75 h de apoio técnico da GPTI) |
| **Reestimativa da PSW** | Estimativa informada pela PSW para passar nos critérios pendentes | **20 h** (cabe apenas no teto de 5 h/semana) |
| **Déficit para a Linha de Base** | Horas faltantes para o escopo completo do M2 (backend + integração) | **80,25 h a 86,8 h** (inviável no prazo) |

---

## Horas da PSW por atividade (reconstituídas em 02/11/2026, em validação com a PSW)

| Atividade | O que se observa no repositório | **Cenário 68 h** | **Cenário 97,5 h** |
|---|---|---:|---:|
| D01 — escopo, atores e casos de uso | `DocumentacaoFioAFio.md` (30 casos de uso e 7 entidades) | 6 h | 13,5 h |
| D02 — navegação e protótipos de tela | Protótipo HTML e navegação em React | 6 h | 6 h |
| D03 — modelo de dados, mocks, cadastro e login simulados | 9 módulos em `src/mocks`, telas de login e cadastro, edição de perfil | 5 h | 7,5 h |
| D04 — regras em JavaScript | Cálculo da divisão 85/15 no checkout | 2 h | 3,5 h |
| D05 — base React, rotas, identidade visual e componentes | Vite, Router, Tailwind, logo, componentes de interface | 5 h | 6 h |
| D06 — publicações | Criar, feed, curtir e comentar | 3 h | 7,5 h |
| D07 — vídeo-aulas da criadora | Cadastrar, consultar e editar aula | 3 h | 6,5 h |
| D08 — materiais | Lista e detalhe de materiais | 3 h | 3 h |
| D09 — catálogo, compra, pagamento, estante, avaliação e vendas | Telas do fluxo de compra | 10 h | 17 h |
| D10 — testes, correções e demonstração do M1 | Correções de 06/10 e demonstração | 2,5 h | 2,5 h |
| **Subtotal no escopo** |  | **45,5 h** | **73 h** |
| MUD-01 — JSON Server | Pasta `backend/`, `services/api.js`, troca da fonte de dados | 8 h | 10 h |
| MUD-02 — administração e moderação | 7 telas de administração | 6,5 h | 6,5 h |
| MUD-03 — chat | Tela e contextos de chat | 3,5 h | 3,5 h |
| MUD-04 — stories | Criação e exibição de stories | 3,5 h | 3,5 h |
| MUD-05 — pesquisa ampla e seguir | Tela de pesquisa | 1 h | 1 h |
| **Subtotal fora do escopo** |  | **22,5 h** | **24,5 h** |
| **Total** |  | **68 h** | **97,5 h** |

---

## Em validação com a PSW

| Pendência | Quem | Prazo |
|---|---|---|
| Dizer **quem fez** cada atividade e **em que semana**. Hoje a planilha divide 50/50 e usa a janela do plano. | Letícia e Maria Clara | 06/11 |
| Distribuir as **20 h restantes** pelas atividades e confirmar que elas cobrem os itens da opção C da DEC-5 (regras, preço e retirada, recusa, estante, avaliação, vendas, teste e demonstração) | Letícia e Maria Clara | 06/11 |
| Lançar as horas semanalmente a partir de 03/11 | Letícia e Maria Clara | toda semana |

---

## Horas da GPTI (confirmadas pelos integrantes)

As horas da GPTI foram **registradas por atividade e conferidas pelos integrantes**, em [`apontamento-de-horas-gpti.csv`](apontamento-de-horas-gpti.csv).

| Pessoa | Horas até 02/11 | Atividades |
|---|---:|---|
| Matheus | 21,33 h | G01 6; G04 3; G06 3,33; G07 3,33; G08 2; G09 2,67; G10 1 |
| Gabriel | 21,33 h | G02 6; G04 3; G06 3,33; G07 3,33; G08 2; G09 2,67; G10 1 |
| Guilherme | 22,33 h | G03 6; G05 4; G06 3,33; G07 3,33; G08 2; G09 2,67; G10 1 |
| **Total** | **65 h** |  |