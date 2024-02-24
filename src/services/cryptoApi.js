const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-16CSmvCHF5RioauuCF4X12ob";
const getCoinsList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=52&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};

const searchCoins = (query) => {
  // `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
  return `https://api.coingecko.com/api/v3/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
};
const marketChart = (coin) => {
  return `
  https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`;
};

export { getCoinsList, searchCoins,marketChart };
