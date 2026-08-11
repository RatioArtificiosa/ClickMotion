import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { demoHeroes } from "@/lib/demo-heroes";

export const metadata = {
 title: "Live Demos",
 description: "Full-screen hero previews from the MS library.",
};

export default function DemoIndexPage() {
 return (
 <div className="container py-8">
 <h1 className="text-3xl font-black tracking-tighter">Live demos</h1>
 <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
 Full-screen previews of library heroes. Open any design to see it as a real page.
 </p>

 <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 {demoHeroes.map((h) => (
 <Link key={h.id} href={`/demo/${h.slug}`} className="group block">
 <Card className="overflow-hidden border-muted transition-all hover:border-primary/30 hover:shadow-lg">
 <div className="relative aspect-[16/10] overflow-hidden bg-muted">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={h.poster}
 alt={h.title}
 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
 />
 <Badge
 variant="secondary"
 className="absolute left-2.5 top-2.5 bg-background/80 text-[10px] backdrop-blur"
 >
 {h.intensity}
 </Badge>
 </div>
 <div className="p-3.5">
 <div className="line-clamp-1 text-sm font-semibold leading-tight">
 {h.title.split(" - ")[0]}
 </div>
 <div className="line-clamp-1 text-xs text-muted-foreground">{h.category}</div>
 </div>
 </Card>
 </Link>
 ))}
 </div>
 </div>
 );
}
