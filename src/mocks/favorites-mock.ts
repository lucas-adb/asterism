import type { Favorite } from '@/types/favorite';

export const favoritesMock: Favorite[] = [
  {
    id: '1',
    title: 'Aeon',
    url: 'https://aeon.co/',
    description:
      'A unique digital magazine, publishing some of the most profound and provocative thinking on the web. We ask the big questions and find the freshest, most original answers, provided by leading thinkers on science, philosophy, society and the arts.',
    type: 'sites',
    tags: ['science', 'philosophy', 'society', 'arts'],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    title: 'An Interactive Guide to Flexbox',
    url: 'https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/',
    description: 'Understand Flexbox for once',
    type: 'tutorials',
    tags: ['dev', 'front'],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '3',
    title: "Qu's sketchbook",
    url: 'https://www.instagram.com/qu.sketch/',
    description: 'Art inspiration',
    type: 'inspiration',
    tags: ['arts'],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '4',
    title: 'The Pudding',
    url: 'https://pudding.cool/',
    description:
      'The Pudding is a digital publication that explains ideas debated in culture with visual essays',
    type: 'sites',
    tags: ['graphs', 'culture'],
    createdAt: new Date('2025-01-10'),
  },
];
