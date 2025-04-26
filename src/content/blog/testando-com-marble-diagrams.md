---
title: "Testando RxJS com marble diagrams"
description: "Quando estamos utilizando Observables sempre há uma dificuldade em como organizar os testes para que possamos entender e testar toda a nossa stream. Podemos testar da forma mais “simples” utilizando subscribes para validar os valores da nossa subscription, porém temos uma outra abordagem para testes reativos e os mesmos podem ser feitos com um Scheduler nativo da biblioteca."
pubDate: "Mar 26 2023"
heroImage: "/blog-cover-default.png"
---

Quando estamos utilizando Observables sempre há uma dificuldade em como organizar os testes para que possamos entender e testar toda a nossa stream. Podemos testar da forma mais “simples” utilizando subscribes para validar os valores da nossa subscription, porém temos uma outra abordagem para testes reativos e os mesmos podem ser feitos com um Scheduler nativo da biblioteca.

Por isso foi criado o TestScheduler que é uma classe de utilidade e que podemos usar para ter um ambiente de teste assíncrono e confiar no resultado.Para começar, primeiro precisamos entender o conceito de hot e cold Observables. Com isso podemos entender mais facilmente como os diagramas funcionam.

## **Hot Observables**

Esse tipo de Observable pode emitir mais de uma vez, ou seja, geram um producer para multiplos subscribes, podem muitas vezes atuar como listeners e conter informações diferentes com o passar do tempo. Esses Observables vão “produzir” valores mesmo quando não houver ninguém se inscrevendo nos mesmos, diferentemente do cold Observable, um exemplo prático de um hot Observable seria um Subject.

## **Cold Observables**

Os Observables “gelados” geram um producer para cada subscriber, ou seja, toda vez que alguém se interessa e se inscreve, o Observable irá gerar um novo produtor de dados, um exemplo prático de um cold Observable seria uma requisição HTTP.

## Sintaxe de marble

> Isso é uma simplificação da explicação disponível na documentação

- ' ' whitespace: espaços são ignorados, é útil para alinhar múltiplos diagramas;
- '-' frame: 1 "frame" de tempo decorrido;
- [0-9]+[ms|s|m] time progression: Essa é a sintaxe de progressão virtual de tempo, que se baseia em um número junto de uma unidade de tempo, ms (milisegundos), s (segundos), m (minutos). Leia a documentação na seção de Time progression syntax para mais detalhes;
- '|' complete: Simboliza a conclusão com sucesso de um Observable, equivalente a utilizarmos um complete() de um Subject;
- '#' error: Simboliza a finalização com erro de um Observable, utiliza-se para ativar producer de error() ;
- [a-z0-9]: Qualquer caractere alfanúmerico: Representa um valor emitido por um producer next();
- '^' subscription point: (Apenas para Observables hot) Simboliza o ponto em que o Observable irá ter a sua inscrição iniciada, esse é o frame zero para esses Observables, todos os frames antes do ^ serão negativos;
- '()' sync groups: Quando multiplos eventos precisam estar no mesmo frame de forma sincrona, os eventos que precisamos emitir nesse mesmo frame vamos adicionar nesse grupo com os parenteses, por exemplo (abc) , aqui vamos emitir os valores abc no mesmo frame.

Primeiro vamos testar um service de todos, esse service contém um BehaviorSubject dois getters e um método que modifica o esse mesmo Subject:

```ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);

  get todos$() {
    return this.todos.asObservable();
  }

  get todosCount$() {
    return this.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.completed).length)
    );
  }

  addTodo(todo: Todo) {
    this.todos.next([...this.todos.value, todo]);
  }
}
```

## **Testes com o padrão subscribe/done:**

