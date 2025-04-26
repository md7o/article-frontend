interface GlassCardProps {
  children: React.ReactNode;
  title: string;
}

export default function GlassCard({ children, title }: GlassCardProps) {
  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        {title}
      </h1>
      {children}
    </div>
  );
}
