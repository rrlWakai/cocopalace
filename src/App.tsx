import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="section">
          <About />
        </section>

        <section id="rooms" className="section bg-white">
          <Rooms />
        </section>

        <section id="reviews" className="section">
          <Reviews />
        </section>

        <section id="contact" className="section bg-white">
          <Contact />
        </section>

        <section id="location" className="section">
          <Location />
        </section>
      </main>

      <Footer />
    </div>
  );
}
