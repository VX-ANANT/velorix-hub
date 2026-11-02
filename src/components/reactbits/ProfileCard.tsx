import { memo, useEffect, useRef, type CSSProperties } from "react";
import "./ProfileCard.css";

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>",
)}")`;

const DARK: Record<string, string> = {
  "--pc-frame": "rgba(20, 8, 12, 0.72)",
  "--pc-frame-edge": "rgba(255, 255, 255, 0.08)",
  "--pc-frame-highlight": "rgba(255, 255, 255, 0.07)",
  "--pc-frame-shadow": "0 22px 44px -20px rgba(0,0,0,.8), 0 6px 16px -8px rgba(0,0,0,.5)",
  "--pc-tile": "linear-gradient(180deg, #1a0a0f 0%, #050203 100%)",
  "--pc-tile-edge": "rgba(255, 255, 255, 0.07)",
  "--pc-tile-highlight": "rgba(255, 255, 255, 0.12)",
  "--pc-tile-shadow": "0 4px 10px -4px rgba(0,0,0,.7)",
  "--pc-ink": "#f4f4f5",
  "--pc-muted": "rgba(244,244,245,.6)",
  "--pc-hover": "brightness(1.12)",
  "--pc-press": "brightness(0.8)",
  "--pc-shade": "rgba(0,0,0,.4)",
  "--pc-blend": "color-dodge",
  "--pc-holo-filter": "hue-rotate(0deg)",
  "--pc-sheen": "rgba(255,255,255,.16)",
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Props = {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  statusColor?: string;
  contactText?: string;
  onContactClick?: () => void;
  holo?: number;
  glare?: number;
  tiltStrength?: number;
  parallax?: number;
  radius?: number;
  className?: string;
};

const ProfileCard = ({
  avatarUrl, name, title, handle, status, statusColor = "#22c55e", contactText,
  onContactClick, holo = 0.8, glare = 0.5, tiltStrength = 12, parallax = 8, radius = 16, className = "",
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = { w: root.offsetWidth, h: root.offsetHeight };
    const x = { p: 0, v: 0, t: 0 }, y = { p: 0, v: 0, t: 0 }, light = { p: 0, t: 0 };
    let raf = 0, last = 0, slowUntil = 0, touchId: number | null = null;

    const write = () => {
      const angle = reduced ? 0 : tiltStrength;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const s = root.style;
      s.setProperty("--pc-light-x", `${((x.p + 1) * 0.5 * size.w).toFixed(1)}px`);
      s.setProperty("--pc-light-y", `${((y.p + 1) * 0.5 * size.h).toFixed(1)}px`);
      s.setProperty("--pc-pointer-x", `${((x.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--pc-pointer-y", `${((y.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--pc-band-x", `${(50 + x.p * 15).toFixed(2)}%`);
      s.setProperty("--pc-band-y", `${(50 + y.p * 15).toFixed(2)}%`);
      s.setProperty("--pc-rotate-x", `${(y.p * angle).toFixed(3)}deg`);
      s.setProperty("--pc-rotate-y", `${(-x.p * angle).toFixed(3)}deg`);
      s.setProperty("--pc-shift-x", `${(x.p * (reduced ? 0 : parallax)).toFixed(2)}px`);
      s.setProperty("--pc-shift-y", `${(y.p * (reduced ? 0 : parallax)).toFixed(2)}px`);
      s.setProperty("--pc-reach", tilt.toFixed(4));
      s.setProperty("--pc-tilt", (tilt * light.p).toFixed(4));
      s.setProperty("--pc-active", light.p.toFixed(4));
    };
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const k = slow ? 24 : 120, d = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt * 120)), h = dt / steps;
      for (let i = 0; i < steps; i++) for (const a of [x, y]) { a.v += (k * (a.t - a.p) - d * a.v) * h; a.p += a.v * h; }
      const tau = light.t > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.t - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving = [x.t - x.p, y.t - y.p, x.v, y.v].some((n) => Math.abs(n) > 0.0005) || Math.abs(light.t - light.p) > 0.002;
      if (moving) raf = requestAnimationFrame(frame);
      else { x.p = x.t; y.p = y.t; light.p = light.t; write(); raf = 0; }
    };
    const wake = () => { if (raf) return; last = performance.now(); raf = requestAnimationFrame(frame); };
    const aim = (nx: number, ny: number, on = true) => { x.t = clamp(nx, -1, 1); y.t = clamp(ny, -1, 1); light.t = on ? 1 : 0; slowUntil = 0; wake(); };
    const aimAt = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (r.width && r.height) aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") aimAt(e); };
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse" || e.pointerId === touchId) aimAt(e); };
    const onLeave = (e: PointerEvent) => { if (e.pointerType === "mouse") aim(0, 0, false); };
    const onDown = (e: PointerEvent) => { if (e.pointerType === "mouse") return; touchId = e.pointerId; aimAt(e); };
    const onUp = (e: PointerEvent) => { if (e.pointerId !== touchId) return; touchId = null; aim(0, 0, false); };
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    const ro = new ResizeObserver(() => { size.w = root.offsetWidth; size.h = root.offsetHeight; write(); });
    ro.observe(root);
    if (!reduced) { x.p = 0.62; y.p = -0.55; light.p = 1; slowUntil = performance.now() + 1400; write(); wake(); } else write();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
    };
  }, [avatarUrl, tiltStrength, parallax]);

  const style = {
    ...DARK,
    "--pc-radius": `${radius}px`,
    "--pc-backdrop": "var(--pc-tile)",
    "--pc-holo": clamp(holo, 0, 1),
    "--pc-glare": clamp(glare, 0, 1),
    "--pc-parallax": `${parallax}px`,
    "--pc-status": statusColor,
    "--pc-grain": GRAIN,
    "--pc-pattern": "linear-gradient(#000, #000)",
    "--pc-pattern-size": "100% 100%",
    "--pc-holo-gain": 0.75,
    "--pc-holo-detail": 0,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={`profile-card ${className}`.trim()} style={style}>
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <span className="profile-card__sheen" />
          <span className="profile-card__holo">
            <span className="profile-card__holo-glow" />
            <span className="profile-card__holo-shift" />
          </span>
          <img key={avatarUrl} className="profile-card__photo" src={avatarUrl} alt={name} width={768} height={960} draggable={false} />
          <span className="profile-card__scrim" />
          <div className="profile-card__info">
            <h3 className="profile-card__name">{name}</h3>
            <p className="profile-card__title">{title}</p>
          </div>
          <span className="profile-card__tile-rim" />
        </div>
        <div className="profile-card__footer">
          <div className="profile-card__meta">
            <span className="profile-card__handle">{handle}</span>
            <span className="profile-card__status">{status}</span>
          </div>
          {contactText && (
            <button type="button" className="profile-card__contact" onClick={onContactClick}>
              {contactText}
            </button>
          )}
        </div>
        <span className="profile-card__glare" />
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </div>
  );
};

export default memo(ProfileCard);
