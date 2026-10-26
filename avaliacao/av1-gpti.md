# Correção da AV1 — GPTI — Fio a Fio

Repositório: https://github.com/leticiamendsnt/fio-a-fio/ na branch `docs/gpti-AV1`.

Artefatos: `GPTI/business-case.md`, `GPTI/termo-de-abertura.md`, `GPTI/plano-de-projeto.md`, `GPTI/dicionario-eap.md`.

A nota é do Grupo G de GPTI e vale para cada aluno do grupo. Nesta etapa, a ausência de commit não zera ninguém. O nome na atividade do cronograma é o contrato da etapa seguinte. A especificação de referência é `DocumentacaoFioAFio.md`, usada na AV1 de PSW: vídeo-aula, compra, feed e materiais. A branch `develop`, corrigida na PSW, grava no JSON Server.

| Aluno | Nota |
| --- | ---: |
| Matheus Cunha Schwab | 97 |
| Gabriel Barretto Galdino dos Santos | 97 |
| Guilherme Barboza Araújo de Almeida | 97 |

## Parte comum — 97/100

| Parte | Nota |
| --- | ---: |
| Business case | 10/10 |
| Termo de abertura | 15/15 |
| Escopo e EAP | 14/15 |
| Cronograma com nomes | 24/25 |
| Custo, partes e riscos | 15/15 |
| Dicionário da EAP | 14/15 |
| Um projeto só | 5/5 |

### Business case — 10/10

O caso diz na abertura que pagamento e login são simulados e que a receita de comissão só existe em uma etapa futura que o caso não autoriza. Há alternativas e recomendação do protótipo com a ordem de grandeza da seção 12. A seção 12 é a análise de 24 meses e registra que o plano revisou o esforço para 314 h e R$ 6.331,93, dentro da faixa de −25%, sem recalcular os indicadores da iniciação.

### Termo de abertura — 15/15

A seção 2 diz quem mede os objetivos (equipe GPTI, com ciência do patrocinador, na semana 12) e que a receita de comissão é hipótese de lançamento futuro, não critério deste termo. Provedor de pagamento, hospedagem de vídeo e moderação estão listados como partes futuras sem participação. Há marcos, premissas, riscos iniciais e aprovação.

### Escopo e EAP — 14/15

A declaração recorta vídeo-aula, compra, publicações e materiais, e a seção 4.4 registra stories, chat, notificações e seguidores como fora. A EAP tem 1.4 frontend do marco 1, 1.5 backend e 1.6 integração.

Desconto:

- 1 ponto. O marco 1 está fixado em dados simulados em módulo: o pacote 1.4.7 é "Frontend ligado aos dados simulados" e a tabela de situação diz "Nove módulos de dados em `src/mocks`. Não há contrato de API escrito." O marco 1 da disciplina de PSW, e a branch `develop` entregue, usam o JSON Server como API.

### Cronograma com nomes — 24/25

A seção 5.5 põe Letícia nas publicações, Maria Clara nas vídeo-aulas e Kauã nos materiais, com a tarefa e as horas de cada semana. A seção 5.6 põe Matheus, Gabriel e Guilherme em G01 a G06, com tarefa e horas. D06, D07 e D08 trazem o nome na própria linha. Há caminho crítico, folga e estimativa de três pontos em D10 e D16.

Desconto:

- 1 ponto. De D01 a D05 e de D09 a D18 o responsável da linha é "Equipe PSW". A divisão por pessoa fica só na semana.

### Custo, partes e riscos — 15/15

Orçamento por composição com a taxa-sombra, contingência ligada a evento e reserva gerencial. Os riscos têm causa escrita ("Como a validação de PSW tem trinta casos de uso e dez telas e o recorte cobre parte deles, pode haver pedido para incluir…"), gatilho, contingência e responsável nominal. OP01 é a oportunidade: se D07 for aceito na semana 6, a lista de vídeo-aulas é reaproveitada no catálogo e D09 começa uma semana antes, com resposta "explorar". O engajamento nomeia Gabriel, Letícia e Maria Clara nas ações com crocheteiras, criadoras e provedor de pagamento.

### Dicionário da EAP — 14/15

A e R são nomes em todos os pacotes. O aceite é observável e é o do produto: aula sem preço ou com preço zero não é salva; a segunda curtida da mesma usuária não soma; a tela de vendas mostra a parte da criadora e a da plataforma; nenhum número de cartão é gravado.

Desconto:

- 1 ponto. O aceite de 1.4.7 é "Os fluxos de 1.4.1 a 1.4.6 leem os módulos de `src/mocks`, não uma API." O produto entregue lê a API.

### Um projeto só — 5/5

Caso, termo, plano e dicionário descrevem o mesmo protótipo, com os mesmos códigos, as mesmas exclusões e as mesmas seis pessoas.

## O que esta nota deixa para a etapa seguinte

A seção 5.5 nomeia Letícia nas publicações, Maria Clara nas vídeo-aulas e Kauã nos materiais. A seção 5.6 nomeia Matheus, Gabriel e Guilherme em G01 a G06. A etapa seguinte cobra essa célula. Kauã Di Franco de Andrade Monteiro está nessa alocação de produto e não entrou na correção de PSW.
