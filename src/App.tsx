import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "./constants/data";

import { BackgroundGeometry } from "./components/BackgroundGeometry";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Timeline } from "./components/Timeline";

import { Blog } from "./pages/blog";
import { BlogPost } from "./pages/blogPost";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <ScrollToHash />

      <div className="bg-[#050505] min-h-screen text-white selection:bg-zinc-300 selection:text-[#050505] relative overflow-hidden font-sans">
        
        {/* Global Animated Background */}
        <BackgroundGeometry />

        {/* Navigation */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <nav className="pointer-events-auto bg-[#111]/80 backdrop-blur-2xl border border-zinc-800 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] rounded-sm px-4 py-2 md:px-6 md:py-3 flex items-center justify-between w-full max-w-3xl gap-4 md:gap-12 transition-all duration-300">
            <a href="/" onClick={closeMenu} className="font-heading font-black tracking-tighter text-xl text-[#050505] bg-zinc-300 px-4 py-1.5 rounded-sm border border-zinc-200 flex-shrink-0 hover:bg-zinc-200 hover:text-[#050505] transition-colors">
              SN
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-zinc-400">
              <a href="/#projects" className="hover:text-zinc-300 transition-colors">Projects</a>
              <a href="/#experience" className="hover:text-zinc-300 transition-colors">Experience</a>
              <Link to="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
              <a href="/#contact" className="hover:text-zinc-300 transition-colors">Contact</a>
            </div>

            {/* Desktop Hire Me Button */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="hidden md:block text-xs font-black border-2 border-zinc-300 bg-zinc-300 text-[#050505] px-5 py-2 rounded-sm hover:bg-zinc-200 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-300/30 transition-all uppercase tracking-widest flex-shrink-0"
            >
              Hire Me
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-300 focus:outline-none bg-zinc-900 rounded-sm transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-4 top-24 z-40 bg-[#111]/95 backdrop-blur-2xl border border-zinc-800 shadow-2xl rounded-sm overflow-hidden">
            <div className="flex flex-col p-6 gap-6 text-zinc-300 font-bold uppercase tracking-widest text-sm">
              <a href="/#projects" onClick={closeMenu} className="hover:text-zinc-300 transition-colors">Projects</a>
              <a href="/#experience" onClick={closeMenu} className="hover:text-zinc-300 transition-colors">Experience</a>
              <Link to="/blog" onClick={closeMenu} className="hover:text-zinc-300 transition-colors">Blog</Link>
              <a href="/#contact" onClick={closeMenu} className="hover:text-zinc-300 transition-colors">Contact</a>
              <hr className="border-zinc-800" />
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-center text-xs font-black border-2 border-zinc-300 bg-zinc-300 text-[#050505] py-4 rounded-sm hover:bg-zinc-200 hover:border-zinc-200 transition-all shadow-md"
              >
                HIRE ME
              </a>
              
              <div className="flex justify-center gap-6 mt-4">
                {[
                  { Icon: Github, href: "https://github.com/nsushant09" },
                  { Icon: Linkedin, href: "https://linkedin.com/in/nsushant09" },
                  { Icon: Mail, href: "mailto:nsushant09@gmail.com" }
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 bg-zinc-900/50 transition-all rounded-sm"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Fixed Social Links */}
        <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-6">
          {[
            { Icon: Github, href: "https://github.com/nsushant09" },
            { Icon: Linkedin, href: "https://linkedin.com/in/nsushant09" },
            { Icon: Mail, href: "mailto:nsushant09@gmail.com" }
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-zinc-800 text-zinc-400 hover:text-[#050505] hover:border-zinc-300 hover:bg-zinc-300 transition-all rounded-sm bg-[#111]/80 backdrop-blur-md shadow-xl"
            >
              <Icon size={20} />
            </a>
          ))}
          <div className="w-[1px] h-24 bg-zinc-800 mx-auto mt-2"></div>
        </div>

        {/* Routes */}
        <main className="pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Projects />
                  <Timeline />
                  <Contact />
                </>
              }
            />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>

        <footer className="py-12 mt-20 border-t border-zinc-800 bg-[#050505] text-center text-zinc-500 text-sm font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.
        </footer>
      </div>
    </Router >
  );
}

export default App;