"use client";

import { backgroundsCatalog } from "@/config/backgrounds";
import { BackgroundCard } from "./BackgroundCard";

export function BackgroundsGrid() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {backgroundsCatalog.map((item) => (
        <BackgroundCard key={item.id} item={item} />
      ))}
    </div>
  );
}
