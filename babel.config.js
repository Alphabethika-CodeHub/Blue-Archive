
const { NODE_ENV } = process.env;

const inProduction = NODE_ENV === "production";
const inDevelopment = NODE_ENV === "development";

module.exports = api => {
    /* 
      alternatively, you can utilize api.env() to get the current NODE_ENV:
      const inProduction = api.env("production");
      const inDevelopment = api.env("development");
  
      if using api.env(), then these must be defined before invoking the cache
    */
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: ["@babel/preset-env"],
        "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
        ].filter(Boolean), // this will filter any falsy plugins (such as removing react-remove-properties when not in production)
    };
};