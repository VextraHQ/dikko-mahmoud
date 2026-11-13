import { contact } from "@/content/contact";
import { firmBrand } from "@/content/firm";
import { siteConfig } from "@/content/site";

/** JSON for a `<script type="application/ld+json">` tag, safe to inline. */
export function jsonLdString(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * The firm described for search engines (schema.org LegalService). Every
 * value comes from `content/`; nothing is written here by hand. Null until
 * the site is indexable, so unconfirmed details are never published early.
 */
export function firmStructuredData(
  siteUrl: string,
  indexable: boolean = siteConfig.indexable,
) {
  if (!indexable) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: firmBrand.name,
    description: siteConfig.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/navy-logo.png`,
    email: contact.email,
    telephone: contact.offices.find((office) => office.telephone)?.telephone,
    address: contact.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressCountry: "NG",
    })),
  };
}
