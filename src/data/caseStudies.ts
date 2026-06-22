export interface ResultItem {
  label: string;
  metric?: string;
  description: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  client: string;
  role: string;
  timeline: string;
  techStack: string[];
  challenge: string;
  solution: string;
  features: string[];
  results: ResultItem[];
}

export const caseStudies: CaseStudyData[] = [
  {
    id: "gift-pastries",
    title: "Gift Pastries",
    subtitle: "A seamless, high-conversion WhatsApp inquiry portal for a bespoke bakery",
    description:
      "Designed and developed a visually-driven e-commerce landing page for a boutique bakery. The site features a categorized product gallery and a specialized ordering system that translates complex custom cake requirements into structured WhatsApp inquiries.",
    image: "/images/gift-pastries.png",
    link: "https://gift-pastries.netlify.app",
    tags: ["Landing Page", "Client Inquiry Portal", "E-commerce"],
    client: "Gift's Pastries & Cake Boutique (The Cake Cottage Cafe)",
    role: "Design & Full-Stack Development",
    timeline: "2 Weeks",
    techStack: ["React", "Tailwind CSS", "Vite", "Lucide React", "Netlify"],
    challenge:
      "Customers struggled to explain custom cake orders (size, layers, flavors, custom text, and toppers) via traditional messaging, leading to back-and-forth friction, order errors, and lost sales. The bakery needed a way to guide users to configure their cakes and automatically format those specifications into a clear, structured inquiry.",
    solution:
      "We built a high-performance, mouth-watering landing page displaying their premium offerings (Custom Cakes, Pastries, Event Catering) with a responsive image gallery. We implemented a Custom Ordering Portal that collects all details (size, layers, flavors, custom message, delivery date) and compiles them into a pre-filled WhatsApp message, instantly launching WhatsApp for checkout.",
    features: [
      "Interactive Product Catalog: Grouped items with clear baseline pricing (₦15k for cakes, ₦5k for pastries).",
      "Dynamic Ordering Flow: Custom form that captures specific choices and launches WhatsApp with formatted text.",
      "Responsive Media Gallery: Optimized image loading to display custom cake portfolio.",
      "Direct Contacts: Quick access to call (07014598383) or Instagram (@giftspastriesandcake)."
    ],
    results: [
      {
        label: "Fast Time-to-First-Byte",
        metric: "764ms",
        description: "Measured TTFB of 764ms on first load — a fully server-optimised Netlify deployment that serves the page nearly instantly to visitors."
      },
      {
        label: "Fully Mobile-Responsive",
        metric: "100%",
        description: "Built mobile-first with a responsive viewport and fluid layouts, ensuring a seamless experience across phones, tablets, and desktops."
      },
      {
        label: "WhatsApp-Powered Inquiry Flow",
        metric: "6 Touch Points",
        description: "Six distinct WhatsApp integration points guide visitors from browsing to ordering — eliminating manual back-and-forth and structuring every inquiry automatically."
      }
    ]
  },
  {
    id: "jemmy-glam",
    title: "Jemmy Glam",
    subtitle: "Elevating local beauty service bookings with a customized WhatsApp intake portal",
    description:
      "Developed a high-conversion landing page for a beauty service provider, featuring a custom-built lead capture system that bridges the gap between web inquiries and direct client communication via WhatsApp.",
    image: "/images/jemmy-glam.png",
    link: "https://jemmy-glam.vercel.app",
    tags: ["Client Inquiry Portal", "Responsive Design", "Service Catalog"],
    client: "Jemmy Glam Nails & Beauty",
    role: "Frontend Design & Booking System Integration",
    timeline: "3 Weeks",
    techStack: ["React", "Tailwind CSS", "Vite", "Cloudinary", "Vercel"],
    challenge:
      "A busy beauty specialist in Idiaraba, LUTH, Lagos struggled with managing scheduling, explaining complex add-on combinations (e.g., nail extensions, 3D art, chrome, refills), and handling client intakes manually over calls and messages.",
    solution:
      "We built a luxurious, mobile-first portfolio and service catalog with a full pricing engine modal for different nail lengths and styles (Gel, Acrylic, Toes, Brow, Waxing). We integrated a structured appointment request form that captures name, phone, service details, and notes and formats them into a neat WhatsApp booking template.",
    features: [
      "Luxurious Visual Grid: Showcases past nail transformations and custom artwork.",
      "Interactive Pricing Engine: Modal display of plain vs customized acrylics, refills, and gems.",
      "Custom Appointment Intake: Capture name, phone, chosen service, and custom requirements.",
      "Direct CTA: One-tap WhatsApp scheduling and call buttons."
    ],
    results: [
      {
        label: "Sub-Second Server Response",
        metric: "727ms",
        description: "Measured TTFB of 727ms — hosted on Vercel's global edge network, ensuring pages load quickly for clients in Lagos and beyond."
      },
      {
        label: "Zero-Friction Booking Flow",
        description: "Replaced phone-tag and manual DMs with a structured appointment form that compiles client details and launches a pre-filled WhatsApp message in one tap."
      },
      {
        label: "Modern, Mobile-First UI",
        description: "Designed for mobile devices from the ground up — where the majority of clients browse. Clean typography, a visual gallery, and an interactive pricing engine make services immediately clear."
      }
    ]
  },
  {
    id: "cuttr",
    title: "Cuttr",
    subtitle: "A fast, clean, and analytical URL shortener with real-time tracking",
    description:
      "Created a user-friendly dashboard for a link shortening service, allowing users to easily manage and track their shortened URLs with real-time analytics and a clean, intuitive interface.",
    image: "/images/cuttr.png",
    link: "https://cuttr.vercel.app",
    tags: ["Authentication", "CRUD", "Analytics", "SaaS Dashboard"],
    client: "Internal SaaS Product / Freelance Project",
    role: "Full-Stack Engineering (UI & Analytics)",
    timeline: "4 Weeks",
    techStack: ["React", "Tailwind CSS", "Vite", "Supabase", "PostgreSQL", "Lucide React", "Vercel"],
    challenge:
      "Existing URL shorteners either charge steep prices for basic analytics or have cluttered interfaces filled with intrusive ads, causing a bad user experience for creators and small businesses.",
    solution:
      "We built Cuttr, an ad-free, high-performance link management platform. We created a sleek UI that lets any guest shorten links instantly, and provides registered users a clean dashboard with advanced tracking, customizable slug aliases, and instant QR code generation.",
    features: [
      "Instant Shortening: Simple homepage input that creates shortened URLs in milliseconds.",
      "Personalized Slugs: Signed-in users can customize links with unique branded aliases.",
      "Dashboard Analytics: Visualizes click counts, locations, and browser referrers.",
      "Dynamic QR Code Generator: One-click export of custom QR codes.",
      "Tiered Subscriptions: Implemented a free tier (up to 5 links, basic analytics) and premium tier ($5/mo for unlimited links, advanced dashboard)."
    ],
    results: [
      {
        label: "Clean, Intuitive Navigation",
        description: "A clear information hierarchy — Home, Why Cuttr, Pricing, FAQs — lets new users understand the product and take action without confusion or friction."
      },
      {
        label: "Fully Responsive Dashboard",
        description: "The link management dashboard adapts seamlessly to any screen size, letting users shorten, track, and manage links from a phone or desktop alike."
      },
      {
        label: "Modern SaaS UI",
        description: "A contemporary dark-accented interface with smooth interactions, clear CTAs, and a tiered pricing model — designed to look and feel like a premium product."
      }
    ]
  }
];
