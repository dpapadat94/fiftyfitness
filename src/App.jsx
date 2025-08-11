import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      {/* Spacer equal to navbar height */}
      <div className="h-[80px]" />
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
}

export default App;
