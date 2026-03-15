/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/FMHC',
        destination: '/fmhc',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
