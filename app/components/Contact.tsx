"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "nanpurnanda@gmail.com",
    href: "mailto:nanpurnanda@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 895-0802-5576",
    href: "tel:+6289508025576",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "East Jakarta, Indonesia",
    href: null,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-teal font-mono text-sm mb-2">// let&apos;s connect</p>
          <h2 className="text-3xl md:text-5xl heading-elegant text-text-primary">
            Got a Project in Mind?
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just having a tech chat.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          <div className="space-y-4">
            {contactMethods.map((method, i) => {
              const Wrapper = method.href ? "a" : "div";
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Wrapper
                    {...(method.href
                      ? { href: method.href, target: method.href.startsWith("mailto") ? undefined : "_blank" }
                      : {})}
                    className="group flex items-center gap-4 p-5 rounded-xl glass hover:border-teal/20 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-xl bg-teal/10 text-teal group-hover:bg-teal/20 transition-colors">
                      <method.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted">{method.label}</p>
                      <p className="text-text-primary font-medium truncate">
                        {method.value}
                      </p>
                    </div>
                    {method.href && (
                      <ArrowUpRight
                        size={16}
                        className="text-text-muted group-hover:text-teal transition-colors shrink-0"
                      />
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}

            <motion.a
              href="https://github.com/Keynandz"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group flex items-center gap-4 p-5 rounded-xl glass hover:border-teal/20 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl bg-teal/10 text-teal group-hover:bg-teal/20 transition-colors">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-text-muted">GitHub</p>
                <p className="text-text-primary font-medium">github.com/Keynandz</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-text-muted group-hover:text-teal transition-colors"
              />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const msg = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                window.location.href = `mailto:nanpurnanda@gmail.com?subject=Hello from ${name}&body=${encodeURIComponent(msg)}`;
              }}
              className="p-7 rounded-2xl glass-strong space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal/40 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal/40 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal/40 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-bg font-semibold rounded-xl hover:bg-teal-light transition-all duration-200 glow-teal-sm hover:glow-teal"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
