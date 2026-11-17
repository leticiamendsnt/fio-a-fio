# Fio a Fio — rede social de crochê com venda de vídeo-aulas

Planejamento de um protótipo acadêmico. Os alunos de GPTI conduzem a gestão. Os alunos de PSW idealizaram o produto, propõem o escopo funcional e o desenvolvem. A semana letiva 1 começou em 03/08/2026. A AV1 é na semana letiva 8.

O produto desta fase é um protótipo: o pagamento e o login são simulados, os vídeos são fictícios e as regras de compra e de divisão de receita são hipóteses da equipe.

## Documentos

A leitura segue o processo. A iniciação autoriza o trabalho. O planejamento detalha o que foi autorizado. O dicionário fecha a linha de base do escopo.

| Documento | Para que serve |
|---|---|
| [Caso de negócio](business-case.md) | Iniciação. Problema, alternativas e ordem de grandeza. Os indicadores financeiros são de um lançamento futuro, não do protótipo. |
| [Termo de abertura](termo-de-abertura.md) | Autoriza o projeto. Objetivos do protótipo, marcos, premissas e governança. |
| [Plano de projeto](plano-de-projeto.md) | Escopo, EAP, cronograma, realizado até a semana 8, recursos, custos, riscos, engajamento e registro de uso de IA. |
| [Dicionário da EAP](dicionario-eap.md) | Aceite observável de cada pacote e quem presta contas dele. |

A linha de base do escopo é a declaração no plano, a EAP e o dicionário. Marco, recurso e custo ficam no plano.

## Status Reports

| Relatório | Data de status | Para que serve |
|---|---|---|
| [Status Report 1](status-report-1/status-report-1.md) | 06/10/2026 | Escopo e aceite do M1, com registros de questões e de mudanças. |
| [Status Report 2](status-report-2/status-report-2.md) | 02/11/2026 | Cronograma, caminho crítico, valor agregado, previsão e recursos até o M2. |
| [Status Report 3](status-report-3/status-report-3.md) | 16/11/2026 | Partes interessadas, comunicação e riscos: posição planejada e atual, mensagem enviada e recebida, resposta executada e efeito. |

> **Atenção sobre as horas do Status Report 2:** o método combinado no SR1 (cada aluno informa as próprias horas) não foi seguido, e nenhum grupo apontou semana a semana. O CR da PSW (68 h) foi **reconstituído pela GPTI em 02/11/2026 e está em validação com a Letícia e a Maria Clara**. As horas da GPTI foram registradas por atividade depois do fato e conferidas pelos integrantes. As duas estão na [planilha combinada](status-report-1/apontamento-de-horas.csv). O método está no [README do Status Report 2](status-report-2/README.md).

Os documentos partem de três insumos de PSW: a definição do projeto, com propósito, modelo de receita, processo principal, casos de uso, atores e entidades, que a validação dos requisitos ampliou para trinta casos de uso e sete entidades; o protótipo de telas; e o repositório do frontend, de onde vêm as tecnologias e o realizado.

## Estrutura de gestão

O patrocinador é o Prof. Diogo Mendonça. Ele aprova mudança, marco e cancelamento. Não presta contas de pacote da EAP.

Matheus é o gerente do projeto e presta contas do plano inteiro. Guilherme prepara a comunicação com o patrocinador. Matheus responde pelo conteúdo.

| Papel | Quem | O que faz neste projeto |
|---|---|---|
| Patrocinador | Prof. Diogo Mendonça | Acompanha as demonstrações e decide mudança relevante de escopo, prazo ou reserva gerencial. |
| Gerente do projeto | Prof. Diogo Mendonça | Confere pedido de mudança contra a EAP e coordena a equipe de gestão. |
| Equipe de gestão | Matheus Cunha Schwab, Gabriel Barretto Galdino dos Santos e Guilherme Barboza Araújo de Almeida | Planeja, valida o escopo proposto por PSW e registra decisão, risco e aceite. |
| Equipe de produto | Letícia Mendonça dos Santos (coordenadora), Maria Clara Mousinho de Salles e Kauã Di Franco de Andrade Monteiro | Propõe o escopo funcional e implementa frontend, backend, testes e documentação. |

Cada pacote de primeiro nível tem um responsável por prestar contas (A). Os demais executam (R). O detalhe de cada pacote está no [dicionário](dicionario-eap.md).

| Pacote | Presta contas |
|---|---|
| 1.1 Gestão | Matheus |
| 1.2 Requisitos e desenho | Gabriel |
| 1.3 Ambiente | Kauã |
| 1.4 Frontend do marco 1 | Letícia |
| 1.5 Regras e API | Maria Clara |
| 1.6 Integração do marco 2 | Kauã |
| 1.7 Verificação e encerramento | Guilherme |

Crocheteiras, criadoras, provedor de pagamento e hospedagem de vídeo não participam desta etapa. Contato com eles só com autorização do patrocinador.

## Figuras do cronograma

O plano incorpora as figuras. No GitHub, o clique abre a imagem em outra aba. Os arquivos HTML servem para abrir no navegador e ver a dependência ao passar o mouse.

- [Gantt com dependências e esforço](cronograma-gantt-recursos.png)
- [Alocação individual](cronograma-alocacao-individual.png)
