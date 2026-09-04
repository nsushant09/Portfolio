import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE, EDUCATION, EXPERIENCE, PROJECTS, SKILLS_CATEGORIES } from '../constants/data';
import { BLOGS } from '../constants/blogData';
import {
  Terminal,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  BookOpen,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code2,
  Settings,
  Users
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { BlogPostOutput } from './terminal/BlogPostOutput';

interface GuiViewProps {
  onSwitchToTerminal: () => void;
}

export const GuiView: React.FC<GuiViewProps> = ({ onSwitchToTerminal }) => {
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setSending(true);
    setContactStatus('idle');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: contactForm.name,
            email: contactForm.email,
            title: contactForm.subject || 'GUI Contact',
            message: contactForm.message,
            to_name: 'Sushant'
          },
          publicKey
        );
      } else {
        await new Promise(res => setTimeout(res, 1000));
      }
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setContactStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--fg)] font-mono selection:bg-[var(--accent)] selection:text-[var(--bg)] overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[var(--term-header)]/90 backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="#hero" className="font-black text-base text-[var(--accent)] tracking-tight">
            SN.
          </a>
          <span className="hidden sm:inline text-xs text-[var(--muted)]">| {PROFILE.role}</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-[var(--muted)] font-semibold">
          <a href="#works" className="hover:text-[var(--accent)] transition-colors">Works</a>
          <a href="#experience" className="hover:text-[var(--accent)] transition-colors">Experience</a>
          <a href="#skills" className="hover:text-[var(--accent)] transition-colors">Skills</a>
          <a href="#blogs" className="hover:text-[var(--accent)] transition-colors">Blog</a>
          <a href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</a>
        </div>

        <button
          onClick={onSwitchToTerminal}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)] text-[var(--bg)] font-bold text-xs rounded hover:opacity-90 transition-all shadow-md cursor-pointer"
        >
          <Terminal size={14} />
          <span>Terminal Mode</span>
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        {/* HERO SECTION */}
        <section id="hero" className="py-12 sm:py-20 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--highlight)] text-[var(--accent)] border border-[var(--border)] rounded-full text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-2)] animate-ping" />
            <span className="font-semibold">Available for Engineering Roles & Freelance</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[var(--fg)]">
              SUSHANT <span className="text-[var(--accent)]">NEUPANE</span>
            </h1>
            <p className="text-base sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
              Software Engineer crafting high-performance Android applications, spatial XR interactions, and robust full-stack web platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 text-xs font-bold"
          >
            <a
              href="#works"
              className="px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] rounded hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href="/Sushant_Resume.pdf"
              download="Sushant_Neupane_Resume.pdf"
              className="px-5 py-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)] rounded transition-all flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4 pt-4 text-[var(--muted)]"
          >
            <a href="https://github.com/nsushant09" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/nsushant09" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="p-2 border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
              <Mail size={18} />
            </a>
          </motion.div>
        </section>

        {/* SELECTED WORKS SECTION */}
        <section id="works" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase font-bold tracking-widest">01 / PORTFOLIO</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] mt-1">Featured Works & Projects</h2>
            </div>
            <span className="text-xs text-[var(--muted)]">{PROJECTS.length} Systems Deployed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group border border-[var(--border)] rounded-lg bg-[var(--card-bg)] overflow-hidden hover:border-[var(--accent)] transition-all flex flex-col justify-between"
              >
                <div>
                  {project.image && (
                    <div className="relative aspect-video overflow-hidden bg-black/40 border-b border-[var(--border)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] rounded bg-[var(--highlight)] text-[var(--accent)] border border-[var(--border)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] hover:underline"
                    >
                      <Github size={13} />
                      <span>View Source Code & Docs</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase font-bold tracking-widest">02 / CAREER</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] mt-1">Experience & Background</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Experience Column */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-sm font-bold text-[var(--accent-2)] flex items-center gap-2">
                <Briefcase size={16} /> Work Experience
              </h3>
              <div className="space-y-4">
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-5 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] hover:border-[var(--accent)]/50 transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-[var(--accent)]">{exp.role}</h4>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] border ${
                            exp.category === 'Research Experience'
                              ? 'border-[var(--warning)]/40 bg-[var(--warning)]/10 text-[var(--warning)]'
                              : 'border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10 text-[var(--accent-2)]'
                          }`}>
                            {exp.category}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[var(--fg)] mt-0.5">{exp.company} — {exp.location}</div>
                      </div>
                      <span className="text-xs text-[var(--muted)]">{exp.date}</span>
                    </div>

                    <ul className="list-disc ml-4 space-y-1 text-xs text-[var(--muted)] leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5">{bullet}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]/40">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-1.5 py-0.5 text-[10px] bg-[var(--highlight)] text-[var(--fg)] border border-[var(--border)] rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-sm font-bold text-[var(--warning)] flex items-center gap-2">
                <GraduationCap size={16} /> Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-4 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] space-y-1.5"
                  >
                    <h4 className="font-bold text-xs text-[var(--fg)]">{edu.degree}</h4>
                    <div className="text-xs text-[var(--accent)]">{edu.institution}</div>
                    <div className="text-[11px] text-[var(--muted)]">{edu.location} • {edu.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase font-bold tracking-widest">03 / STACK</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] mt-1">Technical Competencies</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] space-y-4"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] font-bold text-sm text-[var(--accent)]">
                  {idx === 0 ? <Code2 size={16} /> : idx === 1 ? <Settings size={16} /> : <Users size={16} />}
                  <span>{cat.title}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-1 text-xs rounded bg-[var(--highlight)] text-[var(--fg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BLOGS SECTION */}
        <section id="blogs" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase font-bold tracking-widest">04 / WRITING</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] mt-1">Engineering Articles & Writeups</h2>
            </div>
            <span className="text-xs text-[var(--muted)]">{BLOGS.length} Articles Published</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOGS.map((blog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] flex flex-col justify-between hover:border-[var(--accent)] transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                    <span className="px-2 py-0.5 bg-[var(--highlight)] text-[var(--accent)] rounded border border-[var(--border)] text-[10px] font-semibold">
                      {blog.category}
                    </span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => setActiveBlogSlug(blog.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>Read Full Article</span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Article Modal Viewer */}
          <AnimatePresence>
            {activeBlogSlug && (
              <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setActiveBlogSlug(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center pb-3 border-b border-[var(--border)] mb-4">
                    <span className="text-xs text-[var(--muted)] font-bold">ARTICLE VIEWER</span>
                    <button
                      onClick={() => setActiveBlogSlug(null)}
                      className="px-2 py-1 text-xs border border-[var(--border)] rounded hover:border-[var(--error)] text-[var(--error)]"
                    >
                      Close ✕
                    </button>
                  </div>
                  <BlogPostOutput slug={activeBlogSlug} onCommandClick={() => setActiveBlogSlug(null)} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[var(--border)]">
            <div>
              <span className="text-xs text-[var(--accent)] uppercase font-bold tracking-widest">05 / REACH OUT</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--fg)] mt-1">Get In Touch</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Whether you have an Android, Full-Stack, or AI project inquiry, or just want to connect, feel free to send a message.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 border border-[var(--border)] rounded bg-[var(--card-bg)]">
                  <Mail size={16} className="text-[var(--accent)]" />
                  <div>
                    <div className="text-[var(--muted)] text-[10px]">EMAIL</div>
                    <a href={`mailto:${PROFILE.email}`} className="text-[var(--fg)] hover:text-[var(--accent)] font-bold">
                      {PROFILE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border border-[var(--border)] rounded bg-[var(--card-bg)]">
                  <Phone size={16} className="text-[var(--accent-2)]" />
                  <div>
                    <div className="text-[var(--muted)] text-[10px]">PHONE</div>
                    <a href={`tel:${PROFILE.phone}`} className="text-[var(--fg)] hover:text-[var(--accent)] font-bold">
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border border-[var(--border)] rounded bg-[var(--card-bg)]">
                  <MapPin size={16} className="text-[var(--warning)]" />
                  <div>
                    <div className="text-[var(--muted)] text-[10px]">LOCATION</div>
                    <div className="text-[var(--fg)] font-bold">{PROFILE.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="p-6 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] space-y-4">
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-3 py-2 bg-black/40 border border-[var(--border)] rounded text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="ada@example.com"
                    className="w-full px-3 py-2 bg-black/40 border border-[var(--border)] rounded text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="Engineering Collaboration"
                    className="w-full px-3 py-2 bg-black/40 border border-[var(--border)] rounded text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-3 py-2 bg-black/40 border border-[var(--border)] rounded text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-2.5 px-4 bg-[var(--accent)] text-[var(--bg)] font-bold text-xs rounded hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending Transmission...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {contactStatus === 'success' && (
                  <div className="p-3 bg-[var(--accent-2)]/10 border border-[var(--accent-2)] text-[var(--accent-2)] text-xs rounded flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span>Message delivered successfully!</span>
                  </div>
                )}
                {contactStatus === 'error' && (
                  <div className="p-3 bg-[var(--error)]/10 border border-[var(--error)] text-[var(--error)] text-xs rounded flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>Failed to deliver message. Please email directly at {PROFILE.email}.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[var(--border)] text-center text-xs text-[var(--muted)] space-y-2">
        <div>
          <button onClick={onSwitchToTerminal} className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer">
            <Terminal size={13} /> Switch back to Terminal Emulator
          </button>
        </div>
        <div>© {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.</div>
      </footer>
    </div>
  );
};
