// ---------------------------------------------------------------------------
// App smoke tests: the dashboard renders all five sections and the wallet
// connect flow updates state.
// ---------------------------------------------------------------------------
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("CrediFi dashboard", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the hero and all step sections", () => {
    expect(screen.getByRole("heading", { name: /^CrediFi$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /connect wallet/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /financial credential/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lender verification request/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /outcome, proof & about/i })).toBeInTheDocument();
  });

  it("connects the simulated wallet when requested", async () => {
    fireEvent.click(screen.getByRole("button", { name: /^connect wallet$/i }));
    expect(await screen.findByText(/Simulated in-browser wallet/i)).toBeInTheDocument();
  });
});

// NOTE: the "run a verification and show the eligible verdict" UI flow is NOT
// exercised through jsdom here. The compiled compact-runtime WASM rejects
// byte arrays (Uint8Array) across the JS boundary inside jsdom's realm
// ("invalid type: JsValue(Uint8Array), expected byte array"). The identical
// verification path IS covered, end-to-end, by the node-environment tests in
// engine.test.ts, which run the official compiled contract correctly.