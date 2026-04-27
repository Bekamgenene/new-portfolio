/** @type {import('next').NextConfig} */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const remotePatterns = [];

if (supabaseUrl) {
  const parsedUrl = new URL(supabaseUrl);

  remotePatterns.push({
    protocol: parsedUrl.protocol.replace(":", ""),
    hostname: parsedUrl.hostname,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns,
  },
};

export default nextConfig;
