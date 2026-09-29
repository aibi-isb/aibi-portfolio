import { useMemo } from "react"
import { RouterProvider } from "react-router"
import { createAppRouter } from "./app/routes"

export default function App() {
  const router = useMemo(() => {
    if (typeof window === "undefined") {
      return null
    }

    return createAppRouter()
  }, [])

  if (!router) {
    return null
  }

  return <RouterProvider router={router} />
}
