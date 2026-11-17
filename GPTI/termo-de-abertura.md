# Termo de Abertura do Projeto

## Fio a Fio — rede social de crochê com venda de vídeo-aulas

| Campo | Informação |
|---|---|
| **Versão** | 1.0 |
| **Data** | 05/10/2026 |
| **Patrocinador** | Prof. Diogo Mendonça |
| **Gerente do projeto** | Matheus Cunha Schwab, aluno da disciplina de GPTI (Gerência de Projetos de TI). Presta contas do plano inteiro ao patrocinador. |
| **Equipe de gestão** | Matheus Cunha Schwab, Gabriel Barretto Galdino dos Santos e Guilherme Barboza Araújo de Almeida |
| **Duração estimada** | 12 semanas letivas, de 03/08 a 30/11/2026 |
| **Equipe prevista** | 6 alunos: 3 da disciplina de Programação para a Web (PSW) e 3 da disciplina de GPTI; dedicação estimada de 5 horas semanais por pessoa |

## 1. Propósito e justificativa

Este termo autoriza o início de um projeto acadêmico de desenvolvimento de um protótipo do Fio a Fio, uma rede social voltada à comunidade de crochê. Segundo a definição elaborada pelas alunas de PSW, quem faz crochê usa hoje plataformas diferentes para mostrar trabalhos, aprender técnicas, achar revistas e gráficos e comprar ou vender aulas. A solução pretende reunir essas atividades e dar à criadora um lugar para vender vídeo-aulas à própria comunidade. O diagnóstico vem da experiência da equipe; não houve pesquisa com crocheteiras nem com criadoras.

O projeto é também uma experiência de aprendizagem prática: os três alunos de PSW definem e desenvolvem o escopo inicial do produto e os três alunos de GPTI validam esse escopo e conduzem a gestão do projeto. Desenvolverão conhecimentos em **React, JavaScript, Vite, React Router e Tailwind CSS no frontend**, já em uso, e **JavaScript, Express e MongoDB no backend**, previstos para o segundo marco e ainda não iniciados. A dimensão pedagógica deve ser considerada no planejamento, nas revisões técnicas e na definição realista das entregas.

O produto futuro deverá processar pagamentos por um provedor externo, hospedar vídeos e repassar às criadoras a sua parte de cada venda. **Nada disso faz parte deste escopo.** Para o protótipo, a equipe simula o pagamento e o login, usa vídeos e usuárias fictícias e não guarda dado de cartão. A integração real será considerada em uma etapa futura, com decisão própria.

## 2. Objetivos do projeto

Os objetivos abaixo são do protótipo. Quem mede é a equipe GPTI, com ciência do patrocinador, na demonstração da semana 12. A receita de comissão do caso de negócio é hipótese de um lançamento futuro, não critério de sucesso deste termo.

- Uma usuária fictícia encontra uma vídeo-aula no catálogo, vê o detalhe, compra com pagamento simulado e passa a ver a aula na sua estante. Compra sem pagamento aprovado não libera a aula.
- Em cada compra aprovada, o sistema registra 85% do preço bruto para a criadora e 15% para a plataforma. As duas partes somam o preço, e a criadora vê a venda na sua consulta de vendas.
- A AV1, com termo, caso de negócio e plano, é aceita na semana 8. O termo de encerramento e as lições aprendidas são aceitos na semana 12.
- O pagamento e o login são demonstrados por simulação. Nenhuma chamada a provedor de pagamento, nenhum dado de cartão e nenhum dado pessoal real aparecem na demonstração.

## 3. Escopo de alto nível

### Incluído

