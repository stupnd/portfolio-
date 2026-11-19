import { Cover } from "@/components/issue/Cover";
import { Contents } from "@/components/issue/Contents";
import { BehindTheByline } from "@/components/issue/BehindTheByline";

/**
 * The issue, in reading order. Mockup stage: cover and contents only; the
 * features, contributors' notes, off the page and letters follow.
 */
export default function Home() {
  return (
    <>
      <Cover />
      <Contents />
      {/* Sits between Off the page and Letters once those departments land */}
      <BehindTheByline />
    </>
  );
}
