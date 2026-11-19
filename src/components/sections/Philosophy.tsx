import { Compass, Cpu, Eye, ShieldCheck, Target, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const principleIcons = [Zap, Cpu, Target, ShieldCheck, Compass];

export function Philosophy() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-slate-200/80 py-20 dark:border-slate-800/80 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="indigo">About etikoppa Inc.</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Mission, Vision &amp; Engineering Philosophy
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Headquartered in {siteConfig.hq}, we build durable digital
            infrastructure with the speed of a startup and the rigor of an
            enterprise engineering house.
          </p>
        </div>

        {/* Mission & Vision Split Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-50/80 via-white to-white p-8 dark:border-indigo-500/20 dark:from-indigo-950/40 dark:via-slate-900/70 dark:to-slate-900/60">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-950 dark:text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {siteConfig.mission}
            </p>
          </Card>

          <Card className="relative overflow-hidden border-violet-500/20 bg-gradient-to-br from-violet-50/80 via-white to-white p-8 dark:border-violet-500/20 dark:from-violet-950/40 dark:via-slate-900/70 dark:to-slate-900/60">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-950 dark:text-white">
              Our Vision
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {siteConfig.vision}
            </p>
          </Card>
        </div>

        {/* 5-Pillar Engineering Principles Strip */}
        <div
          id="philosophy"
          className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/60 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
              Development Philosophy
            </h3>
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              5 Core Engineering Principles
            </span>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.principles.map((principle, idx) => {
              const Icon = principleIcons[idx % principleIcons.length];
              return (
                <div
                  key={principle.title}
                  className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-950/60"
                >
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-mono text-[11px] font-semibold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-sm font-bold text-slate-950 dark:text-white">
                    {principle.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
