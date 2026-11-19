import assert from "node:assert/strict";
import { test } from "node:test";
import { hostAccessKey, validHostAccessKey } from "../lib/live/host-access.ts";

test("the private host link works only with the matching server secret", () => {
  const secret = "test-server-secret-with-enough-random-material";
  const key = hostAccessKey(secret);
  assert.match(key, /^host_[A-Za-z0-9_-]{43}$/);
  assert(validHostAccessKey(key, secret));
  assert(!validHostAccessKey(key, "a-rotated-server-secret"));
  assert(!validHostAccessKey(key.slice(0, -1), secret));
  assert(!validHostAccessKey(key.replace("host_", "guest_"), secret));
});

test("empty, malformed, and guessed host credentials are rejected", () => {
  const secret = "another-test-server-secret";
  for (const value of [undefined, null, {}, 42, "", "host_", "a".repeat(48), "é".repeat(48)]) {
    assert(!validHostAccessKey(value, secret));
  }
  assert(!validHostAccessKey("any-value", ""));
  assert.throws(() => hostAccessKey(""));
});
