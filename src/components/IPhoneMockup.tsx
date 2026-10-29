import { cn } from "@/lib/utils";

interface IPhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** Titanium iPhone frame with a Dynamic Island, wrapping a real app screenshot. */
const IPhoneMockup = ({ src, alt, className, priority }: IPhoneMockupProps) => (
  <div className={cn("iphone-frame", className)}>
    <span className="iphone-btn iphone-btn-action" aria-hidden="true" />
    <span className="iphone-btn iphone-btn-vol-up" aria-hidden="true" />
    <span className="iphone-btn iphone-btn-vol-down" aria-hidden="true" />
    <span className="iphone-btn iphone-btn-power" aria-hidden="true" />
    <div className="iphone-screen">
      <img
        src={src}
        alt={alt}
        width={540}
        height={1168}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
      <span className="iphone-island" aria-hidden="true" />
      <span className="iphone-glare" aria-hidden="true" />
    </div>
  </div>
);

export default IPhoneMockup;
