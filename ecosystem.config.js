module.exports = {
  apps: [
    {
      name: "modern-store-front",
      script: "npm",
      args: "start",

      exec_mode: "fork",
      instances: 1,

      watch: false,
      autorestart: true,

      env: {
        NODE_ENV: "development",
        PORT: 3000
      }
    }
  ]
};
