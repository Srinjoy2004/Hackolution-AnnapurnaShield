
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProblemStatement from "@/components/ProblemStatement";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <ProblemStatement />
      <Solution />
      <Features />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Index;
