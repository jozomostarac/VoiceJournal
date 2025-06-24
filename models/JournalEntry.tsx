export default interface JournalEntry {
    id: string;
    name: string;
    date: Date;
    duration: number;
    localUrl: string | null;
}

export const mockEntries: JournalEntry[] = [
    {
      id: '1',
      name: 'Morning Reflections',
      date: new Date('2024-01-15T10:30:00'),
      duration: 120,
      localUrl: 'https://onlinetestcase.com/wp-content/uploads/2023/06/100-KB-MP3.mp3',
    },
    {
      id: '2',
      name: 'Career Goals Discussion',
      date: new Date('2024-01-14T15:45:00'),
      duration: 85,
      localUrl: 'https://onlinetestcase.com/wp-content/uploads/2023/06/100-KB-MP3.mp3',
    },
    {
      id: '3',
      name: 'Weekend Plans',
      date: new Date('2024-01-13T09:15:00'),
      duration: 95,
      localUrl: 'https://onlinetestcase.com/wp-content/uploads/2023/06/100-KB-MP3.mp3',
    },
    {
      id: '4',
      name: 'Gratitude Practice',
      date: new Date('2024-01-12T18:20:00'),
      duration: 110,
      localUrl: null,
    },
  ];