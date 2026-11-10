import type { OfficePin } from "@/lib/maps";

// Supplied desktop/mobile footer references. Confirm publication details before launch.
//
// `pin`: the office's map position, confirmed with the firm during the
// Contact page work. Until then Directions route to the address. Never guess
// coordinates.
type Office = {
  city: string;
  address: string;
  note?: string;
  phone: string | null;
  telephone: string | null;
  pin?: OfficePin | null;
};

const offices: Office[] = [
  {
    city: "Abuja",
    address: "No. 10 Seguela Street, Off Ibrahim Babangida Way, Wuse II",
    phone: "+234 701 129 9994",
    telephone: "+2347011299994",
  },
  {
    city: "Kano",
    address: "No. 3 Dorawa Road, Nasarawa",
    // Confirm phone number before launch.
    phone: "+234 64 891143",
    telephone: "+23464891143",
  },
  {
    city: "Lagos",
    address: "No. 8 Amore Street, Ikeja",
    note: "Liaison office",
    phone: null,
    telephone: null,
  },
];

export const contact = {
  officeSummary: "Abuja & Kano offices · Lagos liaison office",
  email: "info@dikkoandmahmoud.com",
  hours: "Monday to Friday, 9am to 5pm",
  offices,
};
