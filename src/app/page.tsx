import { Cover } from "@/components/issue/Cover";
import { Contents } from "@/components/issue/Contents";
import { Feature } from "@/components/issue/Feature";
import { BehindTheByline } from "@/components/issue/BehindTheByline";
import { ContributorsNotes, Letters, OffThePage, ShortTakes } from "@/components/issue/Departments";
import { features } from "@/content/features";

/** The issue, in reading order. */
export default function Home() {
  return (
    <>
      <Cover />
      <Contents />
      {features.map((f, i) => (
        <Feature key={f.id} feature={f} index={i} />
      ))}
      <ShortTakes />
      <ContributorsNotes />
      <OffThePage />
      <BehindTheByline />
      <Letters />
    </>
  );
}
