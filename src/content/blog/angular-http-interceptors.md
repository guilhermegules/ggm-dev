---
title: "Angular HttpInterceptors ajudando no desenvolvimento mockado"
description: "Angular é um framework e uma plataforma para o desenvolvimento web, focado na modularização do código utilizando módulos ou ngModules para isso."
pubDate: "Sep 23 2020"
heroImage: "/blog-cover-default.png"
---

## **Um pouco de história**

Angular é um framework e uma plataforma para o desenvolvimento web, focado na modularização do código utilizando módulos ou ngModules para isso.

Quando estamos desenvolvendo uma aplicação Angular sempre pensamos na melhor forma para construir componentes, módulos, serviços etc.

Seguindo nessa linha contarei algo que foi necessário desenvolver durante um projeto, eu e o meu time estavámos sem back-end no momento e precisávamos seguir no desenvolvimento dos serviços para podermos concluir algumas tasks.

Começamos com um server json para simularmos as requisições, mas acabou se tornando insustentável esse método por questões do projeto e arquitetura, assim com Interceptors podiámos criar o serviços de forma que fosse simples atualizar os mesmos quando fosse necessário, assim melhorando a modularidade da aplicação.

## **O que são os HttpInterceptors?**

Básicamente falando são interceptadores de requisições Http, eles servem para configurar e enviar requisições para o servidor.

Assim podemos fazer um milhão de coisas, um exemplo seria uma autenticação via token em qualquer requisição, ou até tratar respostas antes de terminar a requisição.

Partiu desenvolver :)

Para que você consiga realizar todos os passos mostrados aqui você precisará do Node instalado, caso você não tenha aqui têm um bom tutorial de instalação:

[Tutorial instalação](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/) node para Ubuntu

Seguindo vamos precisar do CLI do Angular, para instalar o mesmo é bem simples:

`npm install -g @angular/cli`

Depois disso podemos criar o nosso projeto Angular dessa forma:

`ng new InterceptorExample`

Após criar o nosso projeto podemos começar criando o interceptor que estaremos utilizando:

`ng generate interceptors interceptor-name [--options]`

Você terá um estrutura parecida com essa:

```ts
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Seu código aqui
  }
}
```

Explicando um pouco o funcionamento dos interceptors.

request: HttpRequest<any>

Esse parâmetro é responsável por cuidar das requisições que irão entrar no nosso interceptor.

next: HttpHandler

Responsável por dizer qual será o próximo passo da nossa requisição.

## **Criando Service:**

Agora vamos criar um serviço que irá consumir essa requisição, podemos criar um serviço com o CLI do angular:

`ng generate service nome-do-serviço`

Após criar o serviço vamos definir um método para fazer a requisição GET

```tsx
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:4200/users");
  }
}
```

Agora vamos alterar o nosso arquivo `backend.interceptor.ts`

Vamos adicionar um pequeno código para intecerptar a requisição quando for solicitado pelo nosso get que foi criado agora a pouco.

```ts
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    apiUrl = "http://localhost:4200";

    const { url, method, body } = request;

    if (method === "GET") {
      return of(
        new HttpResponse({
          status: 200,
          body: JSON.parse(localStorage.getItem("users")),
          statusText: "Get all users",
          url: `${this.apiUrl}/users`,
        })
      );
    }
  }
}
```

Bom agora o nosso interceptor vai ficar esperando a nossa rota enviar o que precisa e assim responder de acordo caso nosso método for um GET.

Nesse exemplo vamos retornar no objeto body da nossa requisição o json que temos no nosso localStorage.

Para mais informações consultem esse [repositório](https://github.com/guilhermegules/angular-interceptor-poc) aqui temos a implementação completa de um CRUD utilizando interceptors.

Mas não esqueça que os [interceptors](https://angular.io/api/common/http/HttpInterceptor) são ferramentas que podemos utilizar para muitas outras situações, a ideia aqui é mostrar o que pode ser feito de uma maneira simples para que possamos entender o funcionamento dessa interface do Angular.