- Priorização dos casos de uso informados por PSW e definição das regras do fluxo de compra.
- Interface frontend construída com React 18, JavaScript, Vite, React Router e Tailwind CSS, seguindo a identidade visual em rosa e preto definida por PSW.
- Backend em JavaScript. Express e MongoDB são as tecnologias previstas; o backend ainda não foi iniciado.
- Uso de dados simulados em módulos JavaScript locais (`src/mocks`) para a demonstração do frontend no primeiro marco.
- Integração do frontend com a API do backend próprio, prevista em Express/MongoDB, no marco final.
- Fluxo de compra e acesso a uma vídeo-aula: catálogo, detalhe, compra, pagamento simulado, estante e avaliação.
- Cadastro e gestão de vídeo-aulas pela criadora e consulta de vendas com a divisão de receita.
- Feed de publicações com curtida e comentário, e biblioteca de materiais gratuitos.
- Cadastro, login e perfil simulados.
- Testes funcionais, documentação técnica essencial e demonstração das entregas.

### Fora do escopo inicial

- Integração com provedor de pagamento real, cobrança, estorno e repasse de valores às criadoras.
- Hospedagem e transmissão real de vídeo e player de prévia.
- Stories, seguir usuárias, compartilhar publicações, chat, notificações, trilhas, recomendações e painéis de métricas.
- Moderação de conteúdo e funções do administrador.
- Autenticação real, recuperação de senha e tratamento de dados pessoais reais.
- Publicação para o público: o projeto entrega uma versão integrada e demonstrável. Lançar depende de fornecedores, segurança, obrigações legais e decisão própria.

## 4. Abordagem técnica e de aprendizagem

O desenvolvimento será incremental, do protótipo com dados simulados à implementação integrada:

1. **Frontend:** React 18 e JavaScript, com Vite, React Router e Tailwind CSS, inicialmente lendo dados simulados de módulos locais (`src/mocks`).
2. **Backend:** API em JavaScript, com regras de negócio e persistência. Express e MongoDB são as tecnologias previstas; o backend ainda não foi iniciado.
3. **Integração:** substituição dos dados simulados locais pela API própria, testes de contrato e de fluxo completo.
4. **Serviços externos simulados:** um serviço de pagamento simulado aprova ou recusa a compra de forma previsível, e o login é simulado. Não há integração com provedor de pagamento nem de identidade durante este projeto.

Como a equipe está aprendendo as tecnologias, o plano reserva tempo para capacitação, pareamento, revisão de código e correção de defeitos. A equipe deve priorizar o fluxo de compra; funcionalidades sociais secundárias poderão ser reduzidas ou adiadas se o aprendizado pressionar o prazo.

## 5. Marcos e entregas

| Marco | Prazo previsto | Entregáveis e critérios de aceite preliminares |
|---|---:|---|
| **M1 — Frontend dos fluxos priorizados, com serviços simulados** | Semana letiva 8: GPTI em 05/10/2026 e PSW em 06/10/2026 | Escopo priorizado por PSW e validado por GPTI; telas de publicações, vídeo-aulas, materiais, catálogo, detalhe, compra, estante, avaliação e vendas implementadas em React; navegação e validações básicas demonstráveis; dados vindos de módulos locais (`src/mocks`); pagamento e login simulados; limitações dos simuladores documentadas. O aceite do marco é registrado pela equipe de GPTI com ciência do patrocinador. |
| **M2 — Sistema integrado ao backend próprio** | Semana letiva 12: PSW em 10/11/2026; aceite de GPTI em 30/11/2026 | Frontend conectado à API desenvolvida pelo projeto, prevista em Express; persistência prevista em MongoDB; pagamento e login continuam simulados; fluxo de compra executado de ponta a ponta com a divisão de receita registrada; testes, documentação e demonstração final. O aceite do marco é registrado pela equipe de GPTI com ciência do patrocinador. |

As datas seguem o calendário da disciplina. A aula de 28/09 e 29/09 foi prática extra e não conta como semana do projeto. As datas, a folga e o caminho crítico estão na linha de base de prazo do plano.

## 6. Requisitos de alto nível e critérios gerais de sucesso

