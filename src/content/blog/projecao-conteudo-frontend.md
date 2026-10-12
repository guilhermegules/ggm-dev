---
title: "Projeção de conteúdo no Front-end"
description: "projeção de conteúdo é uma forma de um componente utilizar dados/estruturas vindas de um outro componente, com isso nós temos muito poder de criação e customização de componentes."
pubDate: "Nov 28 2023"
heroImage: "/blog-cover-default.png"
---

## O que é projeção de conteúdo (content projection)?

projeção de conteúdo é uma forma de um componente utilizar dados/estruturas vindas de um outro componente, com isso nós temos muito poder de criação e customização de componentes.

Bibliotecas ou _frameworks_ nos dão essas possibilidades, Como no _angular_, que temos _ng-content_ para projeção direta de conteúdo*, ngTemplateOutlet* para definirmos o que será projetado no local desse template, _ngTemplateOutletContext_ para passarmos dados de um _template_ para o pai desse _template_ e por fim o _ngTemplateOutletInjector_ que nos permite passar algum [_injector_](https://angular.io/api/core/Injector) via _template_.Já com _React_ temos os _Slots_, que são muito similares ao _ng-content_ e com ele podemos definir diferentes partes do nosso componente que irão receber conteúdo para ser projetado.

## Quais problemas a projeção de conteúdo quer resolver?

Com a projeção de conteúdo conseguimos criar componentes mais customizáveis e agnósticos a estrutura geral, assim caso necessário podemos realizar mudanças no uso desse componente sem a necessidade de modificá-lo internamente.

## Como projetar conteúdo com Angular?

Dentro do Angular temos como projetar conteúdo de um jeito simples com o [_ng-content_](https://angular.io/api/core/ng-content), utilizando seletores ou não.

A principal vantagem de utilização do _ng-content_ é a simplicidade do seu uso e como podemos adicionar “poderes” às nossas projeções com os seletores, assim podemos customizar as seções
dessa projeção.

```html
<app-card>
  <header>My card</header>
  <p>Content</p>
  <footer>Footer</footer>
</app-card>
```

Além da projeção básica podemos adicionar _labels_ para nossos seletores, assim conseguimos adicionar partes nos locais desejados

```html
<app-card>
  <h2 header>My card</h2>
  <p>Content</p>
  <p footer>Footer</p>
</app-card>
```

## **Como projetar conteúdo com React?**

Com React podemos passar valores como _children_, dessa forma conseguimos, por exemplo utilizar uma div com outros três componentes que o nosso componente (Card) que está esperando essa prop e irá renderizar essa porção de UI.

```tsx
<Card>
  <p>Content</p>
</Card>
```

Além da prop children, podemos utilizar outras props para compor melhor o nosso componente

```tsx
<Card header={<header>Header</header>} footer={<footer>Footer</footer>}>
  <p>Content</p>
</Card>
```

Até aqui já temos algo bem interessante, com _type-safety_ se estivermos usando TypeScript. Mas podemos melhorar e facilitar essa implementação com uma composição de componentes.

```tsx
<Card>
  <Card.Header>
    <h2>My header</h2>
  </Card.Header>
  <p>Content</p>
  <Card.Footer>
    <p>Footer</p>
  </Card.Footer>
</Card>
```

Para atingirmos o resultado acima iremos criar mais dois componentes, _header_ e _footer_, esses componentes nos ajudarão a compor melhor o componente _Card_

Componente _Header_:

```tsx
type CardHeaderProps = {
  children: React.ReactNode;
};

export const CardHeader = ({ children }: CardHeaderProps) => {
  return <header>{children}</header>;
};
```

Componente _Footer_:

```tsx
type CardFooterProps = {
  children: React.ReactNode;
};

export const CardFooter = ({ children }: CardFooterProps) => {
  return <footer>{children}</footer>;
};
```

Componente _Card_ finalizado:

```tsx
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";

type CardProps = {
  children?: React.ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return (
    <div
      style={{
        background: "#ccc",
        borderRadius: "10px",
        width: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8px",
      }}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
```

Agora conseguimos uma solução bem mais flexível e customizável, além de que temos uma nomenclatura que faz bastante sentido, assim conseguimos ver cada parte do nosso componente sendo utilizada em conjunto.

## [RFC: Slots](https://github.com/reactjs/rfcs/pull/223)

A RFC (Request for Comments) de Slots do React ainda está sendo discutida e visa implementar uma api simplificada para o uso de slots dentro do React.

## Indo além, portais!

Quando precisamos projetar conteúdo de um componente filho para outro componente podemos aplicar o conceito de portais, onde conseguimos passar um esse componente e referenciar o mesmo a outra parte do DOM. Com essa técnica conseguimos criar comportamentos que muitas vezes seriam mais complexos de implementar, conseguindo assim criar abstrações e deixar o nosso Front-end mais simples e escalável.

## Portais com Angular

Para a criação de portais com Angular é comum utilizarmos diretivas para compor o componente que será passado pelo portal e o portal de fato. Caso opte por uma diretiva já pronta, podemos utilizar o [Portal](https://material.angular.io/cdk/portal/overview) do Angular Material, que já tem uma implementação de portal.

Primeiro vamos criar uma diretiva para lidarmos com o _outlet_, ou o local que irá renderizar o componente via portal.

Essa diretiva irá controlar mudanças e mapeará o conteúdo do portal, e após a diretiva do portal (_PortalDirective_) ativar o evento de mudança, essa diretiva irá criar o um [_EmbeddedView_](https://angular.io/api/core/ViewContainerRef#createEmbeddedView) do nosso elemento do portal no _outlet_

```tsx
@Directive({
  selector: "[appPortalOutlet]",
})
export class PortalOutletDirective implements OnDestroy, OnInit {
  @Input()
  public appPortalOutlet: string = "";

  public static portalContents = new Map<string, PortalData>();
  public static portalContentChanges$ = new BehaviorSubject<PortalData[]>([]);
  public static portalOutletClear$ = new ReplaySubject<PortalData>(1);

  private destroyed$ = new ReplaySubject<void>(1);
  private views = new Map<string, EmbeddedViewRef<unknown>>();

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    PortalOutletDirective.portalContentChanges$
      .pipe(
        map((contents) =>
          contents.filter(
            (content) =>
              content.key === this.appPortalOutlet &&
              !this.views.has(content.key)
          )
        ),
        tap((contents) => {
          contents.forEach((content) => {
            const viewRef = this.viewContainerRef.createEmbeddedView(
              content.value
            );
            viewRef.detectChanges();
            this.views.set(content.key, viewRef);
          });
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    PortalOutletDirective.portalOutletClear$
      .pipe(
        filter((portal) => portal && this.views.has(portal.key)),
        takeUntil(this.destroyed$)
      )
      .subscribe((portal) => {
        this.views.delete(portal.key);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
```

Agora na nossa diretiva de portal, o nosso _setter appPortal_ vai disparar as ações da nossa diretiva de outlet quando adicionarmos uma chave para o mesmo.

```tsx
@Directive({
  selector: "[appPortal]",
})
export class PortalDirective implements OnDestroy {
  private portalData: PortalData | null = null;

  @Input()
  set appPortal(key: string) {
    if (key) {
      this.portalData = {
        key,
        value: this.templateRef,
      };
      PortalOutletDirective.portalContents.set(key, this.portalData);
      PortalOutletDirective.portalContentChanges$.next(
        Array.from(PortalOutletDirective.portalContents.values())
      );
    }
  }

  constructor(private templateRef: TemplateRef<unknown>) {}

  ngOnDestroy(): void {
    if (!this.portalData) return;

    PortalOutletDirective.portalContents.delete(this.portalData.key);
    PortalOutletDirective.portalContentChanges$.next(
      Array.from(PortalOutletDirective.portalContents.values())
    );
    PortalOutletDirective.portalOutletClear$.next(this.portalData);
  }
}
```

Exemplo de uso:

O uso de ambas as diretivas são bem simples, só precisamos passar a chave do pedaço de UI que onde queremos renderizar **appPortalOutlet\* e no **appPortal\* é onde vamos definir a parte da UI que será renderizada.

```html
<div class="main-content">
  <p>Main content</p>

  <div *appPortalOutlet="'my-portal'"></div>
</div>

<h3 *appPortal="'my-portal'">My sub header</h3>
```

## Portais com React

React já tem uma implementação de portais pronta, o [_createPortal_](https://react.dev/reference/react-dom/createPortal), essa função nos permite injetar um componente em um elemento do DOM. Para utilizar o portal, precisamos buscar o elemento no dom. No exemplo criamos um custom hok que recebe um id e retorno esse elemento ou null.

```tsx
export const usePortal = (elementId: string) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(elementId));
  }, [elementId]);

  return element;
};
```

Após a criação do _hook_ podemos criar um componente que encapsula a função _createPortal_.

```tsx
export const PortalComponent = ({
  elementOutlet,
  reactNode,
  key,
}: {
  elementOutlet: Element | DocumentFragment;
  reactNode: ReactNode;
  key?: string;
}) => {
  return createPortal(
    reactNode,
    elementOutlet,
    key ?? `${Math.random() * 10000}`
  );
};
```

Para utilizar essas funcionalidades em conjunto, podemos fazer dessa forma:

```tsx
function App() {
  const element = usePortal("main-content");

  return (
    <section>
      <div id="main-content" className="main-content">
        main content
      </div>

      {element && (
        <PortalComponent
          elementOutlet={element}
          reactNode={<h3>Sub header</h3>}
        />
      )}
    </section>
  );
}
```

## Conclusão

Como pudemos ver temos diversas formas de projetar conteúdo, slots, ng-content, etc. Algumas mais acopladas aos seus frameworks e outras são mais conceituais e podem ser utilizadas independentemente de frameworks, é sempre importante sabermos o jeito mais recomendado de
implementação na plataforma que estamos atuando, porém ao entender o conceito principal de projeção/portais conseguiremos aplicar essas mesmas técnicas sem problema.

## Links

- [Projeto de exemplo](https://github.com/guilhermegules/content-projection)
- [Content Projection — Documentação do Angular](https://angular.io/guide/content-projection?trk=public_post_comment-text)
- [Building Component Slots in React](https://sandroroth.com/blog/react-slots) — [sandroroth](https://sandroroth.com/)
