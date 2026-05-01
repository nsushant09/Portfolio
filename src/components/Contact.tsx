import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { PROFILE } from '../constants/data';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const formY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
            to_name: "Sushant", 
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Mail Error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-40 px-6 max-w-7xl mx-auto relative overflow-hidden z-10 pointer-events-none">
      <div className="pointer-events-auto">
        <motion.div style={{ y: textY }} className="text-center mb-32 relative z-10">
        <h2 className="font-heading text-6xl md:text-9xl font-black mb-6 text-white tracking-tighter">LET'S TALK</h2>
        <p className="text-zinc-300 text-xl tracking-[0.3em] uppercase font-bold">Start a Project</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-20 relative z-10">
        {/* Contact Info Cards */}
        <div className="space-y-8 mt-10">
          <p className="text-zinc-400 text-xl leading-relaxed mb-12 font-medium">
            Ready to bring your next idea to life? I'm currently available for freelance work and open to new opportunities. Let's build something amazing together.
          </p>
          
          <div className="flex items-center gap-6 bg-[#111] p-6 rounded-sm border border-zinc-800 hover:border-zinc-500/50 shadow-sm hover:shadow-xl hover:shadow-zinc-500/5 transition-all duration-300 group">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-sm text-zinc-300 group-hover:scale-110 group-hover:bg-zinc-300 group-hover:text-[#050505] transition-all duration-300">
              <Mail size={32} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Email</p>
              <p className="text-white font-bold text-xl">{PROFILE.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-[#111] p-6 rounded-sm border border-zinc-800 hover:border-zinc-500/50 shadow-sm hover:shadow-xl hover:shadow-zinc-500/5 transition-all duration-300 group">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-sm text-zinc-300 group-hover:scale-110 group-hover:bg-zinc-300 group-hover:text-[#050505] transition-all duration-300">
              <Phone size={32} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Phone</p>
              <p className="text-white font-bold text-xl">{PROFILE.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-[#111] p-6 rounded-sm border border-zinc-800 hover:border-zinc-500/50 shadow-sm hover:shadow-xl hover:shadow-zinc-500/5 transition-all duration-300 group">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-sm text-zinc-300 group-hover:scale-110 group-hover:bg-zinc-300 group-hover:text-[#050505] transition-all duration-300">
              <MapPin size={32} />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1 uppercase tracking-widest">Location</p>
              <p className="text-white font-bold text-xl">{PROFILE.location}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <motion.div style={{ y: formY }} className="relative">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className={`bg-[#111] p-10 md:p-14 rounded-sm border border-zinc-800 shadow-2xl space-y-6 transition-opacity relative overflow-hidden ${loading ? 'opacity-70 pointer-events-none' : 'opacity-100'}`}
          >
            {/* Form decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-700/5 rounded-bl-none -z-10 border-b border-l border-zinc-700/10"></div>

            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-sm">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-heading text-3xl font-black text-white">Send a Message</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  type="text" 
                  onChange={handleChange}
                  className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-white font-medium transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Your Email</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  type="email" 
                  onChange={handleChange}
                  className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-white font-medium transition-all" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Subject</label>
              <input 
                required
                name="subject"
                value={formData.subject}
                type="text" 
                onChange={handleChange}
                className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-white font-medium transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                required
                name="message"
                value={formData.message}
                rows={5} 
                onChange={handleChange}
                className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm w-full focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 text-white font-medium transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-300 text-[#050505] py-6 rounded-sm font-black tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:bg-zinc-200 hover:shadow-xl hover:shadow-zinc-500/10 transition-all active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed group border border-zinc-400"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> 
                  Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-300 bg-zinc-500/10 p-4 rounded-sm text-sm font-bold flex items-center gap-3 mt-4 border border-zinc-500/20">
                <CheckCircle2 size={20} /> Message sent successfully! I'll be in touch soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 bg-red-500/10 p-4 rounded-sm text-sm font-bold mt-4 border border-red-500/20 flex items-center gap-3">
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
      </div>
    </section>
  );
};