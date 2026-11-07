// Central configuration for ProProxy download distribution, video tutorial, community links, and product metadata.
// You can update any URL or version info directly here!

export const PROPROXY_CONFIG = {
  brand: {
    name: "ProProxy",
    fullName: "ProProxy Network & Proxy Manager",
    tagline: "Your Connection. Your Control.",
    shortDescription:
      "The next-generation proxy and network traffic orchestration client. Built for developers, security engineers, and privacy-conscious users seeking sub-millisecond routing, protocol inspection, and resilient tunneling.",
    releaseVersion: "v2.0.0",
    releaseDate: "October 2026",
    statusBadge: "ProProxy 2.4 Available Now",
  },

  // Central Download Configuration
  downloads: {
    // Official binary links. Edit these with your actual release URLs (e.g. GitHub Releases, AWS S3, or CDN)
    windows: {
      platform: "Windows",
      subtext: "Windows 10 / 11 (64-bit & ARM64)",
      fileName: "ProProxy.exe",
      fileSize: "35.1 MB",
      url: "/ProProxy.exe",
      isPrimary: true,
      sha256: "9e3b48f88c83750529d2b86378cbffb79e2a39dd16",
    },
  macSilicon: {
    platform: "macOS (Apple Silicon)",
    subtext: "macOS 12.0+ (M1 / M2 / M3 / M4)",
    fileName: "ProProxy-v2.4.0-arm64.dmg",
    fileSize: "72.1 MB",
    url: "https://github.com/proproxy/releases/download/v2.4.0/ProProxy-v2.4.0-arm64.dmg",
    isPrimary: false,
    sha256: "3d5a71ca594f8718e2448ab221c9a632001e",
  },
  macIntel: {
    platform: "macOS (Intel)",
    subtext: "macOS 11.0+ (Intel x86_64)",
    fileName: "ProProxy-v2.4.0-x64.dmg",
    fileSize: "74.8 MB",
    url: "https://github.com/proproxy/releases/download/v2.4.0/ProProxy-v2.4.0-x64.dmg",
    isPrimary: false,
    sha256: "88f3a5bc01e479a4e32049e29a3",
  },
  linux: {
    platform: "Linux",
    subtext: "Ubuntu / Debian / Arch / Fedora (.AppImage & .tar.gz)",
    fileName: "ProProxy-v2.4.0-x86_64.AppImage",
    fileSize: "65.2 MB",
    url: "https://github.com/proproxy/releases/download/v2.4.0/ProProxy-v2.4.0-x86_64.AppImage",
    isPrimary: false,
    sha256: "72a1bf94d41e7371991f2cba0311",
  },
  cli: {
    platform: "ProProxy CLI",
    subtext: "Headless daemon for CI/CD & servers",
    command: "curl -fsSL https://proproxy.dev/install.sh | bash",
    },
  },

  // Central YouTube & Video Tutorial Configuration
  tutorial: {
    heading: "Up and Running with ProProxy",
    subheading: "Watch the comprehensive walkthrough to configure routing rules, upstream chains, and live traffic telemetry in under 4 minutes.",
    // Replace with your real YouTube Video ID or full Embed URL
    youtubeVideoId: "dQw4w9WgXcQ", // Replace with official ProProxy walkthrough video ID
    youtubeWatchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "4 min 18 sec",
    author: "ProProxy Core Engineering",
    steps: [
      {
        step: "01",
        title: "Download & Install",
        desc: "Grab the native installer for your platform. Verified cryptographic signatures guarantee clean system integration.",
      },
      {
        step: "02",
        title: "Import Upstream Nodes",
        desc: "Load SOCKS5, HTTP/S, WireGuard, or Shadowsocks endpoints. Auto-benchmark latency and jitter in real-time.",
      },
      {
        step: "03",
        title: "Define Routing Logic",
        desc: "Set rule-based split tunneling: route dev traffic through internal meshes and web traffic through high-speed nodes.",
      },
      {
        step: "04",
        title: "Launch & Inspect",
        desc: "Activate system-wide or per-app proxying. Monitor live throughput, HTTP frames, and DNS queries in the visual HUD.",
      },
    ],
  },

  // Navigation Links
  navLinks: [
    { label: "Overview", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Guide", href: "#tutorial" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ],

  // Community & Socials
  community: {
    github: "https://github.com/proproxy/proproxy",
    documentation: "https://docs.proproxy.dev",
    discord: "https://discord.gg/proproxy",
    twitter: "https://twitter.com/proproxyapp",
    supportEmail: "support@proproxy.dev",
  },

  // System Requirements
  requirements: {
    windows: "Windows 10 Build 19041+ or Windows 11",
    mac: "macOS Monterey 12.0 or newer",
    linux: "GLIBC 2.31+, Systemd or OpenRC",
    ram: "512 MB available RAM (Ultra-lightweight footprint)",
    disk: "120 MB free storage",
  },
};
