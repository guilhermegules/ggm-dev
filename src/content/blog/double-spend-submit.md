---
title: O que é Double Spend/Submit?
description: O mesmo problema com nome diferente
pubDate: Apr 27 2026
heroImage: /blog-cover-default.png
---

Double spend e double submit são, na prática, variações do mesmo problema: **a mesma ação sendo processada mais de uma vez**.

A diferença entre eles está muito mais no contexto do que na essência:

- **Double spend** aparece com mais frequência em pagamentos e transações financeiras
- **Double submit** é mais comum em formulários e interações de interface

Mas no fundo, ambos representam uma falha de controle sobre **idempotência e consistência**.

## Como isso acontece?

Esse tipo de problema é mais comum do que parece e nem sempre envolve má intenção.

Alguns cenários clássicos:

- O usuário clica duas vezes no botão “Enviar”
- O frontend dispara o mesmo request mais de uma vez (bug ou race condition)
- Existe um mecanismo de retry automático (timeout, falha de rede, etc.)
- Requests idênticos são enviados em paralelo (inclusive de forma maliciosa)

O resultado disso é o sistema acabar criando informações em duplicidade quando deveria existir apenas uma.

## O erro comum: tentar resolver em um único lugar

Uma armadilha comum é tratar esse problema como se tivesse uma solução única.

Na prática, **não existe bala de prata aqui**.

A abordagem correta é trabalhar com **camadas de proteção**.

## Camada 1: Frontend (prevenção de erro humano)

No frontend, o foco é melhorar a experiência do usuário e evitar ações duplicadas acidentais.

Algumas estratégias:

- Desabilitar o botão após o primeiro clique
- Exibir estado de loading
- Bloquear novos submits enquanto a requisição está em andamento

Isso reduz bastante erros involuntários.

Mas tem um limite importante, **frontend não é uma fonte confiável de verdade**.

Ele pode ser ignorado, manipulado ou completamente bypassado.

## Camada 2: Backend (idempotência)

Aqui é o coração da solução.

Idempotência significa que, ao executar a mesma operação múltiplas vezes produz o mesmo resultado que executá-la apenas uma vez.

Na prática, o backend precisa ser capaz de responder essa pergunta: “Eu já processei esse request antes?”

### Como fazer isso?

A estratégia mais comum é o uso de **chaves de idempotência**.

Essa chave pode ser enviada pelo client (ex: UUID por ação) ou gerada pelo servidor com base nos dados da operação.

#### Cliente vs Servidor

- **Cliente**: mais simples, mas depende de confiança
- **Servidor**: mais robusto, pois define claramente o que é “a mesma ação”

**Em sistemas críticos, a geração no servidor tende a ser a melhor escolha.**

## Camada 3: Banco de dados

Mesmo com idempotência, o banco ainda é uma linha de defesa essencial.

Aqui devemos utilizar **constraints de unicidade**.

**Exemplos:**

- Um email único em uma newsletter
- Um `order_id` único em compras
- Um `transaction_id` único em pagamentos

Mesmo que dois requests escapem das camadas anteriores, o banco impede a duplicação.

### Conclusão

Double submit/double spend não são problemas isolados são sintomas de sistemas que não tratam corretamente a repetição de ações.

Se você está lidando com qualquer tipo de operação crítica, devemos olhar para os sintomas, focar em corrigir e blindar o sistema contra esses problemas na causa raiz.