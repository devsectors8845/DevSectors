import { NavMenu } from "@/components/nav-menu";
import { SiteLogo } from "@/components/site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-xl">
      <div className="content-shell flex h-[var(--header-height)] items-center justify-between gap-5">
        <SiteLogo className="relative z-10" />
        <NavMenu />
      </div>
    </header>
  );
}
