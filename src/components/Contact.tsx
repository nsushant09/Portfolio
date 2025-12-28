import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { PROFILE } from '../constants/data';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
      // Replace these strings with your actual EmailJS IDs
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

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Mail Error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold tracking-tighter mb-4 text-white">Let's Work Together</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Ready to bring your next project to life? Let's discuss how my expertise in mobile 
          development and DevOps can help achieve your goals.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-5 bg-[#111] p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group">
            <div className="bg-zinc-900 p-4 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Email</p>
              <p className="text-zinc-400 font-medium">{PROFILE.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-[#111] p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group">
            <div className="bg-zinc-900 p-4 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Phone</p>
              <p className="text-zinc-400 font-medium">{PROFILE.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-[#111] p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group">
            <div className="bg-zinc-900 p-4 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Location</p>
              <p className="text-zinc-400 font-medium">{PROFILE.location}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className={`bg-[#111] p-8 rounded-3xl border border-zinc-800 space-y-4 transition-opacity ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Send a Message</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                required
                name="name"
                value={formData.name}
                type="text" 
                placeholder="Your Name" 
                onChange={handleChange}
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl w-full focus:outline-none focus:border-zinc-500 text-white transition-all" 
              />
              <input 
                required
                name="email"
                value={formData.email}
                type="email" 
                placeholder="Your Email" 
                onChange={handleChange}
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl w-full focus:outline-none focus:border-zinc-500 text-white transition-all" 
              />
            </div>
            <input 
              required
              name="subject"
              value={formData.subject}
              type="text" 
              placeholder="Subject" 
              onChange={handleChange}
              className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl w-full focus:outline-none focus:border-zinc-500 text-white transition-all" 
            />
            <textarea 
              required
              name="message"
              value={formData.message}
              placeholder="Your Message" 
              rows={5} 
              onChange={handleChange}
              className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl w-full focus:outline-none focus:border-zinc-500 text-white transition-all resize-none"
            ></textarea>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:bg-zinc-600 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm font-medium flex items-center gap-2 mt-2">
                <CheckCircle2 size={16} /> Message sent successfully!
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm font-medium mt-2">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};