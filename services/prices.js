async function getCurrentPrice(symbol) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );

    if (!res.ok) return null;

    const data = await res.json();
    return typeof data.c === "number" ? data.c : null;
  } catch (err) {
    console.error(`Price fetch failed for ${symbol}:`, err.message);
    return null;
  }
}

module.exports = { getCurrentPrice };
