module.exports = {
    apps: [
        {
            name: "modern-store-front",
            script: 'npm',
            args: 'start',
            instances: 1,
            exec_mode: 'fork',
            autorestart: true,
            watch: false,
            max_memory_restart: '2G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            }
        }
    ]
};
