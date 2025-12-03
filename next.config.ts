import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // allow any HTTPS host
            },
            {
                protocol: "http",
                hostname: "**", // allow any HTTP host (optional, less safe)
            },
        ],
    },
};

export default nextConfig;
