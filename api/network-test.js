export default async function handler(req, res) {
  const tests = [
    {
      name: "site",
      url: "https://rademitrade.com"
    },
    {
      name: "wordpress_rest",
      url: "https://rademitrade.com/wp-json/"
    },
    {
      name: "woocommerce_rest",
      url: "https://rademitrade.com/wp-json/wc/v3/"
    }
  ];

  const results = [];

  for (const test of tests) {
    try {
      const response = await fetch(test.url, {
        method: "GET",
        redirect: "follow"
      });

      results.push({
        name: test.name,
        url: test.url,
        ok: response.ok,
        status: response.status,
        finalUrl: response.url
      });
    } catch (error) {
      results.push({
        name: test.name,
        url: test.url,
        ok: false,
        error: error.message,
        cause: error.cause?.message || null,
        code: error.cause?.code || null
      });
    }
  }

  res.status(200).json({
    status: "diagnostic",
    service: "Rademitrade Data Sync Engine",
    results,
    timestamp: new Date().toISOString()
  });
}
