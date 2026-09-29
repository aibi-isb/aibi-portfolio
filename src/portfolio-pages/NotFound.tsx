import { Link } from "react-router"
import Nav from "../components/Nav"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="label-mono mb-6">404</p>
          <h1
            className="display-xl mb-4"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Page not found
          </h1>
          <p className="text-foreground/55 mb-8 leading-relaxed">
            This page does not exist or has moved. Head back to the portfolio
            to find what you were looking for.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            ← Back to IB Studio
          </Link>
        </div>
      </main>
    </div>
  )
}
