import assert from "node:assert/strict";
import test from "node:test";
import { members, rides, bikes, defaultProfile } from "../lib/demo/data.ts";
import { compatibility } from "../lib/demo/matching.ts";
test("16 unique fictional members cover all 8 towns", () => {
  assert.equal(members.length, 16);
  assert.equal(new Set(members.map((m) => m.id)).size, 16);
  assert.equal(new Set(members.map((m) => m.town)).size, 8);
});
test("scores remain bounded, deterministic and weighted consistently", () => {
  for (const member of members) {
    const first = compatibility(defaultProfile, member);
    assert.deepEqual(first, compatibility(defaultProfile, member));
    assert.ok(first.score >= 0 && first.score <= 100);
    assert.equal(
      first.factors.reduce((s, f) => s + f.weight, 0),
      100,
    );
    assert.ok(
      first.factors.every(
        (f) => f.score >= 0 && f.score <= 100 && f.reason.length > 0,
      ),
    );
  }
});
test("an identical declared profile scores 100", () => {
  const m = members[0];
  const profile = {
    ...defaultProfile,
    town: m.town,
    pace: m.pace,
    distance: m.distance,
    day: m.day,
    discipline: m.discipline,
    social: m.social,
  };
  assert.equal(compatibility(profile, m).score, 100);
});
test("a large pace difference lowers the score", () => {
  const m = members[0];
  assert.ok(
    compatibility({ ...defaultProfile, pace: m.pace }, m).score >
      compatibility({ ...defaultProfile, pace: m.pace + 10 }, m).score,
  );
});
test("shared availability improves the match", () => {
  const m = members[0];
  assert.ok(
    compatibility({ ...defaultProfile, day: m.day }, m).score >
      compatibility({ ...defaultProfile, day: "Samedi matin" }, m).score,
  );
});
test("different disciplines remain possible but score lower", () => {
  const m = members[0];
  assert.ok(
    compatibility({ ...defaultProfile, discipline: "Route" }, m).score >
      compatibility({ ...defaultProfile, discipline: "VTT" }, m).score,
  );
});
test("ride participants and hosts resolve; capacities are valid", () => {
  for (const r of rides) {
    assert.ok(members.some((m) => m.id === r.host));
    assert.ok(r.participants.every((id) => members.some((m) => m.id === id)));
    assert.equal(new Set(r.participants).size, r.participants.length);
    assert.ok(r.participants.length < r.max);
    assert.ok(r.route.length >= 3);
  }
});
test("bike and ride identifiers are unique", () => {
  for (const list of [rides, bikes])
    assert.equal(new Set(list.map((x) => x.id)).size, list.length);
});
