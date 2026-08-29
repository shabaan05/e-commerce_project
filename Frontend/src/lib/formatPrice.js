/**
 * Format a numeric price for display in INR (Indian Rupees).
 * Does not modify stored values — display only.
 */
export const formatPrice = (amount) => {
  const value = Number(amount);
  if (Number.isNaN(value)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
