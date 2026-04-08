"use client";

import { useMemo, useState } from "react";

import { formatCurrency } from "@/lib/format";

type Props = {
  productName: string;
  price: number;
  currencyLabel?: string;
  disabled?: boolean;
};

type EmiPlan = {
  months: number;
  annualRate: number;
};

const EMI_PLANS: EmiPlan[] = [
  { months: 3, annualRate: 0.12 },
  { months: 6, annualRate: 0.14 },
  { months: 9, annualRate: 0.15 },
  { months: 12, annualRate: 0.16 }
];

function roundToRupee(value: number) {
  return Math.round(value);
}

export function CheckoutModal({ productName, price, currencyLabel = "INR", disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"pay" | "emi">("pay");
  const [emiMonths, setEmiMonths] = useState<number>(EMI_PLANS[1].months);
  const [cardLast4, setCardLast4] = useState("");
  const [upiId, setUpiId] = useState("");
  const [method, setMethod] = useState<"card" | "upi">("card");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const emiPlan = useMemo(() => EMI_PLANS.find((p) => p.months === emiMonths) ?? EMI_PLANS[0], [emiMonths]);

  const emiBreakdown = useMemo(() => {
    const principal = price;
    const interest = principal * emiPlan.annualRate * (emiPlan.months / 12);
    const total = principal + interest;
    const monthly = total / emiPlan.months;
    return {
      monthly: roundToRupee(monthly),
      total: roundToRupee(total),
      interest: roundToRupee(interest)
    };
  }, [emiPlan.annualRate, emiPlan.months, price]);

  const canSubmit = useMemo(() => {
    if (status !== "idle") return false;
    if (mode === "emi") return true;
    if (method === "card") return /^\d{4}$/.test(cardLast4.trim());
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(upiId.trim()) || upiId.trim().includes("@");
  }, [cardLast4, method, mode, status, upiId]);

  async function submit() {
    if (!canSubmit) return;
    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  }

  function resetAndClose() {
    setIsOpen(false);
    setStatus("idle");
  }

  const primaryCtaLabel =
    mode === "emi" ? `Confirm EMI (${emiMonths} months)` : method === "card" ? "Pay by card" : "Pay by UPI";

  return (
    <>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setMode("pay");
            setIsOpen(true);
          }}
          className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0055ff] disabled:opacity-60"
        >
          Pay now
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setMode("emi");
            setIsOpen(true);
          }}
          className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          EMI options
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(9,73,177,0.25)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e6efff] px-6 py-5">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">Checkout</p>
                <h3 className="text-xl font-black text-[#12233d]">{productName}</h3>
                <p className="text-sm text-[#617594]">
                  Total: <span className="font-bold text-[#12233d]">{formatCurrency(price)}</span>{" "}
                  <span className="text-xs text-[#8293ac]">({currencyLabel})</span>
                </p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-full border border-[#dce9ff] px-4 py-2 text-sm font-semibold text-[#295189]"
              >
                Close
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMode("pay")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === "pay" ? "bg-[#0f6fff] text-white" : "bg-[#f4f8ff] text-[#295189]"
                  }`}
                >
                  Pay now
                </button>
                <button
                  type="button"
                  onClick={() => setMode("emi")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === "emi" ? "bg-[#0f6fff] text-white" : "bg-[#f4f8ff] text-[#295189]"
                  }`}
                >
                  EMI
                </button>
              </div>

              {mode === "pay" ? (
                <div className="mt-5 grid gap-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod("card")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        method === "card" ? "bg-[#12233d] text-white" : "bg-[#f4f8ff] text-[#295189]"
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("upi")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        method === "upi" ? "bg-[#12233d] text-white" : "bg-[#f4f8ff] text-[#295189]"
                      }`}
                    >
                      UPI
                    </button>
                  </div>

                  {method === "card" ? (
                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-[#294a7f]">Card last 4 digits</span>
                      <input
                        value={cardLast4}
                        onChange={(e) => setCardLast4(e.target.value)}
                        inputMode="numeric"
                        placeholder="1234"
                        className="rounded-2xl border border-[#dce9ff] bg-white px-4 py-3 text-sm font-semibold text-[#12233d] outline-none"
                      />
                      <span className="text-xs text-[#8293ac]">Demo checkout: we only validate it’s 4 digits.</span>
                    </label>
                  ) : (
                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-[#294a7f]">UPI ID</span>
                      <input
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="name@bank"
                        className="rounded-2xl border border-[#dce9ff] bg-white px-4 py-3 text-sm font-semibold text-[#12233d] outline-none"
                      />
                      <span className="text-xs text-[#8293ac]">Demo checkout: basic format check only.</span>
                    </label>
                  )}
                </div>
              ) : (
                <div className="mt-5 grid gap-4">
                  <div className="rounded-[22px] border border-[#dce9ff] bg-[#f7faff] p-4">
                    <p className="text-sm font-semibold text-[#295189]">Choose a plan</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {EMI_PLANS.map((plan) => (
                        <button
                          key={plan.months}
                          type="button"
                          onClick={() => setEmiMonths(plan.months)}
                          className={`rounded-2xl px-3 py-3 text-sm font-bold ${
                            plan.months === emiMonths ? "bg-[#0f6fff] text-white" : "bg-white text-[#12233d]"
                          }`}
                        >
                          {plan.months} mo
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-1 text-sm text-[#617594]">
                      <p>
                        Monthly: <span className="font-bold text-[#12233d]">{formatCurrency(emiBreakdown.monthly)}</span>
                      </p>
                      <p>
                        Total: <span className="font-bold text-[#12233d]">{formatCurrency(emiBreakdown.total)}</span>
                      </p>
                      <p>
                        Interest (est.):{" "}
                        <span className="font-bold text-[#12233d]">{formatCurrency(emiBreakdown.interest)}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8293ac]">
                    Demo EMI: these calculations are illustrative and not tied to a payment provider yet.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[#e6efff] px-6 py-5">
              {status === "success" ? (
                <div className="text-sm font-semibold text-[#14804a]">Success! Demo checkout completed.</div>
              ) : (
                <div className="text-xs text-[#8293ac]">No real money is charged (demo flow).</div>
              )}
              <div className="flex gap-3">
                {status === "success" ? (
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full bg-[#12233d] px-5 py-3 text-sm font-bold text-white"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={submit}
                    className="rounded-full bg-[#12233d] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {status === "processing" ? "Processing..." : primaryCtaLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

