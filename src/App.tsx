import { PROFILE } from './constants/data';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold font-bold tracking-tighter text-xl">Sushant Neupane</span>
          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href={`mailto:${PROFILE.email}`} className="text-xs border border-zinc-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
            Hire Me
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;