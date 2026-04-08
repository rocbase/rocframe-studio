"use client";

import { useState, useTransition } from "react";

import type { BriefInput, StudioRun } from "@/lib/studio";

type StudioShellProps = {
  initialBrief: BriefInput;
  initialRun: StudioRun;
};

const fieldGroups = [
  {
    title: "Brand Core",
    fields: [
      {
        key: "brandName",
        label: "Brand",
        type: "input",
        placeholder: "RØCFRAME",
      },
      {
        key: "collectionName",
        label: "Collection",
        type: "input",
        placeholder: "Obsidian Halo",
      },
      {
        key: "toneOfVoice",
        label: "Tone",
        type: "textarea",
        rows: 3,
        placeholder: "Mythic, premium, reverent, founder-led.",
      },
    ],
  },
  {
    title: "Creative Direction",
    fields: [
      {
        key: "creativeDirection",
        label: "Scene Direction",
        type: "textarea",
        rows: 5,
        placeholder:
          "Black frame with glowing gold label, deep-purple cosmic backdrop, violet-to-gold nebula spotlight.",
      },
      {
        key: "materialsFinish",
        label: "Materials + Finish",
        type: "textarea",
        rows: 4,
        placeholder: "Obsidian black aluminum, matte-black tube, brushed gold foil seal.",
      },
      {
        key: "colorPalette",
        label: "Palette",
        type: "textarea",
        rows: 4,
        placeholder: "Obsidian Black, Solar Gold, Nebula Violet",
      },
    ],
  },
  {
    title: "Packaging System",
    fields: [
      {
        key: "packagingComponents",
        label: "Components",
        type: "textarea",
        rows: 5,
        placeholder:
          "Black frame\nMatte-black art tube\nCertificate of Authenticity\nThank-you insert",
      },
      {
        key: "deliverables",
        label: "Deliverables",
        type: "textarea",
        rows: 5,
        placeholder:
          "Hero prompt\nLineup prompt\nPackaging spec\nCertificate copy\nLaunch description",
      },
    ],
  },
] as const;

