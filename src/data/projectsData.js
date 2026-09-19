export const highlightedProjects = [
  {
    title: "Automated Sky Tracker",
    status: "ONGOING / HARDWARE",
    index: "01 / 04",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1500&q=85"
  },
  {
    title: "Radio Signal Lab",
    status: "UPCOMING / RESEARCH",
    index: "02 / 04",
    image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1500&q=85"
  },
  {
    title: "Deep Sky Pipeline",
    status: "ONGOING / SOFTWARE",
    index: "03 / 04",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=85"
  },
  {
    title: "Telescope Booking Tool",
    status: "PROTOTYPE / SOFTWARE",
    index: "04 / 04",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1500&q=85"
  }
];

export const boardProjects = [
  {
    id: 'asrt',
    code: 'HW · 01',
    status: 'completed',
    icon: 'satellite',
    title: 'ASRT assembly',
    body: [
      "The ASRT (automated sky/rocket tracker) is a dual-axis rotator built to keep a payload or telescope pointed at a moving target, covering the frame, motor driver stage, and control loop.",
      "Now on its second revision after the first prototype showed backlash in the elevation axis, fixed with a redesigned gear coupling."
    ],
    stage: 3,
    team: ['AK', 'RS', 'MP', 'TN'],
    images: ['https://picsum.photos/seed/asrt1/300/220', 'https://picsum.photos/seed/asrt2/300/220', 'https://picsum.photos/seed/asrt3/300/220']
  },
  {
    id: 'horn',
    code: 'HW · 02',
    status: 'completed',
    icon: 'dish',
    title: 'Horn antenna',
    body: [
      "A scratch-built horn antenna tuned for receiving NOAA weather satellite signals in the 137 MHz band, made from sheet aluminium with a quarter-wave probe feed.",
      "First successful decode was a clean image from a NOAA-19 pass."
    ],
    stage: 3,
    team: ['SD', 'PK'],
    images: ['https://picsum.photos/seed/horn1/300/220', 'https://picsum.photos/seed/horn2/300/220']
  },
  {
    id: 'imgproc',
    code: 'SW · 01',
    status: 'ongoing',
    icon: 'signal',
    title: 'Image processing pipeline',
    body: [
      "A pipeline that takes raw frames from star party sessions and produces stacked, noise-reduced images automatically, so members don't need a full editing suite to see clean results.",
      "Currently working on automatic star alignment before stacking, the main bottleneck right now."
    ],
    stage: 1,
    team: ['NV', 'AK', 'JR'],
    images: []
  },
  {
    id: 'sched',
    code: 'SW · 02',
    status: 'prototype',
    icon: 'clipboard',
    title: 'Mission scheduling tool',
    body: [
      "A small internal tool to book club telescopes for personal use and track who has completed the handling workshop. Still in early design, no working build yet."
    ],
    stage: 0,
    team: ['MP', 'TN'],
    images: []
  }
];

export const STAGES = ['Design', 'Build', 'Test', 'Results'];
