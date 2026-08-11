export const mainNav = [
  { label: "Browse", href: "/browse", icon: "LayoutGrid" },
  { label: "Collections", href: "/collections", icon: "Layers" },
  { label: "Backgrounds", href: "/backgrounds", icon: "Film" },
  { label: "MCP", href: "/mcp", icon: "Bot" },
  { label: "Pricing", href: "/pricing", icon: "CreditCard" },
] as const;

export const footerNav = {
  product: [
    { label: "Browse Library", href: "/browse" },
    { label: "Collections", href: "/collections" },
    { label: "Backgrounds", href: "/backgrounds" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    { label: "MCP Server", href: "/mcp" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Changelog", href: "/changelog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license" },
  ],
} as const;
