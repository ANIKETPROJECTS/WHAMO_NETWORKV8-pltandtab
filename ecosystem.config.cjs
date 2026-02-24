module.exports = {
  apps: [
    {
      name: "whamo-designer",
      script: "./dist/index.cjs",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};