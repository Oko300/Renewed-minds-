import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Values from "@/components/landing/Values";
import Events from "@/components/landing/Events";
import Resources from "@/components/landing/Resources";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Values />
      <Events />
      <Resources />
      <Footer />
    </main>
  );
}
