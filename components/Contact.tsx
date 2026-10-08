"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),

  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileRef =
    useRef<TurnstileInstance | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const watchedFields = watch();

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const isFieldValid = (
    fieldName: keyof FormData
  ) => {
    return Boolean(
      watchedFields[fieldName] &&
        !errors[fieldName]
    );
  };

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const onSubmit = async (data: FormData) => {
    if (!siteKey) {
      toast.error(
        "Security verification is not configured."
      );
      return;
    }

    if (!turnstileToken) {
      toast.error(
        "Please complete the security verification."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...data,
            turnstileToken,
          }),
        }
      );

      let result: {
        success?: boolean;
        message?: string;
      };

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "Invalid response from the server."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to send message."
        );
      }

      toast.success(
        "Message sent successfully!",
        {
          description:
            "Thank you for reaching out. I'll get back to you soon.",
          duration: 5000,
        }
      );

      reset();

      resetTurnstile();
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      toast.error(
        "Failed to send message",
        {
          description:
            error instanceof Error
              ? error.message
              : "Please try again or contact me directly via email.",
          duration: 5000,
        }
      );

      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-blue-50/80 dark:bg-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
            Get In{" "}
            <span className="text-blue-600 dark:text-purple-400">
              Touch
            </span>
          </h2>

          <div className="w-20 h-1 bg-blue-600 dark:bg-purple-400 mx-auto mb-6" />

          <p className="text-blue-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Available for AI Engineering roles and
            full-stack development opportunities.
            Let's discuss how I can help build your
            next GenAI application or scalable API
            solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >
            <h3 className="text-2xl font-semibold text-blue-900 dark:text-white mb-8">
              Hire Me
            </h3>

            <div className="space-y-6">

              {/* Email */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg mr-4">
                  <Mail
                    size={24}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-blue-600 dark:text-gray-400 text-sm">
                    Email
                  </p>

                  <div className="flex flex-col gap-1">
                    <a
                      href="mailto:hello@dravit.in"
                      className="text-blue-900 dark:text-white hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                    >
                      hello@dravit.in
                    </a>

                    <a
                      href="mailto:dravit162@gmail.com"
                      className="text-blue-900 dark:text-white hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                    >
                      dravit162@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg mr-4">
                  <Phone
                    size={24}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-blue-600 dark:text-gray-400 text-sm">
                    Phone
                  </p>

                  <p className="text-blue-900 dark:text-white">
                    Available on request
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg mr-4">
                  <MapPin
                    size={24}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-blue-600 dark:text-gray-400 text-sm">
                    Location
                  </p>

                  <p className="text-blue-900 dark:text-white">
                    Chennai | Remote Available
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg mr-4">
                  <span className="text-white text-xl">
                    💼
                  </span>
                </div>

                <div>
                  <p className="text-blue-600 dark:text-gray-400 text-sm">
                    Availability
                  </p>

                  <p className="text-blue-900 dark:text-white">
                    AI Engineering & Full-Stack Roles
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-white mb-4">
                Follow Me
              </h4>

              <div className="flex gap-4">

                <a
                  href="https://github.com/codebydravit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 bg-blue-200 hover:bg-blue-600 hover:text-white dark:bg-slate-700 dark:hover:bg-purple-600 text-blue-900 dark:text-white rounded-lg transition-colors duration-300"
                >
                  <FaGithub size={24} />
                </a>

                <a
                  href="https://linkedin.com/in/dravit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 bg-blue-200 hover:bg-blue-600 hover:text-white dark:bg-slate-700 dark:hover:bg-purple-600 text-blue-900 dark:text-white rounded-lg transition-colors duration-300"
                >
                  <FaLinkedin size={24} />
                </a>

              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-lg text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("name")
                          ? "border-green-500 focus:border-green-500"
                          : "border-blue-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-purple-500"
                      }`}
                      placeholder="Your Name"
                    />

                    {isFieldValid("name") && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-lg text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("email")
                          ? "border-green-500 focus:border-green-500"
                          : "border-blue-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-purple-500"
                      }`}
                      placeholder="your.email@company.com"
                    />

                    {isFieldValid("email") && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-lg text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("subject")
                        ? "border-green-500 focus:border-green-500"
                        : "border-blue-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-purple-500"
                    }`}
                    placeholder="AI Project Collaboration / Job Opportunity"
                  />

                  {isFieldValid("subject") && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      ✓
                    </div>
                  )}
                </div>

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>

                <div className="relative">
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-lg text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("message")
                        ? "border-green-500 focus:border-green-500"
                        : "border-blue-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-purple-500"
                    }`}
                    placeholder="Tell me about your GenAI application, full-stack project, or AI engineering opportunity!"
                  />

                  {isFieldValid("message") && (
                    <div className="absolute right-3 top-3 text-green-500">
                      ✓
                    </div>
                  )}
                </div>

                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Cloudflare Turnstile */}
              {siteKey ? (
                <div className="flex justify-center py-2">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={siteKey}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                    }}
                    onError={() => {
                      setTurnstileToken("");

                      toast.error(
                        "Security verification failed."
                      );
                    }}
                    onExpire={() => {
                      setTurnstileToken("");

                      toast.error(
                        "Security verification expired. Please verify again."
                      );
                    }}
                  />
                </div>
              ) : (
                <p className="text-sm text-red-500 text-center">
                  Security verification is not configured.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  !isValid ||
                  !turnstileToken ||
                  isSubmitting ||
                  !siteKey
                }
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                  !isValid ||
                  !turnstileToken ||
                  isSubmitting ||
                  !siteKey
                    ? "bg-blue-300 dark:bg-slate-600 cursor-not-allowed text-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mt-16 pt-8 border-t border-blue-200 dark:border-slate-700"
        >
          <p className="text-blue-600 dark:text-gray-400">
            © 2026 Dravit V
          </p>
        </motion.div>

      </div>
    </section>
  );
}