- O protótipo deve permitir demonstrar o acesso simulado, consultar o catálogo, ver o detalhe de uma vídeo-aula, comprar e ver um estado de compra compreensível.
- A aula só aparece na estante depois do pagamento aprovado. Iniciar a compra não equivale a ter o acesso.
- Cada compra aprovada guarda o preço pago e as partes da criadora e da plataforma.
- Os dados persistidos devem ser validados e acessados pelo backend; o frontend não deve conectar diretamente ao banco de dados.
- A primeira entrega demonstra os fluxos do frontend sem depender do backend definitivo, usando dados simulados em módulos locais (`src/mocks`).
- A entrega final substitui os dados simulados locais pela API do projeto, prevista em Express/MongoDB; pagamento e login permanecem simulados.
- O aceite de cada pacote está no dicionário da EAP. As regras continuam hipóteses do protótipo: nenhuma criadora, compradora ou fornecedor as validou.
- O êxito do projeto será avaliado pela entrega dos marcos, pelo atendimento aos fluxos priorizados, pelo aceite interno da equipe de GPTI e pelo aprendizado técnico documentado.

### Critérios de encerramento e cancelamento

O projeto termina na semana 12, quando a equipe GPTI registra o aceite do M2 ou a lista do que não passou, e o patrocinador dá ciência. Encerrar com limitação conhecida é término, não fracasso escondido.

O patrocinador cancela o projeto, ou o encerra antes do M2, se ocorrer uma destas condições:

- A demonstração do fluxo de compra não cabe nas 18 h de programação reservadas e o patrocinador não aprova um corte de escopo.
- O patrocinador retira a autorização.
- Uma premissa essencial cai e não há substituto dentro do prazo, por exemplo a equipe ficar com menos de dois alunos de PSW ou sem ambiente para executar o protótipo.

Cancelar cedo, nesse caso, é decisão de governança. Não é meta do projeto.

## 7. Premissas e restrições

### Premissas

- A definição do projeto e o protótipo de telas elaborados por PSW são o ponto de partida do escopo.
- O patrocinador, Prof. Diogo Mendonça, acompanhará o projeto e receberá as demonstrações dos marcos.
- Os participantes terão acesso às ferramentas, ao repositório e ao ambiente de desenvolvimento necessários.
- O escopo da primeira versão poderá ser reduzido a um conjunto prioritário que caiba no prazo.
- Serão usados usuárias, vídeo-aulas, materiais e compras fictícios criados pela equipe.
- A divisão de 85% e 15% é a proposta inicial da definição do projeto e vale como regra do protótipo.
- Express e MongoDB são a escolha prevista para o backend. A pasta `backend` do repositório está reservada e a tecnologia é confirmada no início da semana 9; trocá-la depois disso é mudança a aprovar pelo patrocinador.

### Restrições

- Duração-alvo de 12 semanas letivas, de 03/08 a 30/11/2026, e dedicação parcial de cinco horas semanais por participante.
- A equipe de produto tem três pessoas; a ausência de uma retira um terço da capacidade de programação.
- A equipe está aprendendo React, JavaScript e Tailwind CSS e ainda vai aprender Express e MongoDB; a produtividade inicial pode ser inferior à de uma equipe experiente.
- Os dados em `src/mocks` são exclusivamente uma solução de simulação para o primeiro marco; não persistem e não devem ser tratados como backend.
- A equipe não está autorizada, por este termo, a contratar provedor de pagamento, cobrar, receber ou repassar valores, nem a coletar dados pessoais ou de cartão.
- Não haverá contato com crocheteiras, criadoras ou fornecedores em nome do projeto sem autorização do patrocinador.
- Um lançamento depende de revisão de segurança, proteção de dados, obrigações fiscais, direitos sobre o conteúdo e decisão própria, e fica fora do prazo deste projeto.

## 8. Governança e responsabilidades

### Stakeholders

