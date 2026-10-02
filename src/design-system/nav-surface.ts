import { createContext, useContext } from 'react';

/**
 * Colour of the nav pill and everything that opens from it (burger panel,
 * language toggle). 'dark' = navy pill on light pages (default); 'light' =
 * white pill on dark pages such as the principles page (2026-10-02).
 */
export type NavSurface = 'dark' | 'light';

export const NavSurfaceContext = createContext<NavSurface>('dark');

export const useNavSurface = () => useContext(NavSurfaceContext);

/** Classes that swap with the surface. */
export const NAV_TONE = {
  dark: {
    pill: 'bg-lav-navy text-lav-white',
    text: 'text-lav-white',
    muted: 'text-lav-white/70',
    divider: 'bg-lav-white/20',
    chip: 'bg-lav-white/10 text-lav-white',
    logo: '/iCompetence_white.svg',
  },
  light: {
    pill: 'bg-lav-white text-lav-navy',
    text: 'text-lav-navy',
    muted: 'text-lav-navy/70',
    divider: 'bg-lav-navy/20',
    chip: 'bg-lav-lavender text-lav-navy',
    logo: '/iCompetence_black.svg',
  },
} as const;
