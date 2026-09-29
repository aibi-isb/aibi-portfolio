import About from "../components/About"
import Capabilities from "../components/Capabilities"
import Contact from "../components/Contact"
import DesignToCodeScene from "../components/DesignToCodeScene"
import FeaturedWork from "../components/FeaturedWork"
import Hero from "../components/Hero"
import Nav from "../components/Nav"
import SupportingWork from "../components/SupportingWork"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <div className="divider" />
        <FeaturedWork />
        <div className="divider" />
        <About />
        <div className="divider" />
        <DesignToCodeScene />
        <div className="divider" />
        <Capabilities />
        <div className="divider" />
        <SupportingWork />
        <div className="divider" />
        <Contact />
      </main>
    </div>
  )
}
