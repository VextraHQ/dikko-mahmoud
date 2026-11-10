export type OfficePin = { latitude: number; longitude: number };

/**
 * Turn-by-turn directions to an office in Google Maps, starting from the
 * visitor's location. Uses the office's confirmed pin when it has one, since
 * an address search can land on the wrong building; otherwise the address.
 */
export function directionsUrl(office: {
  address: string;
  city: string;
  pin?: OfficePin | null;
}) {
  const destination = office.pin
    ? `${office.pin.latitude},${office.pin.longitude}`
    : `${office.address}, ${office.city}, Nigeria`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
