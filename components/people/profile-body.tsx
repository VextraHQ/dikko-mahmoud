import type { ReactNode } from "react";
import { ProfileContents } from "@/components/people/profile-contents";
import { ProfileIntro } from "@/components/people/profile-intro";
import { ProfileSections } from "@/components/people/profile-sections";
import {
  profileCopy as copy,
  profileSectionLinks,
  type ResolvedProfile,
} from "@/content/profiles";

/**
 * The one profile body shared by the popup and the standalone page, so both
 * always carry the same biography, focus, qualifications and contact. The page
 * adds a full-bleed intro band and a sticky "On this page" list; the popup
 * puts the short lists in a side column instead.
 */
export function ProfileBody({
  resolved,
  variant,
  backLink,
}: {
  resolved: ResolvedProfile;
  variant: "dialog" | "page";
  backLink?: ReactNode;
}) {
  if (variant === "dialog") {
    return (
      <article>
        <div className="bg-sky-50 px-5 pt-6 pb-10 sm:px-10 lg:px-12 lg:py-12">
          <ProfileIntro resolved={resolved} variant="dialog" />
        </div>
        <div className="px-5 pt-10 pb-12 sm:px-10 lg:px-12 lg:pt-14">
          <ProfileSections resolved={resolved} variant="dialog" />
        </div>
      </article>
    );
  }

  return (
    <article>
      <div className="bg-sky-50">
        <div className="mx-auto w-full max-w-360 px-4 pt-10 pb-12 sm:px-8 lg:pt-36 lg:pb-20 xl:px-20">
          <ProfileIntro
            resolved={resolved}
            variant="page"
            backLink={backLink}
          />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-360 items-start gap-10 px-4 pt-12 sm:px-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 lg:pt-20 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16 xl:px-20">
        <aside className="hidden self-stretch lg:block">
          <ProfileContents
            label={copy.contentsLabel}
            sections={profileSectionLinks(resolved)}
          />
        </aside>
        <ProfileSections resolved={resolved} variant="page" />
      </div>
    </article>
  );
}
