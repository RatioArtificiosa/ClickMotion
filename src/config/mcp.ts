/**
 * ClickMotion MCP — connect AI agents to the design library.
 * Endpoint is env-overridable until production MCP is live.
 */

export const mcpConfig = {
  /** Display name in CLI commands */
  serverName: "clickmotion",
  /**
   * HTTP transport URL for MCP clients.
   * Override with NEXT_PUBLIC_MCP_URL when the real endpoint ships.
   */
  httpUrl:
    process.env.NEXT_PUBLIC_MCP_URL ||
    "https://www.ClickMotion.dev/api/mcp",
  tools: [
    {
      id: "claude",
      label: "Claude Code",
      description: "Anthropic Claude terminal / desktop agent",
    },
    {
      id: "cursor",
      label: "Cursor",
      description: "Cursor IDE agent mode",
    },
    {
      id: "codex",
      label: "Codex",
      description: "OpenAI Codex CLI",
    },
    {
      id: "grok",
      label: "Grok Build",
      description: "xAI Grok Build agents",
    },
  ],
} as const;

export function mcpAddCommand(tool: "claude" | "cursor" | "codex" | "generic" = "claude") {
  const { serverName, httpUrl } = mcpConfig;
  if (tool === "claude") {
    return `claude mcp add ${serverName} --scope user --transport http ${httpUrl}`;
  }
  if (tool === "cursor") {
    return `npx -y @modelcontextprotocol/cli add ${serverName} --transport http ${httpUrl}`;
  }
  if (tool === "codex") {
    return `codex mcp add ${serverName} --url ${httpUrl}`;
  }
  return `# Add ClickMotion MCP (HTTP)\n# URL: ${httpUrl}\n# Name: ${serverName}`;
}
