import { Cover } from "@/components/issue/Cover";
import { Contents } from "@/components/issue/Contents";

/**
 * The issue, in reading order. Mockup stage: cover and contents only; the
 * features, contributors' notes, off the page and letters follow.
 */
export default function Home() {
  return (
    <>
      <Cover />
      <Contents />
    </>
  );
}
