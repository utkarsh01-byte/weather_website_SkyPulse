const LoadingSpinner = () => {
  return (
    <div
      className="spinner-grow spin"
      
      style={{ width: "4rem", height: "4rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
export default LoadingSpinner;
