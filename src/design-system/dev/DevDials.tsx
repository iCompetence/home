'use client';

import dynamic from 'next/dynamic';

/**
 * Dev-only mount for the design token dial panel.
 *
 * The guard sits at MODULE level on purpose: bundlers substitute
 * process.env.NODE_ENV at build time, so in a production build the condition is
 * statically false and the whole `dynamic(() => import('./DialPanel'))`
 * expression — the only reference to the panel module — becomes dead code and
 * is dropped. (Checking inside the component body is too late: the import would
 * already be part of the module graph and get emitted as a chunk.)
 *
 * Further safeguards: the panel is loaded lazily and client-only, and
 * DialPanel itself refuses to render on a non-local hostname.
 */
const DialPanel =
  process.env.NODE_ENV === 'production'
    ? () => null
    : dynamic(() => import('./DialPanel').then((m) => m.DialPanel), { ssr: false });

export function DevDials() {
  return <DialPanel />;
}
