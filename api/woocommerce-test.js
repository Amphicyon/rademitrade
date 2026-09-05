import { getConfig, checkConfig } from "../src/config.js";

function basicAuth(username, password) {
  return Buffer.from(`${username}:${password}`).toString("base64");
}

export default async function handler(req, res) {
  const configStatus = checkConfig();

  if (!configStatus.configured) {
    return res.status(500).json({
      status: "error",
      message: "WooCommerce environment variables are missing",
      missing: configStatus.missing
    });
  }

  const config = getConfig();

  const endpoint =
    `${config.woocommerce.url}/wp-json/wc/v3/products?per_page=3`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization:
          `Basic ${basicAuth(
            config.woocommerce.consumerKey,
            config.woocommerce.consumerSecret
          )}`,
        Accept: "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: "error",
        connected: false,
        httpStatus: response.status,
        message: data?.message || "WooCommerce API request failed",
        code: data?.code || null
      });
    }

    return res.status(200).json({
      status: "ok",
      connected: true,
      store: config.woocommerce.url,
      productsReturned: Array.isArray(data) ? data.length : 0,
      products: Array.isArray(data)
        ? data.map((product) => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            status: product.status
          }))
        : [],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      connected: false,
      message: "Could not connect to WooCommerce",
      error: error.message
    });
  }
}
