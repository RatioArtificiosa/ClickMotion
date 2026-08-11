import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/config/plans";

export const metadata = { title: "Pricing - MS" };

export default function PricingPage() {
 return (
 <div className="container py-12">
 <div className="mx-auto max-w-2xl text-center">
 <h1 className="text-4xl font-semibold tracking-tight">Simple, transparent pricing</h1>
 <p className="mt-3 text-[var(--text-secondary)]">Start free. Scale when you ship. Lifetime available at launch.</p>
 </div>

 <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
 {plans.map((plan) => (
 <Card key={plan.id} className={`flex flex-col ${plan.popular ? "ring-1 ring-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)]" : ""}`}>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle className="text-base">{plan.name}</CardTitle>
 {plan.badge && <Badge className="bg-foreground text-background border-0 text-[10px]">{plan.badge}</Badge>}
 </div>
 <CardDescription>{plan.description}</CardDescription>
 <div className="pt-2">
 <span className="text-3xl font-semibold tracking-tight">${plan.price}</span>
 <span className="text-sm text-[var(--text-tertiary)]"> {plan.interval === "lifetime" ? "once" : plan.interval === "year" ? "/year" : "/month"}</span>
 </div>
 </CardHeader>
 <CardContent className="flex-1">
 <ul className="space-y-2">
 {plan.features.map((f) => (
 <li key={f} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-tertiary)]" />{f}</li>
 ))}
 </ul>
 </CardContent>
 <CardFooter>
 <Button
 className="w-full"
 variant={plan.popular ? "default" : plan.id === "free" ? "ghost" : "glass"}
 asChild
 >
 <Link href={plan.id === "free" ? "/browse" : "/api/checkout"}>
 {plan.id === "free" ? "Browse free" : plan.popular ? "Unlimited Power" : "Get started"}
 </Link>
 </Button>
 </CardFooter>
 </Card>
 ))}
 </div>

 <p className="mt-8 text-center text-xs text-[var(--text-quaternary)]">Prices in USD. Lifetime is limited to the launch window. Yearly plans renew automatically - cancel anytime.</p>
 </div>
 );
}
