"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send, ArrowUpRight, Brain, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "text-purple-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    color: "text-cyan-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: "#",
    color: "text-emerald-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "FarhanAkhtar4",
    href: siteConfig.github,
    color: "text-gray-400",
  },
  {
    icon: Brain,
    label: "Hugging Face",
    value: "FarhanAkhtar11",
    href: siteConfig.huggingface,
    color: "text-yellow-400",
  },
];

/**
 * Contact form using FormSubmit.co — free, no API keys, no SMTP.
 * Submits directly from the browser (client-side) to bypass Cloudflare.
 * First submission triggers a confirmation email. After confirming, it works forever.
 */
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${siteConfig.email}`;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      // Submit directly from browser to FormSubmit.co
      const formBody = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Portfolio Contact: ${formData.name}`,
        _captcha: "false",
        _template: "box",
      });

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formBody.toString(),
      });

      const result = await response.json();

      // Handle FormSubmit activation (first time only)
      if (result.success === "false" && result.message?.includes("Activation")) {
        setStatus("error");
        setErrorMsg(
          "Form activation pending. The site owner needs to check their email and click the activation link from FormSubmit.co. After activation, the form works forever."
        );
        toast({
          title: "Activation Required",
          description: "Check email for FormSubmit.co activation link.",
          variant: "destructive",
        });
      } else if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      } else {
        // FormSubmit returns specific messages
        const msg = result.message || "Something went wrong.";
        setErrorMsg(msg);
        setStatus("error");
        toast({
          title: "Could Not Send",
          description: msg,
          variant: "destructive",
        });
      }
    } catch {
      // Network error — offer mailto fallback
      const mailtoLink = `mailto:${siteConfig.email}?subject=Portfolio Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
      setErrorMsg("Network error. Try the email fallback below.");
      setStatus("error");
      toast({
        title: "Network Error",
        description: "Use the email fallback to send your message.",
        variant: "destructive",
      });
      // Store mailto link for fallback button
      window.__CONTACT_FALLBACK = mailtoLink;
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Contact"
          subtitle="Direct access — no middleman, no form walls"
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Let&apos;s Talk
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                I&apos;m actively looking for ML engineering and AI roles.
                If you&apos;re hiring for positions involving deep learning,
                LLM systems, or agentic AI workflows — let&apos;s connect
                directly.
              </p>
            </div>

            {/* Direct contact cards */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl glass-card hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors">
                    <info.icon className={`h-4 w-4 ${info.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">{info.label}</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                      {info.value}
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === "success" ? (
              /* Success State */
              <div className="glass-card p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 mt-2"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                className="glass-card p-6 space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    disabled={status === "submitting"}
                    className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                    disabled={status === "submitting"}
                    className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about the role or project..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    required
                    disabled={status === "submitting"}
                    className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Error message with mailto fallback */}
                {errorMsg && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">
                    <p className="mb-2">{errorMsg}</p>
                    <a
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio Contact: " + formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`}
                      className="inline-flex items-center gap-1.5 text-purple-300 hover:text-purple-200 underline text-xs"
                    >
                      <Mail className="h-3 w-3" />
                      Or send via email directly
                    </a>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
