import { isDev } from "../constants";

const GoogleMap = ({ location }: { location: string }) => {
  if (!isDev()) {
    return (
      <div
        style={{
          width: 600,
          height: 450,
          border: "solid 1px grey",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Google Map Placeholder
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_EMBED_APIKEY}&q=${location}`;
  return (
    <iframe
      width="80%"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={src}
    ></iframe>
  );
};

export default GoogleMap;

// make use of the Google maps embed api to show location
// https://developers.google.com/maps/documentation/embed/get-api-key
