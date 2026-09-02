export type StepKey = "credential" | "requirement" | "verifying" | "result";

const STEPS: { key: StepKey; n: string; label: string }[] = [
  { key: "credential", n: "①", label: "Wallet" },
  { key: "requirement", n: "②", label: "Requirements" },
  { key: "verifying", n: "③", label: "Verify" },
  { key: "result", n: "④", label: "Result" },
];

const order: StepKey[] = ["credential", "requirement", "verifying", "result"];

type ProgressStepsProps = {
  current: StepKey;
};

export function ProgressSteps({ current }: ProgressStepsProps) {
  const currentIndex = order.indexOf(current);
  return (
    <ol className="progress" aria-label="Verification progress">
      {STEPS.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={s.key} className={`progress-step ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>
            <span className="progress-bullet" aria-hidden>
              {done ? "✓" : s.n}
            </span>
            <span className="progress-label">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
