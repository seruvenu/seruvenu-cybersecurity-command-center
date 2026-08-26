import { useState, type FormEvent } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) {
      next.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    // Simulated send — no backend wired in this step.
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  const fieldClass = (hasError?: string) =>
    `w-full bg-white/[0.02] border rounded-xl px-4 py-3 pl-11 font-mono text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 ${
      hasError
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-white/[0.08] focus:border-neon-500/50 focus:shadow-glow-soft'
    }`;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="// 06 — Contact"
          title="Establish Connection"
          description="Have a question, collaboration idea, or just want to connect? Send a message through the secure channel below."
          icon={<Mail className="h-3.5 w-3.5" />}
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info panel */}
          <Reveal className="lg:col-span-2">
            <div className="glass p-8 h-full">
              <h3 className="font-display text-xl font-bold text-white mb-2">Secure Channel</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Messages sent through this form are received directly. Whether it's about
                collaboration, learning resources, or security discussions — all are welcome.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Mail className="h-5 w-5 text-neon-400" />
                  <div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="font-mono text-sm text-slate-200">Available on request</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <User className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Profile</p>
                    <p className="font-mono text-sm text-slate-200">Venu — Cyber Security</p>
                  </div>
                </div>
              </div>

              {/* Encrypted badge */}
              <div className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neon-500/5 border border-neon-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-neon-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-500" />
                </span>
                <span className="font-mono text-[10px] text-neon-400 uppercase tracking-wider">
                  End-to-end Encrypted
                </span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={100}>
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 space-y-5">
              {/* Name */}
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className={fieldClass(errors.name)}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={fieldClass(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Type your message here..."
                    className={`${fieldClass(errors.message)} resize-none pt-3`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-medium tracking-wide bg-neon-500/10 text-neon-300 border border-neon-500/40 hover:bg-neon-500/20 hover:border-neon-500/70 hover:shadow-glow-neon hover:text-neon-200 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message Sent
                  </>
                ) : status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-neon-400/30 border-t-neon-400 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm text-neon-400 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Your message has been transmitted successfully.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
