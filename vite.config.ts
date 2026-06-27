import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router') || id.includes('/react-dom/') || id.includes('/react/')) {
            return 'react-vendor';
          }
          if (id.includes('@radix-ui')) return 'ui-vendor';
          if (id.includes('recharts') || id.includes('d3-')) return 'charts-vendor';
          if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('dompurify')) return 'pdf-vendor';
          if (id.includes('date-fns') || id.includes('react-day-picker')) return 'date-vendor';
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'form-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('@supabase')) return 'supabase-vendor';
          if (id.includes('zustand') || id.includes('@tanstack')) return 'state-vendor';
          if (id.includes('embla-carousel') || id.includes('cmdk') || id.includes('vaul') || id.includes('sonner') || id.includes('input-otp') || id.includes('react-resizable')) {
            return 'misc-vendor';
          }
          return 'vendor';
        },
      },
    },
  },
}));
