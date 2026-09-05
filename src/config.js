const requiredEnv = [
  "WOOCOMMERCE_URL",
  "WOOCOMMERCE_CONSUMER_KEY",
  "WOOCOMMERCE_CONSUMER_SECRET"
];

export function getConfig() {
  return {
    woocommerce: {
      url: process.env.WOOCOMMERCE_URL || "",
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || ""
    },
    environment: process.env.VERCEL_ENV || "development"
  };
}

export function checkConfig() {
  const missing = requiredEnv.filter((name) => !process.env[name]);

  return {
    configured: missing.length === 0,
    missing
  };
}
