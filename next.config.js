/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

// // for transpiling all ESM @fullcalendar/* packages
// // also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
// const withTM = require("next-transpile-modules")(["@fullcalendar"]);

module.exports = nextConfig;
module.exports = withTM({});
