import { HSL } from "./HSL";

const green = new HSL(120, 100, 25).darker();
const yellow = new HSL(60, 100, 50).darker();
const red = new HSL(0, 100, 50);
const scale = HSL.scale(red, yellow, green);
type SkillsProps = {
  skills: { name: string; percentage: number }[];
};
export const Skills = ({ skills }: SkillsProps) => (
  <ul
    className="grid gap-x-2 gap-y-[4px] my-3 items-center"
    style={{ gridTemplateColumns: "min-content minmax(0, 1fr)" }}
  >
    {[...skills]
      .sort((a, b) => {
        if (a.percentage !== b.percentage) {
          return a.percentage - b.percentage;
        }

        // In case of ties, use the one that comes first in th list
        return (
          skills.findIndex((x) => x.name === b.name) -
          skills.findIndex((x) => x.name === a.name)
        );
      })
      .reverse()
      .map((a) => {
        const A = 0.7;
        const color = scale((a.percentage / 100 - A) * (1 / (1 - A)) * 100);
        return (
          <li key={a.name} className="contents">
            <div className="text-sm">{a.name}</div>
            <div
              style={{
                height: "90%",
                width: `${a.percentage}%`,
                background: `linear-gradient(45deg, ${color
                  .lighter()
                  .toText()}, ${color.toText()})`,
              }}
            />
          </li>
        );
      })}
  </ul>
);
