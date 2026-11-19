import type { StaticImageData } from "next/image";
import outtake from "../../public/photos/byline-outtake.webp";
import headshot from "../../public/photos/headshot.jpg";
import canal from "../../public/photos/ottawa-canal.jpg";
import kayaks from "../../public/photos/kayaks.jpg";
import moraine from "../../public/photos/moraine.jpg";
import flamingos from "../../public/photos/flamingos.jpg";

/**
 * "Behind the byline": the personal spread. Static imports give next/image
 * the intrinsic size (no layout shift) and a generated blur placeholder.
 * Captions are in the magazine's voice and must not invent facts.
 */
export interface BylinePhoto {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Crop focus for object-position */
  focus?: string;
}

/** Placeholder until Stuti supplies the lede. Rendered visibly as a placeholder. */
export const bylineLede: string | null = null;

export const bylineHero: BylinePhoto = {
  id: "outtake",
  src: outtake,
  alt: "Stuti on a red staircase in a glass atrium, blowing a kiss at the camera",
  caption: "The editor, off deadline. An outtake from the cover shoot.",
  focus: "50% 35%",
};

export const bylinePhotos: BylinePhoto[] = [
  {
    id: "headshot",
    src: headshot,
    alt: "Portrait of Stuti in a plaid blazer and an IEEE name badge, hands folded",
    caption: "And on deadline. Same editor, plaid blazer.",
    focus: "50% 22%",
  },
  {
    id: "canal",
    src: canal,
    alt: "Sunset over the Rideau Canal locks in Ottawa, with a bridge and the city beyond",
    caption: "Home edition: the Rideau Canal locks at sundown.",
    focus: "50% 55%",
  },
  {
    id: "kayaks",
    src: kayaks,
    alt: "A rowboat, two kayaks and a pedal boat tied up at a wooden dock on a forest lake",
    caption: "Four ways off one dock. Decisions, decisions.",
    focus: "50% 60%",
  },
  {
    id: "moraine",
    src: moraine,
    alt: "Red and blue canoes on the shore of Moraine Lake in Banff, mountains behind",
    caption: "Moraine Lake, Banff. Perfect on the first run; no ablations needed.",
    focus: "50% 70%",
  },
  {
    id: "flamingos",
    src: flamingos,
    alt: "Stuti, seen from behind, reaching toward a flock of flamingos at a park",
    caption: "Interviewing sources. They declined to comment.",
    focus: "60% 60%",
  },
];
