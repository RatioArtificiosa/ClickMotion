"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { mcpAddCommand, mcpConfig } from "@/config/mcp";
import { cn } from "@/lib/utils";

type ToolId = (typeof mcpConfig.tools)[number]["id"];

export function McpSetupClient() {
  const [tool, setTool] = useState<ToolId>("claude");
  const [copied, setCopied] = useState(false);

  const command = useMemo(() => {
    if (tool === "claude") return mcpAddCommand("claude");
    if (tool === "cursor") return mcpAddCommand("cursor");
    if (tool === "codex") return mcpAddCommand("codex");
    return mcpAddCommand("generic");
  }, [tool]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--well)]/50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
            1
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight">Pick your AI tool</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              We will give you the exact command to run.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mcpConfig.tools.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTool(t.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                    tool === t.id
                      ? "border-white/25 bg-white text-black"
                      : "border-[var(--hairline)] bg-transparent text-[var(--text-secondary)] hover:border-white/15 hover:text-[var(--text-primary)]"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--well)]/50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
            2
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight">
              Register the ClickMotion MCP server
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Open a terminal and run this command.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--hairline)] bg-black/50">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--hairline)] px-3 py-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--text-quaternary)]">
                  <Terminal className="h-3.5 w-3.5" /> Terminal
                </span>
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-white/15"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-[#e8e4dc]">
                <code>{command}</code>
              </pre>
            </div>
            <p className="mt-3 text-xs text-[var(--text-quaternary)]">
              Server: <span className="text-[var(--text-tertiary)]">{mcpConfig.serverName}</span>
              {" · "}
              Transport: HTTP
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--well)]/50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
            3
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight">Sign in and authorize</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              A browser window opens automatically. Sign in with your ClickMotion account
              and approve access. Free accounts can open free prompts. Paid plans unlock
              the full library.
            </p>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--well)]/50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
            4
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight">You are set</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              Ask your agent for a design and it pulls real ClickMotion prompts and
              assets. Example: “Give me a luxury real estate hero with scroll-linked
              video.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
