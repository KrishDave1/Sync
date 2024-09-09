/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ["lh3.googleusercontent.com"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

export default nextConfig;
