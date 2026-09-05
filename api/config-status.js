import { checkConfig } from "../src/config.js";

export default function handler(req, res) {
  const status = checkConfig();

  res.status(200).json({
    status: "ok",
    service: "Rademitrade Data Sync Engine",
    woocommerce: {
      configured: status.configured,
      missing: status.missing
    },
    environment: process.env.VERCEL_ENV || "development",
    timestamp: new Date().toISOString()
  });
}
