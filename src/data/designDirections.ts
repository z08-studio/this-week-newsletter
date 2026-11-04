export const designDirections = [
  {
    id: 'soft', number: '01', name: 'Soft cards',
    description: 'Light cushions, generous space, and a quiet touch of depth.',
  },
  {
    id: 'glass', number: '02', name: 'Wine glass',
    description: 'Deep berry, translucent surfaces, and luminous mint edges.',
  },
  {
    id: 'agenda', number: '03', name: 'Weekly agenda',
    description: 'A day-by-day reading list with soft, full-width ribbons.',
  },
  {
    id: 'bubbles', number: '04', name: 'Bubble garden',
    description: 'Floating green pebbles and a more playful rhythm.',
  },
  {
    id: 'canvas', number: '05', name: 'Mint canvas',
    description: 'One rounded calendar surface, with calm editorial typography.',
  },
] as const;

export type DesignDirection = typeof designDirections[number];
