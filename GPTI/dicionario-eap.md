# Dicionário da EAP — Fio a Fio

**Versão:** 1.0  
**Data:** 05/10/2026  
**Linha de base do escopo:** este dicionário, a declaração do escopo e a EAP em [plano-de-projeto.md](plano-de-projeto.md)

Cada linha é um pacote de trabalho. **A** é quem presta contas do aceite. **R** é quem executa. O nível abaixo do pacote, quando existe na EAP, é atividade do cronograma e não tem aceite próprio.

O identificador do pacote é o código da EAP. Marco, recurso e custo não se repetem aqui: nascem no cronograma e no orçamento do plano.

## 1.1 Gestão e coordenação

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.1.1 | Termo e plano mantidos | Matheus | Matheus, Gabriel e Guilherme | A versão citada na AV1 é a mesma usada no controle das semanas 9 a 12, ou a mudança está registrada. |
| 1.1.2 | Decisões, riscos e mudanças | Gabriel | Matheus, Gabriel e Guilherme | Cada mudança de escopo, prazo ou custo tem pedido, decisão e efeito nas três linhas de base. |
| 1.1.3 | Aceites dos marcos | Guilherme | Guilherme | Há registro de aceite ou de recusa do M1 na semana 8 e do M2 na semana 12, com ciência do patrocinador. |
| 1.1.4 | Revisão técnica organizada | Letícia | Letícia, Maria Clara e Kauã | Nenhum incremento entra na demonstração sem revisão de outro aluno e sem o autor explicar o trecho. |

## 1.2 Requisitos e desenho

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.2.1 | Escopo funcional priorizado | Gabriel | PSW propõe; GPTI valida | A declaração da seção 4.1 cabe em uma leitura, e a seção 4.4 diz, para cada caso de uso e tela, se está dentro ou fora. |
| 1.2.2 | Atores, perfis e fluxo de compra | Gabriel | Letícia, Maria Clara e Kauã | Usuária e criadora têm ações distintas; a usuária sem perfil de criadora não cadastra aula nem consulta vendas. |
| 1.2.3 | Modelo e contratos | Kauã | Letícia, Maria Clara e Kauã | O mesmo exemplo de dados serve aos módulos de `src/mocks` e à API do backend. |
| 1.2.4 | Regras de pagamento, liberação e divisão | Maria Clara | Maria Clara | Estados da compra, resultado do simulador e cálculo das duas partes estão escritos com um exemplo numérico cada. |
| 1.2.5 | Hipóteses e limitações | Gabriel | Gabriel | Cada regra sem validação externa está marcada como hipótese do protótipo. |
| 1.2.6 | Navegação revisada | Letícia | Letícia, Maria Clara e Kauã | Um roteiro percorre catálogo, detalhe, compra, estante e avaliação sem passo oral não representado na tela. |

## 1.3 Base técnica e ambientes

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.3.1 | Aplicação React inicial, com Vite, React Router e Tailwind CSS | Letícia | Letícia, Maria Clara e Kauã | Outro aluno executa a aplicação seguindo a instrução do repositório e vê as cores definidas na identidade visual. |
| 1.3.2 | API inicial, prevista em Express | Kauã | Letícia, Maria Clara e Kauã | A API responde uma rota de verificação sem o frontend acessar o banco de dados. |
| 1.3.3 | Banco de desenvolvimento, previsto em MongoDB | Kauã | Kauã | Um registro gravado é lido depois de reiniciar a API. |
| 1.3.4 | Dados simulados do M1 em `src/mocks` | Kauã | Kauã | O frontend do M1 funciona só com os módulos locais, sem API e sem servidor de dados. |
| 1.3.5 | Cadastro e login simulados | Kauã | Kauã | O cadastro cria uma usuária fictícia, e o fluxo de login termina sem serviço externo e sem dado pessoal real. |
| 1.3.6 | Simulador de pagamento | Maria Clara | Letícia, Maria Clara e Kauã | O dado de teste de aprovação sempre aprova e o de recusa sempre recusa; nenhum número de cartão é gravado. |
| 1.3.7 | Perfis e dados de demonstração | Letícia | Letícia, Maria Clara e Kauã | A carga de dados cria as mesmas usuárias, criadoras, aulas e materiais a cada execução. A usuária edita nome, biografia e foto fictícia e ativa o perfil de criadora no próprio perfil. |

