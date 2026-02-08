module.exports = {
  apps: [
    {
      name: "modern-store-front",
      script: "npx",
      args: "serve -s build -l 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false
    }
  ]
};
