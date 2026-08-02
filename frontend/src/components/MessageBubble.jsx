import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({ role, content, images = [] }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-5 py-4 rounded-2xl text-[14px] leading-7
        ${isUser
            ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
            : "bg-[#161b22] border border-white/10 text-slate-200 rounded-tl-sm"
          }`}
      >
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-5">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                loading="lazy"
                alt=""
                onError={(e) => e.currentTarget.remove()}
                className="w-48 rounded-xl border border-white/10 hover:scale-[1.02] transition cursor-pointer"
              />
            ))}
          </div>
        )}

        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-6 mb-3 border-b border-white/10 pb-2">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-6 mb-3">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-5 mb-2">
                {children}
              </h3>
            ),

            ul: ({ children }) => (
              <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
            ),

            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-indigo-500 bg-white/5 italic my-5 px-4 py-3 rounded-r-lg">
                {children}
              </blockquote>
            ),

            table: ({ children }) => (
              <div className="overflow-x-auto my-5">
                <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),

            thead: ({ children }) => (
              <thead className="bg-white/10">{children}</thead>
            ),

            th: ({ children }) => (
              <th className="border border-white/10 px-4 py-2 text-left font-semibold">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border border-white/10 px-4 py-2">
                {children}
              </td>
            ),

            hr: () => (
              <hr className="my-6 border-white/10" />
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                {children}
              </a>
            ),

            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match?.[1] || "text";

              // Inline code
              if (inline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded bg-white/10 text-pink-400 font-mono text-[13px]"
                  >
                    {children}
                  </code>
                );
              }

              const code = String(children).replace(/\n$/, "");

              return (
                <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10">
                    <span className="text-xs uppercase tracking-wide text-slate-400 font-medium">
                      {language}
                    </span>

                    <button
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="text-xs text-slate-400 hover:text-white transition"
                    >
                      Copy
                    </button>
                  </div>

                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "18px",
                      background: "#0d1117",
                      fontSize: "14px",
                      borderRadius: 0,
                    }}
                    showLineNumbers={code.split("\n").length > 8}
                    wrapLongLines
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default MessageBubble;