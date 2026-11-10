import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAUNCH_ENDS, LAUNCH_OPENS, LAUNCH_PATH, LAUNCH_ROOM_CODE, LAUNCH_URL, launchStatus } from '../lib/live/launch.ts';

test('printed event address never contains a temporary room or invitation', () => {
  const url = new URL(LAUNCH_URL);
  assert.equal(url.origin,'https://statenotsituation.com');
  assert.equal(url.pathname,LAUNCH_PATH);
  assert.equal(url.search,'');
  assert.equal(url.hash,'');
  assert.match(LAUNCH_ROOM_CODE,/^[A-Z0-9]{8,16}$/);
});

test('launch opens at 18:00 Luxembourg time and has a clear ended state', () => {
  assert.equal(LAUNCH_OPENS,Date.parse('2026-12-03T18:00:00+01:00'));
  assert.equal(launchStatus(LAUNCH_OPENS-1),'before');
  assert.equal(launchStatus(LAUNCH_OPENS),'open');
  assert.equal(launchStatus(LAUNCH_ENDS-1),'open');
  assert.equal(launchStatus(LAUNCH_ENDS),'ended');
});
