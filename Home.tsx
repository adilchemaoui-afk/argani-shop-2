@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 45 33% 97%;
    --foreground: 158 33% 27%;
    --card: 40 30% 94%;
    --card-foreground: 158 33% 27%;
    --popover: 45 33% 97%;
    --popover-foreground: 158 33% 27%;
    --primary: 18 55% 50%;
    --primary-foreground: 45 33% 97%;
    --secondary: 40 30% 94%;
    --secondary-foreground: 158 33% 27%;
    --muted: 40 30% 94%;
    --muted-foreground: 158 33% 27%;
    --accent: 45 33% 97%;
    --accent-foreground: 158 33% 27%;
    --destructive: 18 55% 50%;
    --destructive-foreground: 45 33% 97%;
    --border: 40 20% 92%;
    --input: 40 20% 92%;
    --ring: 18 55% 50%;
    --radius: 0.5rem;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-cream text-cedar font-body;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }

  * {
    @apply border-border;
  }
}

@layer components {
  .zellige-bg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%232E5D4E' stroke-width='0.5' opacity='0.04'%3E%3Cpath d='M60 10 L70 40 L60 35 L50 40 Z'/%3E%3Cpath d='M60 10 L70 40 L85 50 L60 45 Z'/%3E%3Cpath d='M85 50 L70 70 L60 60 L60 45 Z'/%3E%3Cpath d='M70 70 L60 90 L50 70 L60 60 Z'/%3E%3Cpath d='M60 90 L40 70 L50 60 L60 70 Z'/%3E%3Cpath d='M40 70 L25 50 L40 45 L50 60 Z'/%3E%3Cpath d='M25 50 L40 30 L50 40 L40 45 Z'/%3E%3Cpath d='M40 30 L60 10 L60 35 L50 40 Z'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 120px 120px;
  }

  .zellige-bg-gold {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5' opacity='0.04'%3E%3Cpath d='M60 10 L70 40 L60 35 L50 40 Z'/%3E%3Cpath d='M60 10 L70 40 L85 50 L60 45 Z'/%3E%3Cpath d='M85 50 L70 70 L60 60 L60 45 Z'/%3E%3Cpath d='M70 70 L60 90 L50 70 L60 60 Z'/%3E%3Cpath d='M60 90 L40 70 L50 60 L60 70 Z'/%3E%3Cpath d='M40 70 L25 50 L40 45 L50 60 Z'/%3E%3Cpath d='M25 50 L40 30 L50 40 L40 45 Z'/%3E%3Cpath d='M40 30 L60 10 L60 35 L50 40 Z'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 120px 120px;
  }

  .btn-primary {
    @apply bg-terracotta text-cream font-body font-medium text-sm uppercase tracking-wider px-8 py-3.5 rounded transition-all duration-300 inline-block text-center;
  }
  .btn-primary:hover {
    @apply bg-terracotta/90 shadow-btn-hover -translate-y-px;
  }

  .btn-secondary {
    @apply bg-transparent border border-cedar text-cedar font-body font-medium text-sm px-8 py-3.5 rounded transition-all duration-300 inline-block text-center;
  }
  .btn-secondary:hover {
    @apply bg-cedar text-cream;
  }

  .section-padding {
    @apply py-20 md:py-28 lg:py-32;
  }

  .container-main {
    @apply max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
