import { StudioShell } from "@/components/studio-shell";
import { defaultBrief, runStudioBrief } from "@/lib/studio";

const defaultRun = runStudioBrief(defaultBrief);

export default function Home() {
  return <StudioShell initialBrief={defaultBrief} initialRun={defaultRun} />;
}