| Stakeholder | Interesse ou responsabilidade | Participação nesta etapa |
|---|---|---|
| **Prof. Diogo Mendonça — patrocinador** | Patrocinar o projeto acadêmico, acompanhar os marcos e decidir sobre mudanças relevantes de escopo e prazo | Ativo: recebe as demonstrações e dá ciência dos aceites internos |
| **3 alunos de GPTI — Gerência de Projetos de TI** | Planejar e acompanhar o projeto, validar internamente o escopo proposto por PSW e registrar decisões e aceites | Ativos: equipe de gestão |
| **3 alunos de PSW — Programação para a Web** | Idealizar o produto, definir o escopo funcional inicial e desenvolver a solução como atividade de aprendizagem | Ativos: equipe de produto e desenvolvimento |
| **Crocheteiras e entusiastas — compradoras potenciais** | Aprender, achar materiais e participar da comunidade; são as usuárias pretendidas | Não serão consultadas formalmente nesta fase; a equipe usa sua experiência para elaborar hipóteses |
| **Criadoras e professoras de crochê — vendedoras potenciais** | Divulgar o trabalho e ter renda com vídeo-aulas; a divisão de receita as afeta diretamente | Sem participação inicial; a envolver antes de qualquer lançamento |
| **Provedor de pagamento — fornecedor futuro** | Processar pagamentos e informar taxas, contrato e requisitos de integração | Sem participação; simulado no protótipo |
| **Hospedagem de vídeo e infraestrutura — fornecedor futuro** | Armazenar e transmitir as vídeo-aulas | Sem participação; vídeos fictícios no protótipo |
| **Administração e moderação da plataforma — papel futuro** | Moderar conteúdo e administrar a plataforma em operação | Papel não exercido nesta fase; sem funcionalidade no protótipo |

Os stakeholders identificados como sem participação inicial não foram consultados nem aprovaram os requisitos. A lista registra partes interessadas potenciais e dependências para uma etapa futura; não implica compromisso de disponibilidade.

### Papéis e responsabilidades

| Papel | Responsabilidades principais | Designação |
|---|---|---|
| Patrocinador | Patrocinar o projeto, acompanhar demonstrações e decidir sobre mudanças relevantes de escopo ou prazo | Prof. Diogo Mendonça |
| Gerente do projeto | Prestar contas do plano ao patrocinador; conferir pedidos de mudança contra a EAP; coordenar a equipe de gestão | Matheus |
| Equipe de gestão (GPTI) | Planejar e acompanhar prazo, escopo, riscos, comunicação e marcos; validar o escopo proposto por PSW; registrar aceite interno das entregas | Matheus, Gabriel e Guilherme |
| Equipe de produto e desenvolvimento (PSW) | Propor o escopo funcional inicial e implementar frontend, backend, testes e documentação conforme prioridades acordadas | Letícia Mendonça dos Santos (coordenadora), Maria Clara Mousinho de Salles e Kauã Di Franco de Andrade Monteiro |
| Equipe total do projeto | Participar das atividades do projeto com dedicação estimada de 5 h/semana por aluno | 6 alunos |

Os alunos de PSW elaboraram a proposta de escopo: dezoito casos de uso e cinco entidades na definição inicial, ampliados para trinta casos de uso e sete entidades na validação dos requisitos, e o protótipo de telas. Os alunos de GPTI revisam e validam o recorte que cabe no prazo. A validação é interna e acadêmica. A equipe de GPTI mantém a lista priorizada de trabalho, riscos, decisões e demonstrações; mudanças relevantes são submetidas ao patrocinador.

## 9. Riscos iniciais e respostas

| Risco | Impacto potencial | Resposta inicial |
|---|---|---|
| Curva de aprendizagem maior que a prevista | Atraso ou redução de funcionalidades | Reservar tempo para estudo e revisão; priorizar o fluxo de compra; revisar o plano a cada demonstração |
| Escopo proposto maior que a capacidade da equipe | Fluxo principal incompleto nos marcos | Fechar o recorte priorizado no plano; registrar stories, chat, notificações e seguidores como trabalho futuro |
| Regras de compra e divisão inferidas sem validação | Retrabalho quando a regra mudar | Registrar as regras como hipóteses; guardar em cada compra o valor de cada parte |
| Pagamento simulado divergente de um provedor real | Retrabalho em integração futura | Documentar estados e contrato do simulador; não afirmar compatibilidade com provedor algum |
| Baixa disponibilidade de participante em uma equipe de três | Entregas incompletas | Monitorar a disponibilidade semanal, dividir tarefas pequenas e ajustar o escopo antes dos marcos |
| Expectativa de produto pronto ao fim do prazo | Uso prematuro com dados e pagamentos reais | Comunicar que a entrega é uma versão acadêmica demonstrável; exigir decisão separada para qualquer uso real |
| Requisitos de dados pessoais, pagamento e tributação identificados tarde | Impedimento de um lançamento | Usar dados fictícios e tratar o levantamento legal como condição de uma etapa futura |

