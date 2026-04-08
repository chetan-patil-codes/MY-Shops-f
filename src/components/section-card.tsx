export function SectionCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[24px] border border-sky-100 bg-white p-4 shadow-[0_18px_40px_rgba(32,79,166,0.12)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 ${className}`}
    >
      {children}
    </section>
  );
}
