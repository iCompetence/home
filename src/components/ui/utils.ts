import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught about the Lavender design tokens, otherwise
 * it cannot tell a custom font size from a custom text colour: `text-body` and
 * `text-lav-white` looked like the same class group, so merging a Button's base
 * classes with its variant silently dropped `text-body` and the button stopped
 * following the type token.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["mega", "h1", "h2", "h3", "sub", "body"] }],
      "text-color": [
        { text: ["lav-navy", "lav-lavender", "lav-page", "lav-blue", "lav-white"] },
      ],
      rounded: [{ rounded: ["pill", "card", "card-sm"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
