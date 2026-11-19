import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  History,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  getVerticalBySlug,
  verticals,
  type VerticalStatus,
} from "@/config/verticals";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface VerticalPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return verticals.map((vertical) => ({
    slug: vertical.slug,
  }));
}

export async function generateMetadata({
  params,
}: VerticalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vertical = getVerticalBySlug(slug);

  if (!vertical) {
    return {
      title: "Vertical Not Found",
    };
  }

  return {
    title: `${vertical.name} — ${vertical.category}`,
    description: vertical.valueProposition,
    alternates: {
      canonical: `/verticals/${vertical.slug}`,
    },
    openGraph: {
      title: `${vertical.name} | ${siteConfig.name}`,
      description: vertical.valueProposition,
      url: `${siteConfig.url}/verticals/${vertical.slug}`,
    },
  };
}

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

export default async function VerticalDetailPage({
  params,
}: VerticalPageProps) {
  const { slug } = await params;
  const vertical = getVerticalBySlug(slug);

  if (!vertical) {
    notFound();
  }

  const isGithubPrimary = vertical.url.includes("github.com");

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Link */}
        <Link
          href="/#verticals"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Ecosystem Directory</span>
        </Link>

        {/* Header Hero Card */}
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-lg shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/70 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vertical.logoPath}
                alt={`${vertical.name} logo`}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-2xl"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">{vertical.category}</Badge>
                  <Badge variant={getStatusVariant(vertical.status)}>
                    {vertical.statusLabel}
                  </Badge>
                </div>
                <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {vertical.name}
                </h1>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {vertical.subdomain}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {vertical.isLive ? (
                <>
                  <a
                    href={vertical.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "primary", size: "md" })}
                  >
                    <span>
                      {isGithubPrimary ? "View on GitHub" : `Launch ${vertical.name}`}
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {vertical.githubUrl && !isGithubPrimary && (
                    <a
                      href={vertical.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "outline", size: "md" })}
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </>
              ) : (
                <>
                  <span
                    aria-disabled="true"
                    className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-5 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500"
                  >
                    {vertical.status}
                  </span>
                  <Link
                    href="/#contact"
                    className={buttonVariants({ variant: "outline", size: "md" })}
                  >
                    Request Early Access
                  </Link>
                </>
              )}
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {vertical.overview}
          </p>
        </div>

        {/* Capabilities + Impact Case Study */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <Card className="p-6 sm:p-7 md:col-span-7">
            <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white">
              Core Capabilities
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {vertical.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col justify-between border-indigo-500/25 bg-gradient-to-br from-indigo-50/80 via-white to-white p-6 dark:border-indigo-500/25 dark:from-indigo-950/40 dark:via-slate-900/70 dark:to-slate-900/60 sm:p-7 md:col-span-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Outcome Highlight</span>
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                {vertical.caseStudy.metric}
              </p>
              <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                {vertical.caseStudy.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {vertical.caseStudy.summary}
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Request an enterprise demo →
            </Link>
          </Card>
        </div>

        {/* Architecture Overview & Release Notes */}
        <div className="mt-6 grid gap-6 md:grid-cols-12">
          <Card className="p-6 sm:p-7 md:col-span-7">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Cpu className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                Architecture Overview
              </h2>
            </div>
            <p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              Target: {vertical.architecture.hosting}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {vertical.architecture.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <ul className="mt-5 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              {vertical.architecture.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 sm:p-7 md:col-span-5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <History className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                Release Notes
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              {vertical.releaseNotes.map((note) => (
                <div
                  key={note.version}
                  className="border-l-2 border-indigo-500/40 pl-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {note.version}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {note.date}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {note.summary}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