Um caso em que não há necessidade de utilizar marbles são os testes de serviços http, o test scheduler foi criado para testar regras negócio reativas complexas, operadores que podem ter muitos fluxos, [aqui temos mais alguns pontos sobre isso](https://stackoverflow.com/questions/60797546/how-can-i-write-unit-tests-for-angulars-httpclient-with-jasmine-marbles).

Um pequeno exemplo de testes de serviços http, utilizando HttpClientTestingModule:

Implementação:

```ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "../models/posts.mode";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private readonly API = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.API}/posts`)
      .pipe(
        map((posts) =>
          posts.map((post) => ({ ...post, title: post.title.toUpperCase() }))
        )
      );
  }
}
```

Teste:

```tsx
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getPosts", () => {
    it("should get posts", (done) => {
      const postsMock = [
        {
          userId: 1,
          id: 1,
          title: "Test title 1",
          body: "test body 1",
        },
        {
          userId: 2,
          id: 2,
          title: "Test title 2",
          body: "test body 2",
        },
      ];

      service.getPosts().subscribe((posts) => {
        expect(posts).toEqual(
          postsMock.map((post) => ({
            ...post,
            title: post.title.toUpperCase(),
          }))
        );
        done();
      });

      httpMock
        .expectOne("https://jsonplaceholder.typicode.com/posts")
        .flush(postsMock);
    });
  });
});
```

Agora vamos partir para os casos que serão demonstrados aqui no artigo com o TodoService.

```tsx
it("should add todo on list with done", (done) => {
  service.addTodo({ completed: true, id: 1, title: "First todo" });
  service.todos$.subscribe((todos) => {
    expect(todos).toEqual([{ completed: true, id: 1, title: "First todo" }]);
    done();
  });
});
```

Esse caso de teste é bem simples, onde estamos assinando um valor no nosso Subject e logo após nos inscrevendo para interagir com o Observable de todos$, nesse caso também devemos observar o uso da função done(), essa função que é a responsável por fechar a nossa Subscription e garantir que o expect foi executado da maneira esperada, sem ela não podemos confiar em expects dentro do Subscribe, falsos positivos podem ocorrer por conta de um delay em fluxos mais complexos de Observables ou pequenas alterações, que podem ocorrer durante o decorrer do fluxo reativo, nos testes de Observables.

Mas nem sempre precisamos do done(), quando os expects não necessitam serem validados em algum fluxo async, por exemplos cold Observables, conseguimos evitar o uso do done(), o mesmo pode ter alguns comportamentos errôneos, ainda mais em casos de callback de error que podem ser um pouco complexos de testar.

Exemplo de um teste de Observable, sem done e que não tem falso positivo:

```tsx
import { of } from "rxjs";

describe("Test with observables without done", () => {
  it("should set values on the list", () => {
    const list: string[] = [];

    of("Hello", "RxJS").subscribe((value) => {
      list.push(value);
    });

    expect(list).toEqual(["Hello", "RxJS"]);
  });
});
```

## **Testes com TestScheduler:**

Para haver um bom uso de marbles, podemos pegar pequenas partes das streams e ir testando a passagem de tempo, por exemplo, serviços de estado podem se valer muito bem dos testes com marbles, assim como fluxos reativos com regra de negócio que podem ter muitos desvios e complexidade para mockar e validar passo a passo utilizando o padrão de subscribe/done.

```tsx
it("should add todo on list", () => {
  testScheduler.run((helpers) => {
    const { expectObservable } = helpers;
    const expected = "a";
    const value = {
      a: [
        {
          completed: false,
          id: 1,
          title: "First todo",
        },
        {
          completed: false,
          id: 2,
          title: "Second todo",
        },
      ],
    };

    service.addTodo({
      completed: false,
      id: 1,
      title: "First todo",
    });

    service.addTodo({
      completed: false,
      id: 2,
      title: "Second todo",
    });

    expectObservable(service.todos$).toBe(expected, value);
  });
});
```

Como podemos ver, foi representado com o mesmo cenário testado com subscribe/done por se tratar de um cenário bem simples pode-se notar que há bem mais complexidade nesses testes, portanto devemos utilizar essas abordagens com calma e em casos mais complexos, como os próximos casos demonstrados.

Um caso em que há uma grande vantagem ao utilizar marbles é quando precisamos lidar com a passagem de tempo, de uma forma que seja simples de escrever e não precisamos nos preocupar com efeitos de passagem do tempo como tick().

Tendo em vista esse Observable de contagem de todos:

```tsx
get completedTodosCount$() {
  return this.todos$.pipe(
    debounceTime(200),
    map((todos) => todos.filter((todo) => !todo.completed).length)
  );
}
```

Precisamos garantir que será retornado o número de todos completados, porém, temos um delay de 200 milissegundos nessa operação, como podemos testar isso?

```tsx
it("should get the count of todos when is incomplete", () => {
  testScheduler.run((helpers) => {
    const { expectObservable } = helpers;
    const expected = "200ms a";
    const value = {
      a: 1,
    };
    const todo1 = {
      completed: true,
      id: 1,
      title: "First todo",
    };
    const todo2 = {
      completed: false,
      id: 2,
      title: "Second todo",
    };

    service.addTodo(todo1);
    service.addTodo(todo2);

    expectObservable(service.completedTodosCount$).toBe(expected, value);
  });
});
```

O que precisamos fazer é apenas adicionar a passagem de tempo antes da emissão de “a”, no nosso caso 200ms, dessa forma passamos em forma de diagrama o que é esperado da nossa stream.

## **Conclusão**

Como podemos ver, nesses cenários, os testescom marble são superpoderosos e são ferramentas a mais no nosso cinto de utilidades para criarmos testes confiáveis, mas também não temos necessidade de aplicarmos esse modelo de teste em todo os casos possíveis, pois eles acabam adicionando complexidade em casos que apenas um subscribe/done já resolveria muito bem.

## **Links úteis**

- [Repositório com todos os testes desse artigo](https://github.com/guilhermegules/marble-test-poc)
- [Angular Testing: Avoid done() function](https://www.piotrl.net/angular-testing-avoid-done/)
- [Testing RxJS Code with Marble Diagrams](https://rxjs.dev/guide/testing/marble-testing)
