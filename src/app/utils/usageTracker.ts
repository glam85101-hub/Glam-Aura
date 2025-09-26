export const getFeatureUsage = () =>
  Number(localStorage.getItem("featureCount") || 0);

export const incrementFeatureUsage = () => {
  const current = getFeatureUsage();
  localStorage.setItem("featureCount", (current + 1).toString());
};

export const resetFeatureUsage = () => localStorage.removeItem("featureCount");
