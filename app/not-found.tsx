import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-4 px-4 text-center">
        <h1 className="font-serif text-6xl font-medium">404</h1>
        <p className="text-muted-foreground text-lg">Page not found</p>
        <p className="text-muted-foreground max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        <div className="pt-6">
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
