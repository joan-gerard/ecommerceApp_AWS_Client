/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    stripeKey: process.env.STRIPE_SECRET_KEY
  }
}

module.exports = nextConfig
