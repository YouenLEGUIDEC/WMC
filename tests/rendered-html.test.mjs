import assert from "node:assert/strict";
import test from "node:test";
import { members, rides, bikes } from "../lib/demo/data.ts";
const { default: worker } = await import("../dist/server/index.js");
const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };
async function render(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );
}
const paths = [
  "/",
  "/dashboard",
  "/members",
  "/rides",
  "/garage",
  "/onboarding",
  "/profile",
  "/settings/privacy",
  ...members.map((m) => `/members/${m.id}`),
  ...rides.map((r) => `/rides/${r.id}`),
  ...bikes.map((b) => `/garage/${b.id}`),
];
for (const path of paths)
  test(`renders ${path} and valid internal navigation`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<html lang="fr"/);
    assert.match(html, /Watt|WATT/);
    assert.doesNotMatch(html, /Starter Project/);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)) {
      if (
        href.startsWith("/assets") ||
        href.startsWith("/_") ||
        href.startsWith("/favicon") ||
        href.startsWith("/fonts")
      )
        continue;
      assert.ok(paths.includes(href), `Unknown navigation ${href} in ${path}`);
    }
  });
for (const path of [
  "/members/inconnu",
  "/rides/inconnue",
  "/garage/inconnu",
  "/inexistant",
])
  test(`404 for ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 404);
  });
