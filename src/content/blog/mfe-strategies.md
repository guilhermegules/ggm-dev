---
title: "Microfrontends com importmaps, iframe ou SingleSPA?"
description: "Com o crescimento de aplicações web complexas, surge a necessidade de escalar equipas e tecnologias de forma independente."
pubDate: "Fev 2 2026"
heroImage: "/blog-cover-default.png"
---

## Introdução

Com o crescimento de aplicações web complexas, surge a necessidade de escalar equipas e tecnologias de forma independente. Os microfrontends vêm como uma solução arquitetónica que permite a separação do frontend em múltiplos módulos autónomos, semelhantes aos microserviços no backend.

Este artigo explora três abordagens populares para implementar microfrontends: Import Maps, iFrames e SingleSPA.

<hr />

## O Que São Microfrontends?

Microfrontends são uma forma de dividir uma aplicação frontend monolítica em partes menores, permitindo que equipas diferentes desenvolvam, implementem e escalem funcionalidades de forma independente.

### 1. Import Maps

Import maps permitem especificar mapeamentos de módulos JavaScript diretamente no HTML, facilitando o carregamento de scripts hospedados separadamente.
Vantagens:

- Carregamento dinâmico via `import()`;
- Sem necessidade de bundlers pesados;
- Ideal para aplicações modernas com módulos ES.

Exemplo:

```html
<script type="importmap">
{
  "imports": {
    "app1": "https://cdn.exemplo.com/app1/index.js"
  }
}
</script>

<script type="module">
  import 'app1';
</script>
```

Quando usar:

- Projetos modernos em que o navegador já suporta módulos nativos;
- Necessidade de integração simples entre módulos sem uma framework complexa.

### 2. iFrames

iFrames isolam completamente os microfrontends ao nível do DOM, CSS e JavaScript.

**Vantagens:**
- Isolamento total de contexto (ideal para segurança)
- Integração com qualquer stack tecnológica

**Desvantagens:**
- Comunicação entre iframes é mais complexa (via postMessage)
- Performance limitada em dispositivos móveis

**Quando usar:**
- Quando os microfrontends são aplicações completas
- Ambientes que exigem forte isolamento

### 3. SingleSPA

SingleSPA é uma framework que permite montar múltiplas aplicações frontend em tempo de execução.

Vantagens:
- Suporta múltiplos frameworks (React, Vue, Angular, etc.)
- Sistema de roteamento integrado
- Grande comunidade e suporte

Exemplo:

```js
registerApplication({
  name: '@exemplo/navbar',
  app: () => System.import('@exemplo/navbar'),
  activeWhen: ['/']
});
```

Quando usar:
- Necessidade de integração com frameworks diferentes
- Aplicações SPA com navegação complexa

## Conclusão

Microfrontends não são uma solução universal, mas sim uma decisão arquitetónica que deve ser tomada com base no contexto do produto, da equipe e dos requisitos técnicos.

As abordagens apresentadas Import Maps, iFrames e SingleSPA, resolvem o mesmo problema central (desacoplamento e escalabilidade do frontend), porém com trade-offs bem diferentes.

Import Maps destacam-se pela simplicidade e aderência aos padrões modernos da web, sendo ideais para cenários em que se deseja baixo overhead e integração direta entre módulos. iFrames, apesar das limitações de comunicação e performance, continuam relevantes quando o isolamento total e a segurança são prioridades. Já o SingleSPA oferece uma solução mais robusta e madura para aplicações SPA complexas, especialmente quando há múltiplos frameworks e equipas a coexistirem no mesmo ecossistema.

A escolha da abordagem correta depende do nível de isolamento necessário, da complexidade da navegação, da diversidade tecnológica e da maturidade do time.

## Referências

- [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [Import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap)
- [Exemplos Iframe](https://github.com/guilhermegules/mfe-playground/tree/main/mf-iframes)
- [Exemplos Single SPA](https://github.com/guilhermegules/mfe-playground/tree/main/single-spa)
- [Exemplos Import Map](https://github.com/guilhermegules/mfe-playground/tree/main/importmap)
