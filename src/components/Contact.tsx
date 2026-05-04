'use client';

import React, { useRef, useState } from 'react';
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setStatus('idle');

    try {
      // Service ID: service_ht356oi
      // Public Key: 18xaqr9p1ZL0j2pan
      // Template ID: template_s8apaqp
      await emailjs.sendForm(
        'service_ht356oi', 
        'template_s8apaqp', 
        formRef.current, 
        '18xaqr9p1ZL0j2pan'
      );

      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Get current date/time for the template
  const currentTime = new Date().toLocaleString();

  return (
    <section id="contact" className="py-24 container">
      <div className="glass-card p-8 md:p-20 rounded-[3rem] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-accent-blue font-mono tracking-widest uppercase mb-4">Contact</h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              Let's build <br />
              <span className="text-gradient">something</span> amazing.
            </h3>
            
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Available for freelance projects and full-time opportunities. 
              Let's connect and discuss how I can help you.
            </p>

            <div className="space-y-6">
              <a href="mailto:siddiquamafaz@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-accent-blue transition-all">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Email Me</p>
                  <p className="text-xl font-bold">siddiquamafaz@gmail.com</p>
                </div>
              </a>

              <div className="flex gap-4 pt-4">
                <a 
                  href="https://github.com/mafazsiddi" 
                  target="_blank" 
                  className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/10"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/mafaz-siddiqua-56085625a" 
                  target="_blank" 
                  className="w-14 h-14 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/10"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Hidden field for Time variable in template */}
              <input type="hidden" name="time" value={currentTime} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-4">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-4">Email</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-4">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent-blue transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className={`w-full py-4 bg-gradient-blue-purple text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSending ? (
                  <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : status === 'success' ? (
                  <>Message Sent! <CheckCircle2 className="w-4 h-4" /></>
                ) : status === 'error' ? (
                  <>Failed to Send <AlertCircle className="w-4 h-4" /></>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm text-center font-medium animate-bounce mt-4">
                  Thank you! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
        <p>© 2026 Mafaz Siddiqua. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
