// lab policy: write 権限者 1 人。prod/ は sre の承認と、別の write 権限者 1 人の両方。
import { allOf, lastMatch, permission, team } from "policy-guard";
import type { ChangeFacts, Policy } from "policy-guard";

const rules = lastMatch([
  ["*", permission("write")],
  ["/prod/", allOf(team("sre"), permission("write"))],
]);

export default function policy(c: ChangeFacts): Policy {
  return { approval: rules.requirement(c.files) };
}
