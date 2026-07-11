/**
 * Spinner – small inline spinner for buttons and full-page loading.
 * @param {string} size  - "sm" | "md" | "lg"  (default "sm")
 * @param {string} color - Tailwind border color class (default "border-white")
 */
const Spinner = ({ size = "sm", color = "border-white" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
  };

  return (
    <span
      className={`inline-block rounded-full border-t-transparent animate-spin ${sizeClasses[size]} ${color}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
