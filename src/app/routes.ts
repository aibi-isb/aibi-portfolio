import { createBrowserRouter } from "react-router"
import CaseStudy from "../portfolio-pages/CaseStudy"
import Home from "../portfolio-pages/Home"
import NotFound from "../portfolio-pages/NotFound"
import ResumePage from "../portfolio-pages/ResumePage"

export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/work/:slug",
      Component: CaseStudy,
    },
    {
      path: "/resume",
      Component: ResumePage,
    },
    {
      path: "/cv",
      Component: ResumePage,
    },
    {
      path: "*",
      Component: NotFound,
    },
  ])
}
