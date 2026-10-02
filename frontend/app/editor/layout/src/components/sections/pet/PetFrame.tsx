export default function PetFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-pet-theme=""
      className="bg-white text-[#2C1810]"
      style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      <style>{`
        [data-pet-theme] [data-editor-button-hover="true"]::after {
          content: "" !important;
          background-image: url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><g transform='rotate(-48 16 16)'><rect x='11.4' y='1.6' width='9.2' height='5' rx='1.3' fill='#1e3a8a'/><rect x='11.4' y='6' width='9.2' height='14.6' rx='1.2' fill='#3b82f6'/><rect x='11.4' y='8.6' width='9.2' height='1.6' fill='#1d4ed8'/><path d='M11.4 20.2h9.2L16 30.2 11.4 20.2z' fill='#94a3b8'/><path d='M14.2 25.2h3.6L16 30.2l-1.8-5z' fill='#1e293b'/></g></svg>`,
          )}");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 22px 22px;
        }
      `}</style>
      {children}
    </div>
  );
}