export function StudioShell({
  initialBrief,
  initialRun,
}: StudioShellProps) {
  const [form, setForm] = useState(initialBrief);
  const [run, setRun] = useState(initialRun);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const previewMood = form.creativeDirection.trim()
    ? form.creativeDirection
    : "Luxury launch direction will appear here as you shape the brief.";

  const busy = isSubmitting || isPending;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("The agent run failed. Please try again.");
      }

      const data: StudioRun = await response.json();

      startTransition(() => {
        setRun(data);
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Something broke while running the agents.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(key: keyof BriefInput, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[-12rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(123,76,255,0.46),transparent_58%)]" />
        <div className="absolute right-[-12rem] top-40 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(240,186,84,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute left-[-8rem] top-[38rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(73,36,110,0.55),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_120px_rgba(14,8,28,0.55)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#f0ba54]/20 bg-[#f0ba54]/8 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#f0ba54]">
                RØCFRAME Studio
                <span className="h-1.5 w-1.5 rounded-full bg-[#f0ba54]" />
                Agent Constellation Active
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-white/55">
                  Luxury Product Launch Operating System
                </p>
                <h1 className="max-w-4xl font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                  Turn one cinematic brief into a complete black-and-gold launch
                  pack.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                  Brief once. Let the orchestrator split the work across visual,
                  packaging, copy, and QA agents. Review the result in one place
                  and export a release-ready system.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Agents" value="06" detail="Supervisor + specialists" />
              <StatCard label="Outputs" value="12" detail="Prompts, copy, packaging, QA" />
              <StatCard label="Mode" value="MVP" detail="Buildable from this repo" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#f0ba54]">
                  Live Mood Preview
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Scene Direction
                </p>
              </div>
              <p className="mt-4 font-display text-2xl leading-tight text-white sm:text-3xl">
                {previewMood}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(25,15,44,0.88),rgba(7,5,13,0.92))] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                Current Run
              </p>
              <p className="mt-4 font-display text-3xl text-white">
                {run.projectName}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {run.narrative}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#f0ba54]">
                Generated {run.generatedAt}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_120px_rgba(6,4,14,0.35)] backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#f0ba54]">
                  Brief Composer
                </p>
                <h2 className="mt-3 font-display text-3xl text-white">
                  Build the launch brief
                </h2>
              </div>
              <button
                type="submit"
                form="brief-form"
                className="rounded-full border border-[#f0ba54]/30 bg-[#f0ba54] px-5 py-3 text-sm font-semibold tracking-[0.12em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={busy}
              >
                {busy ? "Running..." : "Run Agent Constellation"}
              </button>
            </div>

            <form id="brief-form" className="space-y-6" onSubmit={handleSubmit}>
              {fieldGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[26px] border border-white/8 bg-black/25 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl text-white">
                      {group.title}
                    </h3>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                      Structured Input
                    </span>
                  </div>

                  <div className="space-y-4">
                    {group.fields.map((field) => (
                      <label key={field.key} className="block">
                        <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/48">
                          {field.label}
                        </span>
                        {field.type === "input" ? (
                          <input
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#f0ba54]/40 focus:bg-white/[0.06]"
                            value={form[field.key]}
                            onChange={(event) =>
                              updateField(field.key, event.target.value)
                            }
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <textarea
                            className="min-h-28 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#f0ba54]/40 focus:bg-white/[0.06]"
                            rows={field.rows}
                            value={form[field.key]}
                            onChange={(event) =>
                              updateField(field.key, event.target.value)
                            }
                            placeholder={field.placeholder}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {error ? (
                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}
            </form>
          </section>

          <section className="space-y-6">
            <CardShell
              eyebrow="Orchestration"
              title="Agent Constellation"
              subtitle="The orchestrator decomposes the brief, specialist agents produce assets, and QA scores the system before export."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {run.agentReports.map((report) => (
                  <article
                    key={report.name}
                    className="rounded-[26px] border border-white/10 bg-black/25 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[#f0ba54]">
                          {report.role}
                        </p>
                        <h3 className="mt-3 font-display text-3xl text-white">
                          {report.name}
                        </h3>
                      </div>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-400/12 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                        {report.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/68">
                      {report.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {report.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 text-sm leading-6 text-white/72"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </CardShell>

            <CardShell
              eyebrow="Prompt Deck"
              title="Visual Direction"
              subtitle="Each prompt is tuned for a premium black-and-gold product narrative with cosmic staging."
            >
              <div className="grid gap-4">
                <ContentCard title="Hero Prompt" value={run.visualPrompts.hero} />
                <ContentCard title="Lineup Prompt" value={run.visualPrompts.lineup} />
                <ContentCard title="Detail Prompt" value={run.visualPrompts.detail} />
              </div>
            </CardShell>

            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <CardShell
                eyebrow="Packaging System"
                title="Physical Spec"
                subtitle="Premium construction notes for the frame, tube, and inserts."
              >
                <div className="grid gap-4">
                  <SpecBlock title="Frame" items={run.packagingSpec.frame} />
                  <SpecBlock title="Art Tube" items={run.packagingSpec.tube} />
                  <SpecBlock title="Inserts" items={run.packagingSpec.inserts} />
                  <SpecBlock
                    title="Production Notes"
                    items={run.packagingSpec.productionNotes}
                  />
                </div>
              </CardShell>

              <CardShell
                eyebrow="Copy Pack"
                title="Launch Language"
                subtitle="Text assets shaped by the Copy Agent and approved by the Brand Guardian."
              >
                <ContentCard title="Launch Description" value={run.copyPack.launchDescription} />
                <ContentCard title="Certificate Copy" value={run.copyPack.certificate} />
                <ContentCard title="Thank-You Insert" value={run.copyPack.thankYou} />
              </CardShell>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <CardShell
                eyebrow="QA"
                title="Readiness Score"
                subtitle="Checks for brand cohesion, packaging completeness, and launch clarity."
              >
                <div className="rounded-[28px] border border-[#f0ba54]/25 bg-[linear-gradient(180deg,rgba(240,186,84,0.08),rgba(255,255,255,0.02))] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                    Confidence
                  </p>
                  <p className="mt-3 font-display text-6xl text-white">
                    {run.qaReport.score}
                  </p>
                  <p className="text-sm text-white/60">out of 100</p>
                </div>

                <div className="mt-4 grid gap-4">
                  <SpecBlock title="Passes" items={run.qaReport.passes} />
                  <SpecBlock title="Warnings" items={run.qaReport.warnings} />
                </div>
              </CardShell>

              <CardShell
                eyebrow="Export Pack"
                title="What Ships Next"
                subtitle="Everything the operator needs to move from direction to production."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {run.exportPack.map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[26px] border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#f0ba54]">
                    Next Actions
                  </p>
                  <ul className="mt-4 space-y-2">
                    {run.nextActions.map((action) => (
                      <li
                        key={action}
                        className="rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 text-sm text-white/70"
                      >
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardShell>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function CardShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_120px_rgba(6,4,14,0.35)] backdrop-blur-xl sm:p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#f0ba54]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ContentCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-[26px] border border-white/10 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[#f0ba54]">{title}</p>
      <p className="mt-4 text-sm leading-7 whitespace-pre-wrap text-white/80">
        {value}
      </p>
    </article>
  );
}

function SpecBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[26px] border border-white/10 bg-black/25 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[#f0ba54]">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 text-sm leading-6 text-white/75"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="min-w-[9rem] rounded-[24px] border border-white/10 bg-black/28 px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl text-white">{value}</p>
      <p className="mt-1 text-sm text-white/58">{detail}</p>
    </article>
  );
}
