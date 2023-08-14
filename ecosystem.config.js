module.exports = {
  apps: [
    {
      name: 'SynsoftGlobal',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_development: {
        PORT: 3001,
        NEXT_PUBLIC_APP_ENV: 'development' // APP_ENV=development
      },
      env_staging: {
        PORT: 4002,
        NEXT_PUBLIC_APP_ENV: 'staging' // APP_ENV=staging
      },
      env_production: {
        PORT: 1339,
        NEXT_PUBLIC_APP_ENV: 'production' // APP_ENV=production
      }
    }
  ]
}