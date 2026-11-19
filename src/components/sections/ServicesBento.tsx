import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Lightbulb,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  serviceDivisions,
  type ServiceIconKey,
} from "@/config/services";
import { getVerticalBySlug } from "@/config/verticals";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

function ServiceIcon({ name }: { name: ServiceIconKey }) {
  const iconClass = "h-5 w-5 text-indigo-600 dark:text-indigo-400";
  switch (name) {
    case "bot":
      return <Bot className={iconClass} />;
    case "building":
      return <Building2 className={iconClass} />;
    case "shopping-bag":
      return <ShoppingBag className={iconClass} />;
    case "users":
      return <Users className={iconClass} />;
    case "trending-up":
      return <TrendingUp className={iconClass} />;
    case "lightbulb":
      return <Lightbulb className={iconClass} />;
  }
}

export function ServicesBento() {
  return (
    <section
      id="solutions"
      className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50/70 py-20 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="indigo">Core Service Divisions</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Six Pillars of Digital Transformation
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Beyond our standalone SaaS products, etikoppa Inc. partners with
            enterprises and SMBs to architect, automate, and scale mission-critical
            digital systems.
          </p>
        </div>

        {/* 6-Pillar Bento Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceDivisions.map((service) => (
            <Card
              key={service.id}
              interactive
              className={cn(
                "group flex flex-col justify-between p-6",
                service.span === "wide" && "lg:col-span-2"
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-100/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-slate-950 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>

                <ul
                  className={cn(
                    "mt-5 grid gap-2 text-sm text-slate-700 dark:text-slate-300",
                    service.span === "wide" ? "sm:grid-cols-2" : "grid-cols-1"
                  )}
                >
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <span>Discuss a project</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                {(() => {
                  if (!service.relatedVerticalSlug) return null;
                  const related = getVerticalBySlug(service.relatedVerticalSlug);
                  if (!related) return null;
                  return related.isLive ? (
                    <Link
                      href={`/verticals/${related.slug}`}
                      className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      {related.name} →
                    </Link>
                  ) : (
                    <span className="cursor-not-allowed text-xs font-medium text-slate-400 opacity-60 dark:text-slate-500">
                      {related.name} ({related.status})
                    </span>
                  );
                })()}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
