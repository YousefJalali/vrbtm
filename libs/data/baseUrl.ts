export const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_DEVELOPMENT_URL
