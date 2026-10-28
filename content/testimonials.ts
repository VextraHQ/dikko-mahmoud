export type TestimonialPreview = {
  id: string;
  quote: string | null;
  name: string | null;
  role: string | null;
  organisation: string | null;
  image: { src: string; alt: string } | null;
};

export const clientPerspectives = {
  eyebrow: "From our clientele",
  heading: "Client perspectives.",
  action: "Speak to the team",
  reviewNote: "Preview only · approved testimonials pending",
  quotePending:
    "An approved client testimonial will appear here, sharing their experience of working with Dikko & Mahmoud.",
  anonymousName: "Client perspective",
  previewName: "Preview testimonial",
};

// Anonymous layout slots only. Never attribute sample text to a real client.
export const testimonialPreviews: TestimonialPreview[] = [
  {
    id: "pending-01",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: null,
  },
  {
    id: "pending-02",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: null,
  },
  {
    id: "pending-03",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: null,
  },
];
