/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove static export to allow SSR (getServerSideProps) for /events and /events/[slug]
  // If "output: 'export'" exists in next.config.js, ensure it's removed there as well.
};
 
export default nextConfig;
