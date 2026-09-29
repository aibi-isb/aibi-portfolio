import { createBrowserRouter } from "react-router"
import CaseStudy from "../pages/CaseStudy"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import ResumePage from "../pages/ResumePage"

export const router = createBrowserRouter([
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
