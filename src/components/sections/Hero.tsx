import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { verticals } from "@/config/verticals";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Hero() {
  const liveCount = verticals.filter((v) => v.status === "Live").length;

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Subtle Grid & Radial Glow Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-48 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/20"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <Badge variant="indigo" className="px-3.5 py-1 text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-First Technology Holding • {siteConfig.hq}</span>
            </Badge>
            <Badge variant="live" className="px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>
                {liveCount} Live Vertical • {verticals.length} Ecosystem Pillars
              </span>
            </Badge>
          </div>

          <h1 className="mt-7 font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl sm:leading-[1.08]">
            Digital Innovation.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-sky-400">
              Intelligent Automation.
            </span>{" "}
            Business Growth.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            <strong className="font-semibold text-slate-900 dark:text-white">
              {siteConfig.name}
            </strong>{" "}
            is a parent technology ecosystem and digital services house. From
            standalone AI SaaS products to enterprise-grade ERP, CRM, and
            commerce platforms, we engineer software that makes organizations
            operate smarter.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/#verticals"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <span>Partner With Us</span>
            </Link>
          </div>
        </div>

        {/* Ecosystem Routing Strip */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-black/30 sm:p-5">
            <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-200/80 pb-3.5 dark:border-slate-800/80 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Layers className="h-3.5 w-3.5 text-indigo-500" />
                <span>Parent-to-Vertical Ecosystem Routing</span>
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                <Globe className="h-3.5 w-3.5 text-indigo-500" />
                <span>Hub: {siteConfig.domain}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {verticals.slice(0, 4).map((vertical) => (
                <a
                  key={vertical.slug}
                  href={vertical.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 transition-all hover:border-indigo-500/40 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-900"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2 w-2 shrink-0 rounded-full",
                          vertical.status === "Live"
                            ? "bg-emerald-500"
                            : vertical.status === "In Development"
                            ? "bg-sky-500"
                            : "bg-amber-500"
                        )}
                      />
                      <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {vertical.name}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {vertical.subdomain}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
