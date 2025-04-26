---
title: "Arquitetura de BFF e seus benefícios"
description: "A arquitetura de BFF (Backends For Frontends) é uma abordagem que permite aos desenvolvedores frontend terem mais autonomia na criação de seus projetos. Isso é especialmente útil na maneira como eles irão agregar os endpoints."
pubDate: "Apr 04 2024"
heroImage: "/blog-cover-bff.png"
---

A arquitetura de BFF (Backends For Frontends) é uma abordagem que permite aos desenvolvedores frontend terem mais autonomia na criação de seus projetos. Isso é especialmente útil na maneira como eles irão agregar os endpoints. O principal benefício desta estratégia é que ela permite que o desenvolvimento seja guiado por aqueles que irão consumir o BFF, neste caso, os desenvolvedores frontend. Isto porque, em geral, são estes profissionais que têm um maior entendimento do contexto de uso e das necessidades específicas do projeto. Portanto, eles são os mais indicados para tomar decisões sobre a implementação.

O padrão de desenvolvimento Backend For Frontend (BFF) é uma abordagem que nos ajuda a repensar a forma como as aplicações client-side interagem com as APIs de serviço. De acordo com esse padrão, as aplicações client-side não devem se comunicar diretamente com a API de serviço, mas sim com uma camada separada que funciona como um middleware. Essa camada intermediária tem a responsabilidade de agrupar as chamadas da API backend. Dessa forma, é possível simplificar a comunicação e melhorar a eficiência do sistema, já que as solicitações são agrupadas de maneira inteligente, reduzindo a necessidade de múltiplas chamadas de API individuais.

## Gateway API pattern

API Gateway é um componente central em arquiteturas de microserviços e na exposição de serviços na web. Funciona como um ponto de entrada único para várias APIs, permitindo a criação, gerenciamento e monitoramento de APIs de forma centralizada.

Ele atua como um intermediário entre clientes e serviços, fornecendo funcionalidades como roteamento de solicitações, autenticação, autorização, transformação de dados, controle de acesso e monitoramento de tráfego.Isso simplifica o desenvolvimento de aplicativos, garantindo segurança, escalabilidade e desempenho consistentes.

Atuando como um ponto único de entrada na utilização das APIs, o padrão em questão assegura a resiliência mencionada anteriormente. Com base nesse padrão, foi desenvolvida a arquitetura de BFF (Backend For Frontend), na qual cada BFF funciona como um gateway dedicado para cada cliente.

## Por que BFF?

A estratégia de desacoplar o Backend e o Frontend é essencial para criar uma experiência de desenvolvimento Frontend eficaz e agradável. Isto envolve a construção de um Backend específico, concebido para atender às necessidades únicas do projeto Frontend.

Esta abordagem permite que cada componente seja desenvolvido e otimizado independentemente, resultando em um produto final mais robusto e eficiente. Além disso, a separação do Backend e do Frontend promove uma melhor colaboração entre as equipes, já que cada uma pode se concentrar em sua área de especialidade.

## Quando usar BFF?

O uso de BFFs se torna necessário quando temos múltiplos microserviços e a aplicação client-side precisa integrar e orquestrar todas essas integrações. Com um BFF para atender às necessidades desse cliente, a tendência é que a complexidade dessas integrações seja transferida do lado do cliente para o BFF, simplificando assim integrações que poderiam envolver 3 ou 4 endpoints, tornando-se uma integração de apenas 1 endpoint para o Frontend.

No diagrama abaixo podemos ver um exemplo de como é uma arquitetura utilizando um API Gateway, onde as chamadas via client batem nesse gateway e o mesmo direciona para o serviço certo.

![Desenho API Gateway](/posts/post-bff-arch-1.png)

Já aqui podemos ver uma implementação de BFF, onde temos “gateways” específicos para cada necessidade, podendo ter um agrupamento de chamadas para WEB e para o mobile não ter necessidade visto que cada BFF irá lidar com as necessidades de cada produto.

![Desenho BFF conectado com serviços](/posts/post-bff-arch-2.png)

## Contras do uso de BFF?

Como todas as escolhas técnicas, a aplicação do padrão BFF tem algumas desvantagens. A principal é que temos mais um serviço para manter e escalar. Mesmo que um BFF tenda a ser simples em sua essência, ele pode crescer e se tornar difícil de manter. Isso exige que a equipe responsável (normalmente a equipe de Frontend) seja prudente nas implementações e assuma uma responsabilidade adicional além da criação das interfaces, pois agora integraremos o BFF no serviço backend e o Frontend no BFF.

## Como a arquitetura de BFF gera valor ao negócio?

Como mencionado anteriormente, com BFFs podemos reduzir a carga de processamento no Frontend, obtendo payload e respostas com apenas o necessário para o client-side, com a simplificação da agregação de chamadas de API e a otimização dos processos de Frontend. Isso nos permite executar processos complexos no lado do servidor, tornando o Frontend mais leve e proporcionando uma melhor experiência para o usuário final.

Por todos esses motivos, a arquitetura de BFFs demonstra ser uma estratégia valiosa, que pode trazer diversos benefícios tanto para o processo de desenvolvimento quanto para o produto final.

## Referências

[Introduction - BFF Patterns](https://bff-patterns.com/)

[Sam Newman - Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)

[Backend For Frontend: Uma estratégia sob demanda para a entrega de microsserviços](https://medium.com/jeitosanar/backend-for-frontend-uma-estratégia-sob-demanda-para-a-entrega-de-microsserviços-2f12d4cb9e3f)

[Backend for frontend (BFF) pattern— why do you need to know it?](https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0)

[Perguntas frequentes sobre o Amazon API Gateway | Gerenciamento de APIs | Amazon Web Services](https://aws.amazon.com/pt/api-gateway/faqs/)
