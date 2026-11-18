import assert from "node:assert/strict";
import { test } from "node:test";
import { api, ApiError } from "../lib/live/api.ts";

test("a dropped answer is retried with the identical payload", async context => {
  const payload = { room: "TEST1234", data: { kind: "chat_join", run: 1 } };
  const calls = [];
  context.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, options });
    if (calls.length === 1) throw new TypeError("Connection reset");
    return Response.json({ saved: true });
  });
  assert.deepEqual(await api("/api/live/answer", payload), { saved: true });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].options.body, calls[1].options.body);
  assert.equal(calls[1].options.credentials, "same-origin");
});

test("a connection lost while reading the response body can recover", async context => {
  let calls = 0;
  context.mock.method(globalThis, "fetch", async () => {
    if (++calls === 1) return { ok: true, json: async () => { throw new TypeError("Connection closed while reading"); } };
    return Response.json({ room: { revision: 4 } });
  });
  assert.deepEqual(await api("/api/live/state?room=TEST1234"), { room: { revision: 4 } });
  assert.equal(calls, 2);
});

test("join and room creation failures are returned without replaying the creation", async context => {
  let calls = 0;
  context.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw new TypeError("Connection reset");
  });
  await assert.rejects(api("/api/live/join", { room: "TEST1234" }), error => error instanceof ApiError && error.status === 503);
  assert.equal(calls, 1);
  await assert.rejects(api("/api/live/host", { action: "create" }), error => error instanceof ApiError && error.status === 503);
  assert.equal(calls, 2);
});

test("a closed step and an aborted poll stop retrying", async context => {
  let calls = 0;
  context.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ error: "The vote has closed." }, { status: 409 });
  });
  await assert.rejects(api("/api/live/answer", { data: { kind: "vote" } }), error => error instanceof ApiError && error.status === 409);
  assert.equal(calls, 1);
  const controller = new AbortController();
  controller.abort();
  context.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw controller.signal.reason;
  });
  await assert.rejects(api("/api/live/state", undefined, controller.signal), { name: "AbortError" });
  assert.equal(calls, 2);
});
