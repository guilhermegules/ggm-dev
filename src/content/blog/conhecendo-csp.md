---
title: "Conhecendo Content Security Policy (CSP)"
description: "A segurança na web é uma preocupação constante. Todos os dias, milhares de sites são comprometidos por ataques como Cross-Site Scripting (XSS), permitindo que invasores executem scripts maliciosos em páginas legítimas."
pubDate: "Feb 08 2025"
heroImage: "/blog-cover-default.png"
---

A segurança na web é uma preocupação constante. Todos os dias, milhares de sites são comprometidos por ataques como **Cross-Site Scripting (XSS)**, permitindo que invasores executem scripts maliciosos em páginas legítimas.

Imagine um cenário onde um usuário acessa um site confiável, mas um script injetado rouba seus dados de login e os envia para um atacante. Infelizmente, esse tipo de ataque ainda é **comum** e pode ter consequências graves.

Uma forma eficaz de **mitigar ataques XSS e proteger aplicações web** é a implementação do **Content Security Policy (CSP)**.

## O que é XSS?

XSS ou Cross site Scripting é um tipo de vulnerabilidade de segurança em aplicações web que permite a injeção de scripts maliciosos em páginas visualizadas por outros usuários. Esses scripts podem roubar informações sensíveis, como cookies de sessão, redirecionar usuários para sites maliciosos, modificar o conteúdo da página e até mesmo realizar ações em nome do usuário sem seu consentimento.

## O que é CSP?

Content Security Policy (CSP) é um recurso de segurança essencial que ajuda a prevenir vários tipos de ataques, como Cross-Site Scripting (XSS) e ataques de injeção de dados. Ao definir um conjunto de regras de segurança para aplicativos web, o CSP restringe as fontes de onde o conteúdo pode ser carregado, reduzindo o risco de execução de código malicioso.

CSP é um cabeçalho de resposta HTTP ou uma meta tag que define quais recursos podem ser carregados e executados dentro de uma página da web. Ele funciona como um mecanismo de segurança baseado em lista de permissões, garantindo que apenas scripts, estilos, imagens e outros recursos explicitamente permitidos sejam carregados.

### Principais características do CSP

- **Mitigação contra ataques XSS**: Impede a execução de scripts não autorizados.
- **Controle sobre o carregamento de recursos**: Limita as fontes de onde scripts, imagens e outros ativos podem ser carregados.
- **Prevenção de ataques de injeção de dados**: Bloqueia a injeção e execução de código malicioso no navegador.
- **Redução da superfície de ataque**: Ajuda a impor boas práticas de segurança, limitando dependências externas.

## Como implementar CSP?

O CSP pode ser implementado adicionando um cabeçalho HTTP `Content-Security-Policy` na configuração do servidor web ou através de uma `<meta>` tag diretamente no HTML.

### Exemplo via tag meta

Pode se definir a CSP diretamente no HTML dessa forma:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com;"
/>
```

### Desmembrando as Definições

1. **`http-equiv="Content-Security-Policy"`**

- Indica que esta meta tag define uma **Política de Segurança de Conteúdo (CSP)**.

1. **`content="..."`** (Diretivas da CSP)

O atributo `content` contém regras de segurança que controlam o carregamento de recursos na página. Vamos analisá-las em detalhe:

- **`default-src 'self'`**
  - Define a origem padrão para o carregamento de recursos, como scripts, estilos e imagens.
  - O valor `'self'` permite apenas recursos provenientes do mesmo domínio da página.
- **`script-src 'self' 'unsafe-inline' https://apis.google.com;`**
  - Especifica de onde os scripts podem ser carregados.
  - `'self'` restringe o carregamento de scripts ao próprio domínio.
  - `'unsafe-inline'` permite a execução de scripts inline, como `<script>alert('Hello')</script>`, o que pode representar um risco de segurança.
  - `https://apis.google.com` autoriza scripts carregados especificamente desse domínio externo.

### **Exemplo mais seguro com tag meta**

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'nonce-abcdef'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
/>
```

### **Explicação das mudanças**

- **`'nonce-abcdef'`** no `script-src`
  - Permite apenas scripts que tenham um `nonce` correspondente, evitando execução de scripts injetados.
  - Exemplo de uso:
    ```html
    <script nonce="abcdef">
      console.log("Safe script");
    </script>
    ```
- **`'unsafe-inline'` no `style-src`**
  - Permite estilos inline (`<style>...</style>` ou `style=""` em elementos).
- **`img-src 'self' data:`**
  - Permite imagens do próprio domínio e imagens embutidas em `data:` (Base64).

### **Limitações do `<meta>`**

- Não pode controlar `frame-ancestors` (proteção contra `clickjacking`).
- Algumas políticas avançadas, como `upgrade-insecure-requests`, não funcionam corretamente.
- O cabeçalho HTTP oferece maior controle e proteção.

### Exemplo de cabeçalho CSP

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:
```

Esse cabeçalho pode ser implementado no backend ou até diretamente em um servidor web como NGINX, onde conseguimos as vantagens da meta tag e mais flexibilidade caso haja a necessidade de múltiplas definições.

## Conclusão

O CSP é uma ferramenta poderosa para melhorar a segurança de aplicativos web. Ao aprender e implementar o CSP de maneira eficaz, os desenvolvedores podem proteger os usuários contra ameaças de segurança comuns, garantir conformidade com padrões de segurança e criar aplicativos web mais resilientes. Com a abordagem certa, o CSP pode melhorar significativamente a postura geral de segurança de qualquer projeto web.

> **Observação importante:** Não se trata de um conteúdo elaborado por um especialista em segurança, sendo uma tentativa de aprofundamento no tema. Caso sejam identificados pontos de melhoria, comentários construtivos são bem-vindos.

## Referencias

- [Content security policy Web.dev](https://web.dev/articles/csp)
- [Content Security Policy (CSP) MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Content Security Policy (CSP): What Every Web Developer Must Know](https://www.writesoftwarewell.com/content-security-policy/)
- [O que é um ataque de cross-site scripting? Definição e explicação](https://www.kaspersky.com.br/resource-center/definitions/what-is-a-cross-site-scripting-attack)
- [O que é clickjacking?](https://www.kaspersky.com.br/resource-center/definitions/clickjacking)
