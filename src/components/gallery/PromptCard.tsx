"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface PromptCardProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  styleTags: string[];
  motionIntensity: string;
  thumbnail: string;
  priceTier: string;
  isNew?: boolean;
}

export function PromptCard({ slug, title, category, styleTags, motionIntensity, thumbnail, priceTier, isNew }: PromptCardProps) {
  return (
    <Link href={`/browse/${slug}`} className="group block">
      <Card className="overflow-hidden border-muted transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-video overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {isNew && <Badge variant="success">New</Badge>}
            <Badge variant="secondary" className="backdrop-blur-md bg-background/80 text-xs">{motionIntensity}</Badge>
          </div>
          {priceTier !== "free" && (
            <div className="absolute right-3 top-3">
              <Badge className="border-0 bg-foreground text-background">PRO</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-sm font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{category} · {styleTags.slice(0, 2).join(" · ")}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