## 1.4 Frontend do marco 1

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.4.1 | Interface de publicações | Letícia | Letícia | Criar, consultar, editar e remover publicação própria; curtir e comentar publicação de outra usuária. A segunda curtida da mesma usuária não soma. |
| 1.4.2 | Interface de vídeo-aulas da criadora | Maria Clara | Maria Clara | Cadastrar, consultar e editar vídeo-aula própria. Aula sem preço, ou com preço zero ou negativo, não é salva. A aula retirada some do catálogo. |
| 1.4.3 | Interface de materiais gratuitos | Kauã | Kauã | Cadastrar, editar e remover material próprio; a lista filtra por tipo e exclui os demais. |
| 1.4.4 | Catálogo e detalhe | Maria Clara | Letícia, Maria Clara e Kauã | A lista mostra só aulas ofertadas. Busca por título e filtro por nível excluem as demais. O detalhe mostra título, descrição, capa, criadora, preço, duração, nível e avaliação média. |
| 1.4.5 | Compra, pagamento simulado e estante | Maria Clara | Letícia, Maria Clara e Kauã | A usuária inicia a compra, informa o dado de teste e vê aprovada ou recusada. Antes da aprovação, a aula não está na estante. |
| 1.4.6 | Avaliação e vendas | Letícia | Letícia, Maria Clara e Kauã | Só a aula comprada aceita nota de 1 a 5. A tela de vendas mostra, por venda, o preço, a parte da criadora e a parte da plataforma. |
| 1.4.7 | Frontend ligado aos dados simulados | Kauã | Letícia, Maria Clara e Kauã | Os fluxos de 1.4.1 a 1.4.6 leem os módulos de `src/mocks`, não uma API. |
| 1.4.8 | Demonstração do M1 | Guilherme | Letícia | A demonstração da semana 8 executa o roteiro e registra a limitação dos dados simulados. |

1.4 aceita a tela com os dados simulados. 1.5 aceita a API com o banco de dados. Um pacote não herda o aceite do outro.

## 1.5 Backend e regras de negócio

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.5.1 | API de publicações | Letícia | Letícia | As operações persistem no banco de dados. Editar ou remover publicação de outra usuária é recusado. |
| 1.5.2 | API de vídeo-aulas | Maria Clara | Maria Clara | Aula sem campo obrigatório ou com preço inválido não é gravada. Só a dona altera. Aula com compra aprovada é retirada do catálogo, não apagada. |
| 1.5.3 | API de materiais | Kauã | Kauã | Material sem título, tipo ou arquivo não é gravado. O filtro por tipo devolve somente os daquele tipo. |
| 1.5.4 | API de catálogo e busca | Letícia | Letícia | A consulta devolve só aulas ofertadas; busca por título e filtro por nível devolvem somente as correspondentes. |
| 1.5.5 | API de compra e estante | Maria Clara | Letícia, Maria Clara e Kauã | A compra nasce pendente, com o preço do momento. Compra da própria aula e compra repetida de aula já aprovada são recusadas. A estante devolve só compras aprovadas. |
| 1.5.6 | Pagamento simulado e liberação | Maria Clara | Letícia, Maria Clara e Kauã | Os casos passam: dado que aprova muda a compra para aprovada e a aula entra na estante; dado que recusa muda para recusada e a aula não entra; nova tentativa depois da recusa é aceita. Não há chamada externa. |
| 1.5.7 | Divisão de receita e vendas | Maria Clara | Letícia, Maria Clara e Kauã | Para preço de R$ 40,00, a compra guarda R$ 6,00 e R$ 34,00. Para R$ 29,99, guarda R$ 4,50 e R$ 25,49. As duas partes sempre somam o preço. Alterar o preço da aula não muda compra antiga. A criadora vê só as próprias vendas. |
| 1.5.8 | API de avaliação | Kauã | Maria Clara e Kauã | Quem não tem compra aprovada recebe recusa. A segunda avaliação da mesma compradora substitui a primeira. A média da aula muda de acordo. |
| 1.5.9 | Login simulado e controle de acesso | Kauã | Letícia, Maria Clara e Kauã | A rota protegida recusa chamada sem a usuária simulada. Usuária sem perfil de criadora recebe recusa ao cadastrar aula ou consultar vendas. |
| 1.5.10 | Persistência de domínio | Kauã | Letícia, Maria Clara e Kauã | Publicações, aulas, materiais, compras e avaliações continuam disponíveis depois de reiniciar a API. |

