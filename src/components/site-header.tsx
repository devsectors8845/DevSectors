import { NavCta } from "@/components/nav-cta";
import { NavMenu } from "@/components/nav-menu";
import { SiteLogo } from "@/components/site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="relative mx-auto grid h-[var(--header-height)] max-w-[1200px] grid-cols-[1fr_auto] items-center gap-3 rounded-[1.5rem] border border-line bg-canvas/85 px-4 shadow-soft backdrop-blur-xl sm:px-6 xl:grid-cols-[1fr_auto_1fr]">
        <SiteLogo className="justify-self-start" />
        <NavMenu />
        <div className="hidden justify-self-end xl:block">
          <NavCta />
        </div>
      </div>
    </header>
  );
}
