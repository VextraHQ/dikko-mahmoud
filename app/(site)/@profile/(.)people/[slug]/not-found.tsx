import {
  ProfileDialog,
  ProfileDialogTitle,
} from "@/components/people/profile-dialog";
import { Eyebrow } from "@/components/ui/eyebrow";
import { profileCopy } from "@/content/profiles";
import { systemPages } from "@/content/system-pages";

// An unknown or unavailable profile reached by client navigation stays inside
// the overlay, so the page beneath keeps its single site shell.
export default function ProfileOverlayNotFound() {
  return (
    <ProfileDialog labels={profileCopy.dialog}>
      <div className="px-5 py-10 sm:px-10 lg:px-12">
        <Eyebrow>{systemPages.notFound.eyebrow}</Eyebrow>
        <ProfileDialogTitle>
          <h2
            data-profile-heading
            tabIndex={-1}
            className="mt-4 font-serif text-4xl/[1.1] outline-none"
          >
            {profileCopy.unavailableTitle}
          </h2>
        </ProfileDialogTitle>
      </div>
    </ProfileDialog>
  );
}