## 10. Estimativa econômica e financiamento

Na iniciação, a ordem de grandeza foi **390 h** e **R$ 7.350**, com faixa esperada de −25% a +75%. O planejamento revisou esse número para **R$ 6.331,93**: 270 h de atividades, 44 h de contingência e reserva gerencial de 7%. A revisão fica 13,9% abaixo do ponto da iniciação e dentro da faixa. O detalhe da conta está no caso de negócio e no plano. A reserva utiliza as 18 h livres de PSW e 26 das 27 h livres de GPTI. O calendário fica com apenas 1 h livre em GPTI e nenhuma folga em PSW; risco que exija desenvolvimento adicional acima da reserva técnica demandará redução de escopo ou replanejamento. **Os alunos não serão remunerados pelo projeto; portanto, o desembolso efetivo previsto para pagamentos à equipe é R$ 0,00.** A estimativa refere-se ao protótipo com pagamento e login simulados; não contempla o custo de um lançamento.

Para fins do exercício, o custo simulado é distribuído igualmente entre os dois marcos:

| Marco e gatilho da parcela simulada | Prazo | Parcela simulada | Desembolso efetivo com a equipe |
|---|---:|---:|---:|
| **M1 — Frontend dos fluxos priorizados com dados simulados locais**: após demonstração e aceite interno pela equipe de GPTI, com ciência do patrocinador | Semana letiva 8: GPTI 05/10/2026 e PSW 06/10/2026 | **R$ 3.165,97 (50%)** | **R$ 0,00 — não há pagamento aos alunos** |
| **M2 — Sistema integrado ao backend próprio, previsto em Express/MongoDB**: após demonstração final e aceite interno pela equipe de GPTI, com ciência do patrocinador | Semana letiva 12: PSW 10/11/2026; aceite GPTI 30/11/2026 | **R$ 3.165,96 (50%)** | **R$ 0,00 — não há pagamento aos alunos** |
| **Total do projeto** | **12 semanas letivas** | **R$ 6.331,93 (100%)** | **R$ 0,00 de pagamento à equipe** |

O rateio igual de 50% por marco é uma convenção didática e não corresponde à distribuição do esforço. A conferência do plano dá 168 h até o fim da semana 8 e 102 h nas semanas 9 a 12. Não constitui faturamento, bolsa, salário ou transferência financeira. A estimativa exclui custos efetivos de infraestrutura, licenças, provedor de pagamento, hospedagem de vídeo ou contratação de terceiros. Se surgirem custos reais, deverão ser avaliados e autorizados pelo patrocinador antes de serem incorridos.

## 11. Autoridade e aprovação

A aprovação deste termo autoriza o início do planejamento detalhado, do levantamento de requisitos e do desenvolvimento da primeira versão dentro das premissas acima. Não autoriza cobrança, uso de dados reais nem publicação para o público.

| Aprovação | Nome | Assinatura | Data |
|---|---|---|---|
| Patrocinador | Prof. Diogo Mendonça | Pendente — ciência do patrocinador na AV1 de 05/10/2026 |  |
| Representante da equipe GPTI | Matheus Cunha Schwab | Assinatura simbólica | 04/10/2026 |
| Representante da equipe PSW | Letícia Mendonça dos Santos | Assinatura simbólica | 04/10/2026 |
