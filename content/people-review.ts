// Internal source notes keyed to canonical people. Never import into public UI
// and never render as biography text. Profile bodies live in content/profiles.ts.
// Source: company profile brochure PDF pp. 27–30 and the supplied Mahmoud
// profile screenshot. Each item needs firm confirmation before publication.
export const profileSourceNotes = [
  {
    personId: "ab-mahmoud",
    notes: [
      "Brochure lists current boards (L & Z Integrated Farms chair; MTN Nigeria Plc, Aig-Imoukhuede, Aliko Dangote and Shehu Musa Yar’Adua foundations, Tristate Healthcare). Omitted until current appointments are confirmed.",
      "Current NGX chairmanship status after 2022 not confirmed; profile states only the 2022 appointment.",
      "NSRP National Advisory Council membership omitted for length; confirm whether to include.",
      "Personal email abmahmoud@dikkoandmahmoud.com comes from the design screenshot; confirm it is public.",
      "Portrait: awaiting approved original; initials fallback in use.",
    ],
  },
  {
    personId: "bello-aminu-abdullahi",
    notes: [
      "Brochure postnominals ‘MIMC, MBA, MIoD, ACIArb (UK), ACIS, ACTI’ conflict with its ‘member of’ wording. Postnominals omitted; memberships listed as ‘Member’ pending confirmation of grades.",
      "Brochure says ‘more than 30 years’ as company secretary/legal adviser; years omitted pending confirmation.",
      "Design shows ‘B.L · Nigerian Law School, Lagos’; brochure gives only the 1988 call to the Bar. Campus omitted.",
      "No personal email supplied; profile offers the firm’s general enquiry address.",
      "Portrait: awaiting approved original; initials fallback in use.",
    ],
  },
  {
    personId: "aminu-sadauki",
    notes: [
      "Brochure says ‘20 years’ experience’ without a reference date; years omitted pending confirmation.",
      "Confirm he still heads the Litigation Department and the MCIArb grade.",
      "Short source: no degrees or call-to-Bar year supplied.",
      "No personal email supplied; profile offers the firm’s general enquiry address.",
      "Portrait: awaiting approved original; initials fallback in use.",
    ],
  },
  {
    personId: "sefiullahi-oseni",
    notes: [
      "Confirm current role as head of the Kano office commercial litigation practice, the 2010/2021 dates and the MCIArb grade.",
      "No degrees or call-to-Bar year supplied.",
      "No personal email supplied; profile offers the firm’s general enquiry address.",
      "Portrait: awaiting approved original; initials fallback in use.",
    ],
  },
] as const;
