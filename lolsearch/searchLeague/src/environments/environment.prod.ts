export const environment = {
  production: true,
  "/api": {
    "target": "https://na1.api.riotgames.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  },
  "/dragon": {
    "target": "http://ddragon.leagueoflegends.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/dragon": ""
    }
  }
};
