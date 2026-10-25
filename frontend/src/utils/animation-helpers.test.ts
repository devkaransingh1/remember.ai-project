import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCharProgressRange, splitIntoWords, filterMemoriesByQuery } from './animation-helpers.ts';
import type { MemoryItem } from './animation-helpers.ts';

test('calculateCharProgressRange boundaries work correctly', () => {
  const first = calculateCharProgressRange(0, 100);
  assert.equal(first.start, 0);
  assert.equal(first.end, 0.05);

  const middle = calculateCharProgressRange(50, 100);
  assert.equal(middle.start, 0.4);
  assert.equal(middle.end, 0.55);

  const last = calculateCharProgressRange(100, 100);
  assert.equal(last.start, 0.9);
  assert.equal(last.end, 1.0);
});

test('splitIntoWords correctly splits multi-space sentences', () => {
  const result = splitIntoWords('Your thoughts,   never forgotten.');
  assert.deepEqual(result, ['Your', 'thoughts,', 'never', 'forgotten.']);
});

test('filterMemoriesByQuery matches relevant natural language memories', () => {
  const testMemories: MemoryItem[] = [
    { id: '1', category: 'preference', content: 'Prefers oat milk in cappuccino', timestamp: '2026-04-01' },
    { id: '2', category: 'goal', content: 'Finish marathon preparation by October', timestamp: '2026-04-02' },
    { id: '3', category: 'idea', content: 'Architecting zero-latency vector cache', timestamp: '2026-04-03' },
  ];

  const matched = filterMemoriesByQuery(testMemories, 'cappuccino');
  assert.equal(matched.length, 1);
  assert.equal(matched[0].id, '1');

  const multiple = filterMemoriesByQuery(testMemories, 'marathon idea');
  assert.equal(multiple.length, 2);
});
