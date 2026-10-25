/**
 * Utility functions for animation calculations, text processing, and memory metadata
 */

export interface CharOpacityRange {
  start: number;
  end: number;
}

/**
 * Calculates scroll progress boundaries for a staggered character reveal.
 * As specified:
 * charProgress = index / totalChars
 * mapped across: [charProgress - 0.1, charProgress + 0.05]
 */
export function calculateCharProgressRange(index: number, totalChars: number): CharOpacityRange {
  if (totalChars <= 0) return { start: 0, end: 0.05 };
  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  return {
    start: Number(start.toFixed(4)),
    end: Number(Math.max(start + 0.01, end).toFixed(4)),
  };
}

/**
 * Splits string by spaces while preserving structure for word-level animation
 */
export function splitIntoWords(text: string): string[] {
  if (!text) return [];
  return text.trim().split(/\s+/);
}

/**
 * Memory query filter test for contextual recall simulation
 */
export interface MemoryItem {
  id: string;
  category: 'preference' | 'fact' | 'goal' | 'idea';
  content: string;
  timestamp: string;
}

export function filterMemoriesByQuery(memories: MemoryItem[], query: string): MemoryItem[] {
  if (!query || query.trim() === '') return memories;
  const terms = query.toLowerCase().trim().split(/\s+/);
  return memories.filter(item => {
    const text = `${item.category} ${item.content}`.toLowerCase();
    return terms.some(term => text.includes(term));
  });
}
