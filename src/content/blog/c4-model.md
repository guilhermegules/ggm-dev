---
title: "C4 Model - Document software with scale"
description: "The C4 model (Context, Containers, Components, Classes) is an approach for modeling and documenting software architecture proposed by Simon Brown. It provides a scalable and hierarchical framework for describing software systems at different levels of abstraction."
pubDate: "May 02 2024"
heroImage: "/blog-cover-default.png"
---

## Introduction

The C4 model (Context, Containers, Components, Classes) is an approach for modeling and documenting software architecture proposed by Simon Brown. It provides a scalable and hierarchical framework for describing software systems at different levels of abstraction.

## Abstraction Types

### System Context Diagram

This will be the first diagram to be developed. It will provide a more general view of the system, allowing us to have a broad understanding of the environment in which the software will be developed and implemented.

The System Context Diagram serves as an overview of the software system and its surrounding environment. It identifies the external entities (actors, systems, or services) interacting with the system and illustrates the relationships between them. This diagram helps stakeholders grasp the high-level context of the system and understand its boundaries and dependencies.

### Containers Diagram

The second diagram will be a container diagram. It represents a "zoom-in" on the core of the context diagram, allowing us to show the major containers of the application. For example, we can include elements such as the web client (a Single Page Application), the mobile application, the application's API, and the database.

### Components Diagram

This will be the third diagram. It represents another "zoom-in", this time into one of the containers from the previous diagram. It will provide a more detailed view of elements such as controllers, facades, etc. This diagram will also show what surrounds this component, meaning the environment in which it is embedded.

### Code/Class Diagram

This will be the fourth and final diagram. It may not always be necessary, but when it is, it can be generated automatically by an IDE. Class diagrams (UML) are well suited for this purpose, as they allow exemplifying the classes at a lower level.

## Observations

IMHO we can follow some tips of other authors and init ours diagrams with some things in mind.

- **Maintain consistency in figures:** This allows the reader to easily understand the relationships and hierarchies between diagram elements.
- **Explain terms and acronyms:** Especially if those consuming your diagrams are non-technical people: This ensures that everyone can understand the diagram's content.
- **Avoid abbreviations and prefer to make everything more explicit:** This prevents confusion and misunderstandings.
- **Make it clear what is being diagrammed:** whether it's an API, a client, or just a user: This allows the reader to know exactly what each diagram element represents.
- **Make connections between containers clear:** This helps the reader understand how different system elements interact with each other.
- **Use legends to clarify diagrammed objects:** This provides additional information that can be useful for understanding the diagram.

## Conclusion

The C4 model empowers software engineers to articulate and elucidate their ideas in a lucid and multi-layered structure. With its framework, we can craft diagrams for the technical team's, while also with the System Context diagrams are comprehensible to the entire team. This approach creates a comprehensive understanding of the application flow among team members, ensuring alignment and clarity across all stakeholders.

## References

PT-BR 🇧🇷

[O modelo C4 de documentação para Arquitetura de Software](https://www.infoq.com/br/articles/C4-architecture-model/)

[C4 Model](https://medium.com/pravaler-digital-team/c4-model-9b6e56705496)

EN 🇬🇧

[The C4 model for visualising software architecture](https://c4model.com/)
