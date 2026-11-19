"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import {
  VERTICAL_CATEGORIES,
  verticals,
  type VerticalCategory,
  type VerticalStatus,
} from "@/config/verticals";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

function getStatusVariant(status: VerticalStatus) {
  switch (status) {
    case "Live":
      return "live";
    case "Beta":
      return "beta";
    case "In Development":
      return "dev";
    case "Coming Soon":
      return "soon";
  }
}

export function VerticalsGrid() {
  const [activeCategory, setActiveCategory] = React.useState<
    "All" | VerticalCategory
  >("All");

  const filtered = React.useMemo(() => {
    if (activeCategory === "All") return verticals;
    return verticals.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="verticals"
      className="scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="indigo">Ecosystem Directory</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Independent Product Verticals
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Every product in the etikoppa ecosystem runs on its own dedicated
              subdomain and edge deployment—accessible directly from our parent
              hub.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter product verticals by category"
            className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-900/80"
          >
            {VERTICAL_CATEGORIES.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                    selected
                      ? "bg-white text-indigo-600 shadow-sm dark:bg-indigo-600 dark:text-white"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vertical) => {
            const isGithubPrimary = vertical.url.includes("github.com");

            return (
              <Card
                key={vertical.slug}
                interactive
                className="flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vertical.logoPath}
                        alt={`${vertical.name} mark`}
                        width={42}
                        height={42}
                        className="h-10 w-10 rounded-xl"
                      />
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                          {vertical.name}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {vertical.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="mt-4">
                    <Badge variant={getStatusVariant(vertical.status)}>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          vertical.status === "Live" && "bg-emerald-500",
                          vertical.status === "Beta" && "bg-violet-500",
                          vertical.status === "In Development" && "bg-sky-500",
                          vertical.status === "Coming Soon" && "bg-amber-500"
                        )}
                      />
                      <span>{vertical.statusLabel}</span>
                    </Badge>
                  </div>

                  {/* 2-line Value Proposition */}
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {vertical.valueProposition}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
                  <Link
                    href={`/verticals/${vertical.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  >
                    <span>Overview</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {vertical.githubUrl && !isGithubPrimary && (
                      <a
                        href={vertical.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${vertical.name} on GitHub`}
                        className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={vertical.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <span>
                        {isGithubPrimary ? "View on GitHub" : "Launch App"}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
