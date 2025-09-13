import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Important from "./components/Important";
import Reviews from "./components/Reviews";

function App() {
  return (
    <>
      <Navbar />
      {/* Spacer equal to navbar height */}
      <div className="h-[80px]" />
      <Hero />
      <Services />
      <About />
      <Important />
      <Reviews />
      <Contact />
    </>
  );
}

export default App;
