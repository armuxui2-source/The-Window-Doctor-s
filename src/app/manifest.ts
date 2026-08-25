import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Window Doctor - Enterprise Glazing & Admin Suite',
    short_name: 'Window Doctor',
    description: 'Bicester & Oxfordshire Master Glaziers Management Suite & Repair Services since 1983.',
    start_url: '/admin',
    display: 'standalone',
    background_color: '#0B132B',
    theme_color: '#0B132B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
