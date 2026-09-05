export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    service: "Rademitrade Data Sync Engine",
    version: "1.0.0",
    environment: process.env.VERCEL_ENV || "local",
    timestamp: new Date().toISOString()
  });
}
