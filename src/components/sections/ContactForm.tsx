"use client";

import * as React from "react";
import { useActionState } from "react";
import {
  CheckCircle2,
  Github,
  Loader2,
  Mail,
  MapPin,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  submitContactInquiry,
  type ContactActionState,
} from "@/app/actions/contact";
import { siteConfig } from "@/config/site";
import { verticals } from "@/config/verticals";
import { serviceDivisions } from "@/config/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/70 py-20 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Metadata & Value Prop */}
          <div className="lg:col-span-5">
            <Badge variant="indigo">Collaborate &amp; Partner</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Build With etikoppa Inc.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Whether you&apos;re an enterprise evaluating AI automation, a team
              adopting ReelSmith, or a developer looking to collaborate—reach
              out directly and our engineering leadership will respond.
            </p>

            {/* Direct Metadata Badges */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800/80 dark:bg-slate-900/70">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Headquarters
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {siteConfig.hq}
                  </p>
                </div>
              </div>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white/80 p-4 transition-colors hover:border-indigo-500/40 dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-indigo-500/40"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Direct Email
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <a
                href={siteConfig.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white/80 p-4 transition-colors hover:border-indigo-500/40 dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-indigo-500/40"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Open Source &amp; Engineering
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    github.com/etikoppa
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Server Action Form */}
          <Card className="p-6 sm:p-8 lg:col-span-7">
            <form ref={formRef} action={formAction} className="space-y-5" noValidate>
              {/* Honeypot field — hidden from humans */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                  />
                  {state.fieldErrors?.name && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {state.fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="priya@company.com"
                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                  />
                  {state.fieldErrors?.email && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {state.fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    placeholder="Acme Technologies"
                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                  />
                  {state.fieldErrors?.company && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {state.fieldErrors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-interest"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Vertical of Interest <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    required
                    defaultValue="ReelSmith (reelsmith.etikoppa.in)"
                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    <optgroup label="Product Verticals">
                      {verticals.map((v) => (
                        <option
                          key={v.slug}
                          value={`${v.name} (${v.subdomain})`}
                        >
                          {v.name} ({v.subdomain})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Service Divisions">
                      {serviceDivisions.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </optgroup>
                    <option value="General Partnership / Investment">
                      General Partnership / Collaboration
                    </option>
                  </select>
                  {state.fieldErrors?.interest && (
                    <p className="mt-1.5 text-xs text-rose-500">
                      {state.fieldErrors.interest}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project goals, timeline, or how you'd like to collaborate..."
                  className="mt-2 block w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
                {state.fieldErrors?.message && (
                  <p className="mt-1.5 text-xs text-rose-500">
                    {state.fieldErrors.message}
                  </p>
                )}
              </div>

              {state.status === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-300"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{state.message}</p>
                </div>
              )}

              {state.status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-800 dark:text-rose-300"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{state.message}</p>
                </div>
              )}

              <div className="flex flex-col items-start justify-between gap-3 pt-1 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protected with server-side validation &amp; spam filtering.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