1.5.6 e 1.5.7 passam nesses casos. 1.6.3 e 1.6.4 só os mostram de novo, na aplicação ligada à API própria.

## 1.6 Integração do marco 2

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.6.1 | Frontend na API própria | Letícia | Letícia, Maria Clara e Kauã | Os fluxos do M1 executam contra a API do backend, sem módulo de `src/mocks` no lugar dela. |
| 1.6.2 | Fluxos persistidos | Kauã | Letícia, Maria Clara e Kauã | A estante e as avaliações sobrevivem a novo acesso da mesma usuária fictícia. |
| 1.6.3 | Compra de ponta a ponta | Maria Clara | Letícia, Maria Clara e Kauã | A demonstração reproduz catálogo, detalhe, compra aprovada, compra recusada e estante com os casos do pacote 1.5.6. |
| 1.6.4 | Divisão demonstrada | Maria Clara | Maria Clara | Depois da compra aprovada, a criadora da aula vê a venda com as duas partes dos casos do pacote 1.5.7. |
| 1.6.5 | Perfis no fluxo integrado | Kauã | Kauã | Trocar de usuária para criadora muda o que a aplicação integrada permite; o fluxo começa no login simulado. |
| 1.6.6 | Erros dos fluxos prioritários | Letícia | Letícia, Maria Clara e Kauã | Pagamento recusado, compra repetida e aula retirada produzem mensagem identificável, não tela em branco. |
| 1.6.7 | Demonstração final | Guilherme | Letícia | A semana 12 executa o roteiro de 1.6.1 a 1.6.6, ou registra o caso que falhou. |

1.6.7 executa o roteiro. 1.7 registra o que passou, o que falhou e o que ficou de fora.

## 1.7 Verificação e encerramento

| Pacote | Entrega | A | R | Aceite observável |
|---|---|---|---|---|
| 1.7.1 | Testes dos fluxos prioritários | Letícia | Letícia, Maria Clara e Kauã | Há resultado passado ou falho para publicação, vídeo-aula, material, catálogo, compra, estante, avaliação e vendas. |
| 1.7.2 | Testes de compra, liberação e divisão | Maria Clara | Maria Clara | Os casos cobrem pagamento aprovado, pagamento recusado, compra repetida, compra da própria aula e preço cujos 15% não dão centavo exato. |
| 1.7.3 | Defeitos tratados | Letícia | Letícia, Maria Clara e Kauã | Defeito que viola aceite de pacote está corrigido ou listado como limitação da demonstração. |
| 1.7.4 | Instruções de execução | Kauã | Kauã | Outro aluno sobe o protótipo e a carga de dados só com o texto do repositório. |
| 1.7.5 | Encerramento e lições | Guilherme | Matheus, Gabriel e Guilherme | O termo de encerramento diz o que foi aceito, o que ficou de fora e o que a equipe não repetiria. |
| 1.7.6 | Pendências para um lançamento | Gabriel | Gabriel | A lista separa casos de uso e telas não atendidos, pagamento real, hospedagem de vídeo, obrigações legais e validação com o público como trabalho futuro, sem dono neste projeto. |
