import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="container flex flex-col items-center py-20 text-center">
      <CheckCircle className="h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight">You&apos;re in!</h1>
      <p className="mt-2 max-w-md text-muted-foreground">Your payment was successful. Your plan will be activated within minutes. Check your email for a receipt.</p>
      <div className="mt-6 flex gap-3">
        <Button variant="gradient" asChild><Link href="/browse">Browse Library</Link></Button>
        <Button variant="outline" asChild><Link href="/account">Go to Account</Link></Button>
      </div>
    </div>
  );
}
