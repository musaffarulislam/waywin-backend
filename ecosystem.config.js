module.exports = {
    apps: [
      {
        name: 'waywin-server',
        script: 'yarn',
        args: 'start prod',
        interpreter: 'bash',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };