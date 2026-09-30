import { useReveal } from "../hooks";
import { SectionHead } from "./About";
import SkillsGame from "./SkillsGame";
import SkillScroll from "./SkillScroll";

export default function Skills() {
  const body = useReveal<HTMLDivElement>(0.08);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        index="02"
        kicker="Skills"
        title="Bump a block,"
        accent="collect the skills."
        tail=""
      />

      <div
        ref={body.ref}
        className={`reveal ${body.shown ? "in" : ""} mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]`}
      >
        <SkillsGame />
        <SkillScroll />
      </div>
    </section>
  );
}
