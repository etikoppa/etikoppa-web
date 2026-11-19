import Link from "next/link";
import { ExternalLink, Github, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { verticals } from "@/config/verticals";
import { serviceDivisions } from "@/config/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Parent Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950 dark:text-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/etikoppa.svg"
                alt="etikoppa Inc. logo"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg"
              />
              <span className="font-display">
                etikoppa{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Inc.
                </span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              AI-first parent technology holding brand and digital services
              house building intelligent SaaS verticals and enterprise systems.
            </p>
            <div className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                <span>{siteConfig.hq}</span>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Mail className="h-3.5 w-3.5 text-indigo-500" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Github className="h-3.5 w-3.5 text-indigo-500" />
                <span>github.com/etikoppa</span>
              </a>
            </div>
          </div>

          {/* Ecosystem Verticals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Product Verticals
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {verticals.map((vertical) => (
                <li key={vertical.slug} className="flex items-center justify-between gap-2">
                  <Link
                    href={`/verticals/${vertical.slug}`}
                    className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {vertical.name}
                  </Link>
                  <a
                    href={vertical.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${vertical.name}`}
                    className="text-slate-400 transition-colors hover:text-indigo-500"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Divisions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Service Divisions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceDivisions.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/#solutions"
                    className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.githubOrg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  <span>Open Source</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row">
          <p>
            © {year} {siteConfig.name} All rights reserved. Headquartered in{" "}
            {siteConfig.hq}.
          </p>
          <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            Parent Hub: {siteConfig.domain} • Edge Deployed
          </p>
        </div>
      </div>
    </footer>
  );
}
