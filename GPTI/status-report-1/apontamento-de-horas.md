# Apontamento de horas — combinado GPTI e PSW

Base do Status Report 2 (custo realizado, valor agregado e previsão de término). Não aparece no Status Report 1. **Começa a ser anotado nesta semana.** Percentual estimado de cabeça não vale.

## Regra

- **Uma linha por aluno, por atividade do cronograma, por semana**, na planilha [`apontamento-de-horas.csv`](apontamento-de-horas.csv). Ela abre no Excel ou no Google Sheets.
- **Atividade** é o ID do plano (seção 5.2): `D01`–`D18` para PSW e `G01`–`G12` para GPTI. Trabalho fora da EAP, como chat, stories ou administração, é lançado com o código `FORA-EAP` e uma observação. Ele conta como hora gasta, mas não gera valor agregado.
- **horas_realizadas:** horas da semana naquela atividade, em decimal (1,5 = 1h30).
- **esforco_restante_h:** quantas horas a pessoa acha que ainda faltam para a saída verificável da atividade passar no aceite do dicionário. Zero só quando a saída passou.
- **saida_concluida:** `S` só quando o aceite do pacote passou na verificação; senão `N`.
- **impedimento:** o que travou, se travou.
- **Semanas 1 a 8:** lançadas uma vez, na reunião de apontamento de 15 minutos (plano, seção 7.4), conduzida por Matheus e Letícia. Quem não lembrar a hora exata informa a melhor estimativa **por atividade** e escreve "reconstituída" na observação.
- **Da semana 9 em diante:** cada aluno lança até o fim da própria aula da semana. A conferência é na reunião conjunta.

## Exemplo de linha

```
data;semana_letiva;equipe;aluno;atividade;horas_realizadas;esforco_restante_h;saida_concluida;impedimento;observacao
13/10/2026;9;PSW;Maria Clara;D09;3;4;N;;corrigir divisão no checkout (Q-06)
```

## Mensagem para a Letícia

> Oi, Letícia! Para o Status Report 2, o professor pediu o apontamento de horas por aluno e por atividade do cronograma, com o esforço restante. Montamos uma planilha simples (vai em anexo, no repositório em `GPTI/status-report-1/apontamento-de-horas.csv`). Cada linha tem aluno, atividade (D01 a D18), horas da semana, horas que faltam e se a entrega já passou no aceite. Pode começar esta semana? Na reunião de 13/10 a gente faz os 15 minutos para lançar as semanas 1 a 8 e conversa sobre a verificação do M1. Obrigado!
