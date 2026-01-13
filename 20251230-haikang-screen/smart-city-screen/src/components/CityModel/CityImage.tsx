export const CityImage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "0 auto auto",
        zIndex: 1,
      }}>
      <img
        src={`${import.meta.env.BASE_URL}smart-city-cover.jpg`}
        alt="Smart City Cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};
