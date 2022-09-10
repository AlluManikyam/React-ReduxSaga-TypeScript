/**
 * Renders the preloader
 */
const Loader = () => {
  return (
    <div id="loader-page">
      <div className="preloader">
        <div className="status">
          <div
            style={{ color: "#f13b49", fontWeight: "bold" }}
            className="text-center"
          >
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
