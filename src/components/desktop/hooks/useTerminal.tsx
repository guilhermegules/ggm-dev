import { useState, useCallback } from "react";
import type { BlogPostData } from "../types";

export interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
}

interface UseTerminalOptions {
  posts: BlogPostData[];
  onOpenWindow: (type: string) => void;
  onOpenPost: (post: BlogPostData) => void;
}

export function useTerminal({ posts, onOpenWindow, onOpenPost }: UseTerminalOptions) {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");

  const runCommand = useCallback(
    (cmdStr: string) => {
      const trimmed = cmdStr.trim();
      if (!trimmed) return;

      const parts = trimmed.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let output: React.ReactNode = null;

      switch (cmd) {
        case "help":
          output = (
            <div className="space-y-1 text-xs font-mono text-gray-300">
              <div className="text-[var(--cin-accent,#35a854)] font-bold">Comandos disponíveis:</div>
              <div>• <strong className="text-white">whoami</strong> : Exibe informações sobre o Guilherme</div>
              <div>• <strong className="text-white">skills</strong> : Lista tecnologias e especialidades</div>
              <div>• <strong className="text-white">posts / blog</strong> : Lista todos os artigos disponíveis</div>
              <div>• <strong className="text-white">cat &lt;slug&gt; / open &lt;slug&gt;</strong> : Abre o artigo em uma janela dedicada</div>
              <div>• <strong className="text-white">about</strong> : Abre a janela Sobre Mim</div>
              <div>• <strong className="text-white">settings</strong> : Abre a janela de Configurações</div>
              <div>• <strong className="text-white">links / contact</strong> : Exibe contatos e redes sociais</div>
              <div>• <strong className="text-white">neofetch</strong> : Exibe banner de sistema Linux Mint</div>
              <div>• <strong className="text-white">clear</strong> : Limpa o terminal</div>
              <div>• <strong className="text-white">date</strong> : Exibe data e hora atual</div>
            </div>
          );
          break;

        case "whoami":
          output = (
            <div className="text-xs font-mono space-y-1 text-gray-300">
              <div className="text-[var(--cin-accent,#35a854)] font-bold">Guilherme Gules Moreira (Gules)</div>
              <div>Engenheiro de Software Sênior • Fullstack em ambientes de alta complexidade & IA Generativa.</div>
              <div>Criador da biblioteca Cinnamon CSS, emulando o ambiente Linux Mint para a web.</div>
            </div>
          );
          break;

        case "skills":
          output = (
            <div className="text-xs font-mono space-y-2 text-gray-300">
              <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Backend]:</span> Java (Spring Boot), Node.js (NestJS, Express), APIs REST, Mensageria, Microsserviços</div>
              <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Frontend]:</span> React, TypeScript, Angular, Tailwind CSS, Cinnamon CSS, Astro, Micro Frontends</div>
              <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Arquitetura]:</span> Microsserviços, BFFs, Observabilidade, Processamento Assíncrono, C4 Model</div>
              <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[IA & Engenharia]:</span> Spec-Driven Development, Kiro, Amazon Q, Agentes Autônomos e Skills Customizadas</div>
            </div>
          );
          break;

        case "neofetch":
          output = (
            <div className="text-xs leading-relaxed font-mono">
              <pre className="text-[var(--cin-accent,#35a854)] font-bold text-xs sm:text-sm leading-tight m-0">
{`          _.-ppOOOOOOqq-._                guilherme@gules
         .oOOOOPPPPPPPPPPOOOOo.             -------------------
      .oOOOO.=oOOOOOOOOOOo=.OOOOo.          OS: [Linux Mint, Open SUSE Tumbleweed, Windows 11]
    .:OOO.=oOOOOOOOOOOOOOOOOo=.OOO:.        Host: Guilherme Gules Moreira
   .OOO.OOOOOOOOOOOOOOOOOOOOOOOO.OOO.       Stack: Node, Java, React, NestJS, Spring
  .OOO.OO    OOO:   ::        :OOO.OO:      Focus: Backend, Frontend, Microsservices, Microfrontends and Software Architecture
 .OOO.OOO    OO                OOO.OOO:
 OOO.OOOO    OO    oo    oo    OOOO.OOO
:OOO:OOOO    OO    OO    OO    OOOO:OOO:
:OOO:OOOO    OO    OO    OO    OOOO:OOO:
'OOO'OOOO    OO    OO    OO    OOOO'OOO'
 OOO'OOOO    OO____OO____OO    OOOO'OOO'
 'OOO'OOO    'OOOOOOOOOOOO'    OOOO'OOO
  'OOO'OOO                    .OOO'OOO'
   'OOO'OOOO:ooooooooooooooo:OOOO'OOO'
    ':OOOo'=OOOOOOOOOOOOOOOOO='oOOO:'
      ':OOOOo'=OOOOOOOOOOO='oOOOO:'
         -OOOOooooooooooOOOO-
             -=:OOOO:=-
                                            `}
              </pre>
            </div>
          );
          break;

        case "blog":
        case "posts":
        case "ls":
          output = (
            <div className="text-xs font-mono space-y-1 text-gray-300">
              <div className="text-[var(--cin-accent,#35a854)] font-bold">Artigos publicados ({posts.length}):</div>
              {posts.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <button
                    type="button"
                    onClick={() => onOpenPost(p)}
                    className="text-white hover:text-[var(--cin-accent,#35a854)] underline text-left cursor-pointer bg-transparent border-0 p-0 font-mono"
                  >
                    {p.id}
                  </button>
                  <span className="text-gray-500 text-[11px]">({p.title})</span>
                </div>
              ))}
              <div className="mt-2 text-gray-400">
                Dica: Digite <span className="text-white">cat &lt;nome-do-slug&gt;</span> ou clique no link para abrir o artigo!
              </div>
            </div>
          );
          break;

        case "cat":
        case "open":
          if (!args[0]) {
            output = <div className="text-red-400 text-xs font-mono">Uso: cat &lt;slug-do-artigo&gt; (Ex: cat arquitetura-bff-beneficios)</div>;
          } else {
            const targetSlug = args[0].replace(".md", "");
            const found = posts.find((p) => p.id === targetSlug);
            if (found) {
              onOpenPost(found);
              output = (
                <div className="text-xs font-mono text-[var(--cin-accent,#35a854)]">
                  Abertura do artigo: <strong>{found.title}</strong> em nova janela Document Viewer...
                </div>
              );
            } else {
              output = <div className="text-red-400 text-xs font-mono">Artigo não encontrado: {targetSlug}. Digite 'posts' para listar os artigos.</div>;
            }
          }
          break;

        case "about":
          onOpenWindow("about");
          output = <div className="text-xs font-mono text-[var(--cin-accent,#35a854)]">Abrindo janela Sobre Mim...</div>;
          break;

        case "settings":
          onOpenWindow("settings");
          output = <div className="text-xs font-mono text-[var(--cin-accent,#35a854)]">Abrindo janela de Configurações...</div>;
          break;

        case "links":
        case "contact":
          output = (
            <div className="text-xs font-mono space-y-1 text-gray-300">
              <div>• GitHub: <a href="https://github.com/guilhermegules" target="_blank" rel="noreferrer" className="text-[var(--cin-accent,#35a854)] underline">https://github.com/guilhermegules</a></div>
              <div>• LinkedIn: <a href="https://www.linkedin.com/in/guilhermegules/" target="_blank" rel="noreferrer" className="text-[var(--cin-accent,#35a854)] underline">https://www.linkedin.com/in/guilhermegules/</a></div>
              <div>• Currículo: <a href="/files/curriculo-guilhermegulesmoreira.pdf" download className="text-[var(--cin-accent,#35a854)] underline">curriculo-guilhermegulesmoreira.pdf</a></div>
            </div>
          );
          break;

        case "clear":
          setHistory([]);
          setInputVal("");
          return;

        case "date":
          output = <div className="text-xs font-mono text-gray-300">{new Date().toString()}</div>;
          break;

        default:
          output = (
            <div className="text-xs font-mono text-red-400">
              Comando não reconhecido: "{cmd}". Digite <span className="text-white underline cursor-pointer" onClick={() => runCommand("help")}>help</span> para ajuda.
            </div>
          );
      }

      setHistory((prev) => [...prev, { command: cmdStr, output }]);
      setInputVal("");
    },
    [posts, onOpenPost, onOpenWindow]
  );

  return {
    history,
    inputVal,
    setInputVal,
    runCommand,
  };
}
