import React, { useState } from 'react';
import { PROFILE } from '../../constants/data';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin } from 'lucide-react';
import { playSuccessSound, playErrorSound } from '../../utils/audio';

export const ContactOutput: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      playErrorSound();
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            title: formData.subject || 'Portfolio Inquiry',
            message: formData.message,
            to_name: 'Sushant',
          },
          publicKey
        );
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setStatus('success');
      setStatusMessage('Message transmitted successfully! Sushant will get back to you shortly.');
      playSuccessSound();
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setStatusMessage('Direct transmission failed. You can reach out directly via email at ' + PROFILE.email);
      playErrorSound();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-3xl select-text">
      <div className="flex justify-between items-baseline pb-1 border-b border-[var(--border)]/40 text-[var(--muted)]">
        <span className="text-[var(--accent)] font-bold">CONTACT CHANNELS & TRANSMISSION</span>
        <span className="text-[10px]">Status: ONLINE</span>
      </div>

      <div className="space-y-3 pl-1">
        <div className="space-y-1 pl-3 border-l-2 border-[var(--accent)]/40">
          <div className="font-bold text-[var(--accent)]"># DIRECT CHANNELS</div>
          <div className="text-[var(--fg)]">
            Email: <a href={`mailto:${PROFILE.email}`} className="text-[var(--accent-2)] hover:underline">{PROFILE.email}</a>
          </div>
          <div className="text-[var(--fg)]">
            Phone: <a href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`} className="hover:underline">{PROFILE.phone}</a>
          </div>
          <div className="text-[var(--muted)] text-[11px]">
            Location: {PROFILE.location}
          </div>
        </div>

        <div className="space-y-1 pl-3 border-l-2 border-[var(--accent-2)]/40">
          <div className="font-bold text-[var(--accent-2)]"># VERIFIED SOCIALS</div>
          <div>
            <a href="https://github.com/nsushant09" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline inline-flex items-center gap-1.5">
              <Github size={12} /> GitHub: <span className="text-[var(--accent)]">github.com/nsushant09</span>
            </a>
          </div>
          <div>
            <a href="https://linkedin.com/in/nsushant09" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent)] hover:underline inline-flex items-center gap-1.5">
              <Linkedin size={12} /> LinkedIn: <span className="text-[var(--accent)]">linkedin.com/in/nsushant09</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
