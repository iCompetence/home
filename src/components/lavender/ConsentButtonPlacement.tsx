'use client';

import { useEffect } from 'react';

/**
 * Usercentrics draws its privacy button (the fingerprint that reopens the
 * consent settings) in its own shadow root, bottom right as set in its admin
 * interface. There it lay on the last links of the open menu (Stefan,
 * 26.11.2026), so it moves to the bottom left. The rules mirror Usercentrics'
 * own `.privacyButton.left` rules (24 px, 40 px from tablet up) and only
 * match while the admin setting is "right": once it is "left" there, they do
 * nothing and this component can go.
 *
 * While one of the site's dialogs is open the button is hidden altogether:
 * see `#usercentrics-cmp-ui` in globals.css.
 */
const HOST_ID = 'usercentrics-cmp-ui';
const CSS = `
  .privacyButton.right { right: auto; left: 24px; }
  .privacyButton.desktop.right, .privacyButton.tablet.right { right: auto; left: 40px; }
`;

export function ConsentButtonPlacement() {
  useEffect(() => {
    // One sheet, adopted by the shadow root: unlike a <style> element it
    // survives Usercentrics re-rendering its content (banner, button, settings).
    let sheet: CSSStyleSheet | null = null;
    try {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS);
    } catch {
      sheet = null; // no constructable stylesheets: the <style> fallback below
    }

    const place = () => {
      const root = document.getElementById(HOST_ID)?.shadowRoot;
      if (!root) return false;
      if (sheet) {
        if (!root.adoptedStyleSheets.includes(sheet)) root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      } else if (!root.querySelector('style[data-ic-placement]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ic-placement', '');
        style.textContent = CSS;
        root.appendChild(style);
      }
      return true;
    };

    // Usercentrics adds its element some time after the page has loaded, and
    // may add it anew: watch the children of <body> (few, rare changes).
    place();
    const observer = new MutationObserver(place);
    observer.observe(document.body, { childList: true });
    // The shadow root can follow the element a moment later.
    let tries = 0;
    const timer = setInterval(() => {
      if (place() || ++tries > 120) clearInterval(timer);
    }, 250);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  return null;
}
