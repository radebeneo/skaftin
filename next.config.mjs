/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.163.62.128', '10.163.25.97', 'honest-rules-bet.loca.lt'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
