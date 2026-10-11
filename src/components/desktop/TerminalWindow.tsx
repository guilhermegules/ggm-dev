import React, { useState, useRef, useEffect } from "react";
import type { BlogPostData } from "./types";

interface TerminalWindowProps {
  posts: BlogPostData[];
  onOpenWindow: (type: string) => void;
  onOpenPost: (post: BlogPostData) => void;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalWindow({
  posts,
  onOpenWindow,
  onOpenPost,
}: TerminalWindowProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "neofetch",
      output: (
        <div className="text-xs leading-relaxed font-mono">
          <pre className="text-[var(--cin-accent,#35a854)] font-bold text-xs sm:text-sm leading-tight m-0">
{`   MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM   guilherme@gules
 MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM     ---------------
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      OS: Linux Mint Cinnamon (Web Edition)
MMMMMMMM  /MMMMMMMMMMMMMMMMMMMMMM      Host: Guilherme Gules Moreira
MMMMMMMN     NMMMMMMMMMMMMMMMMMMM      Role: Full Stack Software Engineer
MMMMMMMN  /  NMMMMMMMMMMMMMMMMMMM      DE: Cinnamon 6.2 (Mint-Y Theme)
MMMMMMMN  /  NMMMMMMMMMMMMMMMMMMM      Stack: React, Angular, Node, NestJS, Spring
MMMMMMMN  /  NMMMMMMMMMMMMMMMMMMM      Focus: Microfrontends, BFF & WCAG Accessibility
MMMMMMMN  /  NMMMMMMMMMMMMMMMMMMM      Packages: Cinnamon CSS (Creator)
MMMMMMMN  /  NMMMMMMMMMMMMMMMMMMM      Shell: bash 5.2.21
MMMMMMMM  /MMMMMMMMMMMMMMMMMMMMMM      Terminal: cin-terminal 0.1.0
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      `}
          </pre>
          <div className="mt-2 text-gray-300">
            Digite <span className="text-[var(--cin-accent,#35a854)] font-bold">help</span> para ver os comandos disponíveis.
          </div>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmdStr: string) => {
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
            <div>Desenvolvedor Full Stack apaixonado por arquiteturas escaláveis e produtos acessíveis.</div>
            <div>Criador da biblioteca Cinnamon CSS, emulando o ambiente Linux Mint para a web.</div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs font-mono space-y-2 text-gray-300">
            <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Frontend]:</span> TypeScript, JavaScript, React, Angular, Tailwind CSS, Cinnamon CSS, Astro</div>
            <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Backend]:</span> Node.js, NestJS, Express, Java, Spring Boot</div>
            <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Arquitetura]:</span> Microfrontends, Backends For Frontends (BFF), REST APIs, C4 Model</div>
            <div><span className="text-[var(--cin-accent,#35a854)] font-bold">[Boas Práticas]:</span> WCAG Accessibility, Clean Code, Testes Automatizados</div>
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div
      className="terminal-body flex flex-col h-full overflow-hidden select-text"
      style={{
        backgroundColor: "#1a1a1d",
        color: "#dedede",
        fontFamily: "var(--cin-font-mono, monospace)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable history */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--cin-accent,#35a854)] font-bold">guilherme@gules</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-bold">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            {item.output && <div className="pl-2">{item.output}</div>}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quick Chips for Touch / Mobile */}
      <div className="flex flex-wrap gap-1 px-3 py-1.5 border-t border-[#333339] bg-[#222226]">
        {["help", "whoami", "skills", "posts", "about", "clear"].map((btnCmd) => (
          <button
            key={btnCmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(btnCmd);
            }}
            className="text-[11px] px-2 py-0.5 rounded bg-[#33333a] hover:bg-[var(--cin-accent,#35a854)] hover:text-white text-gray-300 font-mono transition-colors border border-[#44444c] cursor-pointer"
          >
            {btnCmd}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 pt-1 border-t border-[#333339] bg-[#1a1a1d]">
        <div className="flex items-center gap-1 text-xs flex-shrink-0">
          <span className="text-[var(--cin-accent,#35a854)] font-bold">guilherme@gules</span>
          <span className="text-gray-400">:</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-gray-400">$</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="digite um comando..."
          className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs focus:ring-0 p-0"
          autoFocus
        />
      </form>
    </div>
  );
}
