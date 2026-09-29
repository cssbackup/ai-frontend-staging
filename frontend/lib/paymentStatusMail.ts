export type PaymentStatusMailInput = {
  status: "success" | "failed";
  productLabel: string;
  amountLabel?: string;
  reason?: string;
  retryUrl?: string;
  provider?: string;
};

/** Fire-and-forget payment success/failed mail to user + admin. */
export function notifyPaymentStatusMail(input: PaymentStatusMailInput) {
  if (typeof window === "undefined") return;
  void fetch("/api/user/payments/payment-status-mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  }).catch(() => undefined);
}
