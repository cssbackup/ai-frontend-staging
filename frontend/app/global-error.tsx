"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          <p>Please try again.</p>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
