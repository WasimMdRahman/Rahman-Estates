'use client';

const GoogleMap = ({ lat, lng, title }: { lat: number; lng: number; title: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-full w-full bg-muted flex items-center justify-center rounded-2xl">
        <p className="text-muted-foreground text-center p-4">
          Google Maps API Key missing.
          <br />
          Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
        </p>
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`;

  return (
    <iframe
      title={`Map of ${title}`}
      src={mapSrc}
      width="100%"
      height="100%"
      className="border-0 rounded-2xl"
      style={{ filter: 'invert(1) hue-rotate(180deg)' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMap;
