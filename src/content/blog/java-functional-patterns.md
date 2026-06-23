---
title: "Java com Padrões Funcionais"
description: "Como as Functional Interfaces se Aplicam ao Design Orientado a Objetos."
pubDate: "Apr 22 2026"
heroImage: "/blog-cover-default.png"
---

Historicamente, o Java foi construído sobre uma base estrita de Orientação a Objetos onde [“tudo é um objeto”](https://www.infoworld.com/article/2162210/everything-is-an-object-part-1.html). Até o Java 7, quando precisávamos encapsular uma lógica para ser executada em outro ponto do sistema, como um filtro de lista ou um listener de eventos, uma abordagem era utilizar Classes Anônimas.

Embora funcional, essa abordagem trazia uma carga cognitiva e sintática pesada:

```java
Collections.sort(usuarios, new Comparator<Usuario>() {
    @Override
    public int compare(Usuario u1, Usuario u2) {
        return u1.getNome().compareTo(u2.getNome());
    }
});
```

Nesse modelo, o que realmente importava era apenas a expressão dentro do método compare, mas o desenvolvedor era forçado a lidar com o "boilerplate" de instanciar uma classe e sobrescrever o método.

## Composição > Verbosidade

A introdução das Interfaces Funcionais no Java 8 não representou um abandono da Orientação a Objetos, mas sim uma evolução em direção ao design híbrido. A tese central é que a Programação Funcional (FP) provê ao OOP ferramentas superiores de composição.

Enquanto a herança clássica tende a criar hierarquias rígidas, o uso de interfaces funcionais permite que o comportamento seja tratado como um dado: ele pode ser passado como parâmetro, retornado por métodos e, principalmente, combinado. Isso reduz o acoplamento e favorece o princípio de responsabilidade única, permitindo que objetos foquem em estado enquanto as interfaces funcionais definem a estratégia de execução.

## Single Abstract Method (SAM)

O alicerce dessa mudança é o conceito de SAM (Single Abstract Method). Para o compilador do Java, qualquer interface que possua exatamente um método abstrato é considerada uma Interface Funcional.

Diferente de interfaces complexas que definem múltiplos comportamentos (como List ou Map), as SAMs focam em uma única intenção. A anotação @FunctionalInterface serve como um contrato de design:

- **Validação em tempo de compilação:** Garante que a interface não terá acidentalmente um segundo método abstrato inserido no futuro.
- **Clareza Semântica:** Indica para outros desenvolvedores que aquela interface é destinada a ser utilizada via Lambdas ou Method References.

É importante notar que métodos default ou métodos static dentro da interface não invalidam sua natureza funcional, pois eles possuem implementação. O critério reside estritamente na existência de apenas um método que demande implementação futura.

## Conclusão

A introdução de interfaces funcionais não eliminou a Orientação a Objetos no Java ela removeu pontos que geravam mais problema no como do que no porque. O que antes exigia estruturas verbosas passou a ser expresso de forma direta e com encademaneto de funções que podem ser compostas.

Retomando o exemplo inicial, podemos reescrevê-lo utilizando uma interface funcional já existente na API (Comparator), explorando lambdas e method references:

```java
Collections.sort(usuarios, Comparator.comparing(Usuario::getNome));
```

Nesse formato, a intenção do código se torna evidente: estamos apenas definindo como comparar, sem nos preocupar com como estruturar essa lógica.

Não estamos apenas reduzindo linhas de código, essa abordagem reforça um princípio importante: **comportamento deve ser simples de declarar, fácil de combinar e natural de reutilizar.**

É nesse ponto que a programação funcional deixa de ser um paradigma separado e passa a atuar como uma extensão prática da própria orientação a objetos no Java moderno.
