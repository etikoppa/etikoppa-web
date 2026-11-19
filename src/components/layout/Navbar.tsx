"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  ExternalLink,
  Grid2x2,
  Menu,
  Moon,
  Sun,
  X,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { verticals, type VerticalStatus } from "@/config/verticals";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

function statusDotClass(status: VerticalStatus) {
  switch (status) {
    case "Live":
      return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.75)]";
    case "Beta":
      return "bg-violet-500";
    case "In Development":
      return "bg-sky-500";
    case "Coming Soon":
      return "bg-amber-500";
  }
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [launcherOpen, setLauncherOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const launcherRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        launcherRef.current &&
        !launcherRef.current.contains(event.target as Node)
      ) {
        setLauncherOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLauncherOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950 dark:text-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/etikoppa.svg"
            alt="etikoppa Inc. logo"
            width={30}
            height={30}
            className="h-7 w-7 rounded-lg"
          />
          <span className="font-display">
            etikoppa{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Inc.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {/* Products App Launcher Dropdown */}
          <div className="relative" ref={launcherRef}>
            <button
              type="button"
              onClick={() => setLauncherOpen((open) => !open)}
              aria-expanded={launcherOpen}
              aria-haspopup="menu"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                launcherOpen
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
              )}
            >
              <Grid2x2 className="h-4 w-4" />
              <span>Products</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  launcherOpen && "rotate-180"
                )}
              />
            </button>

            {launcherOpen && (
              <div
                role="menu"
                className="absolute left-0 mt-2 w-[380px] origin-top-left rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/50"
              >
                <div className="flex items-center justify-between px-2.5 pb-2 pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    etikoppa Ecosystem Launcher
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    *.{siteConfig.domain}
                  </span>
                </div>

                <div className="space-y-1">
                  {verticals.map((vertical) =>
                    vertical.isLive ? (
                      <a
                        key={vertical.slug}
                        href={vertical.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => setLauncherOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-100/90 dark:hover:bg-slate-800/80"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vertical.logoPath}
                          alt=""
                          width={36}
                          height={36}
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-lg"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                              {vertical.name}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  statusDotClass(vertical.status)
                                )}
                              />
                              {vertical.status}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-600 dark:text-slate-400">
                            {vertical.shortDescription}
                          </p>
                          <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                            <span>{vertical.subdomain}</span>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div
                        key={vertical.slug}
                        role="menuitem"
                        aria-disabled="true"
                        className="flex cursor-not-allowed items-start gap-3 rounded-xl p-2.5 opacity-50 grayscale select-none"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vertical.logoPath}
                          alt=""
                          width={36}
                          height={36}
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-lg"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                              {vertical.name}
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                              {vertical.status}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                            {vertical.shortDescription}
                          </p>
                          <div className="mt-1 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                            {vertical.subdomain}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-2 border-t border-slate-200/80 pt-2 dark:border-slate-800">
                  <Link
                    href="/#verticals"
                    onClick={() => setLauncherOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                  >
                    <span>Explore full ecosystem directory</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle color theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            Partner With Us
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ecosystem Apps
            </p>
            <div className="mt-2 space-y-1">
              {verticals.map((vertical) =>
                vertical.isLive ? (
                  <a
                    key={vertical.slug}
                    href={vertical.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          statusDotClass(vertical.status)
                        )}
                      />
                      {vertical.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                      {vertical.status}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                ) : (
                  <div
                    key={vertical.slug}
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-400 opacity-55 dark:text-slate-500"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                      {vertical.name}
                    </span>
                    <span className="text-xs">{vertical.status}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "w-full"
              )}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
