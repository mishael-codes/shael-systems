export default function Hero3DMonogram() {
  return (
    <div className="relative flex h-full min-h-[28rem] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_60%)]" />

      <div className="relative flex items-center gap-10 perspective-[1600px]">
        {/* Light S */}
        <div className="animate-[spinY_6s_linear_infinite] [transform-style:preserve-3d] will-change-transform">
          <span className="block text-[12rem] font-black leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.7)] [text-shadow:0_4px_12px_rgba(15,23,42,0.15)]">
            S
          </span>
        </div>

        {/* Dark S */}
        <div className="animate-[spinX_8s_linear_infinite] [transform-style:preserve-3d] will-change-transform">
          <span className="block text-[12rem] font-black leading-none text-slate-950 drop-shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
            S
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 backdrop-blur">
        3D identity mark
      </div>
    </div>
  );
}