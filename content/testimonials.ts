import { hasText } from "@/lib/content";

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
// Images are Unsplash stock portraits (free licence), decorative placeholders
// until approved client photos are supplied.
export const testimonialPreviews: TestimonialPreview[] = [
  {
    id: "pending-01",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: { src: "/images/stock/testimonial-01.jpg", alt: "" },
  },
  {
    id: "pending-02",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: { src: "/images/stock/testimonial-02.jpg", alt: "" },
  },
  {
    id: "pending-03",
    quote: null,
    name: null,
    role: null,
    organisation: null,
    image: { src: "/images/stock/testimonial-03.jpg", alt: "" },
  },
];

/** Testimonials with an approved quote. */
export const suppliedTestimonials = testimonialPreviews.filter((item) =>
  hasText(item.quote),
);

/** Placeholder slots show only while no approved quote exists. */
export const visibleTestimonials = suppliedTestimonials.length
  ? suppliedTestimonials
  : testimonialPreviews;
