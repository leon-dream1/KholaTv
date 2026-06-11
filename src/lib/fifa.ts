export interface Broadcaster {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface FifaMatch {
  id: string;
  group: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  broadcasters: Broadcaster[];
  status: 'upcoming' | 'live' | 'finished';
}

export const fifaBroadcasters: Broadcaster[] = [
  {
    id: 'tsports-bd',
    name: 'T-Sports HD',
    logo: 'https://i.imgur.com/2JzlorD.png',
    url: 'https://tvsen7.aynaott.com/tsports-hd/index.m3u8',
  },
  {
    id: 'somoy-tv',
    name: 'Somoy TV',
    logo: 'https://i.imgur.com/i54AQic.png',
    url: 'https://bozztv.com/rongo/rongo-somoy/index.m3u8',
  },
  {
    id: 'btv-hd',
    name: 'BTV HD',
    logo: 'https://i.imgur.com/5OE2FDt.png',
    url: 'https://bozztv.com/rongo/rongo-BTVChattagram/index.m3u8',
  },
  {
    id: 'toffee-sports',
    name: 'Toffee Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Toffee_app_logo.png',
    url: 'https://live.toffee.com/placeholder.m3u8', // You can update this live
  },
  {
    id: 'gtv-bd',
    name: 'GTV (Gazi TV)',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/ed/GTV_Logo.png',
    url: 'https://bozztv.com/rongo/rongo-gtv/index.m3u8', // Update live
  },
  {
    id: 'sony-sports-1',
    name: 'Sony Sports Ten 1',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sony_Sports_Ten_1_Logo.png',
    url: 'https://live.sony.com/placeholder.m3u8', // Update live
  },
  {
    id: 'bein-sports',
    name: 'beIN Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/BeIN_Sports_France_logo.svg',
    url: 'https://live.bein.com/placeholder.m3u8', // Update live
  }
];

export const fifaMatches: FifaMatch[] = [
  {
    id: 'match-1',
    group: 'Group A',
    homeTeam: 'Mexico',
    awayTeam: 'South Africa',
    homeFlag: '🇲🇽',
    awayFlag: '🇿🇦',
    startTime: '2026-06-12T01:00:00+06:00', // June 12, 1:00 AM BD Time (June 11, 3 PM ET)
    endTime: '2026-06-12T03:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[4], fifaBroadcasters[5], fifaBroadcasters[6]], // T-Sports, Toffee, GTV, Sony, beIN
    status: 'upcoming',
  },
  {
    id: 'match-2',
    group: 'Group A',
    homeTeam: 'South Korea',
    awayTeam: 'Czechia',
    homeFlag: '🇰🇷',
    awayFlag: '🇨🇿',
    startTime: '2026-06-12T08:00:00+06:00', // June 12, 8:00 AM BD Time (June 11, 10 PM ET)
    endTime: '2026-06-12T10:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[4], fifaBroadcasters[6]], // T-Sports, Toffee, GTV, beIN
    status: 'upcoming',
  },
  {
    id: 'match-3',
    group: 'Group B',
    homeTeam: 'Canada',
    awayTeam: 'Bosnia and Herzegovina',
    homeFlag: '🇨🇦',
    awayFlag: '🇧🇦',
    startTime: '2026-06-13T01:00:00+06:00', // June 13, 1:00 AM BD Time (June 12, 3 PM ET)
    endTime: '2026-06-13T03:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[5]], // T-Sports, Toffee, Sony
    status: 'upcoming',
  },
  {
    id: 'match-4',
    group: 'Group D',
    homeTeam: 'USA',
    awayTeam: 'Paraguay',
    homeFlag: '🇺🇸',
    awayFlag: '🇵🇾',
    startTime: '2026-06-13T07:00:00+06:00', // June 13, 7:00 AM BD Time (June 12, 9 PM ET)
    endTime: '2026-06-13T09:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[4], fifaBroadcasters[6]], // T-Sports, Toffee, GTV, beIN
    status: 'upcoming',
  },
  {
    id: 'match-5',
    group: 'Group C',
    homeTeam: 'France',
    awayTeam: 'Australia',
    homeFlag: '🇫🇷',
    awayFlag: '🇦🇺',
    startTime: '2026-06-14T01:00:00+06:00', // June 14, 1:00 AM BD Time (June 13, 3 PM ET)
    endTime: '2026-06-14T03:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[5], fifaBroadcasters[6]],
    status: 'upcoming',
  },
  {
    id: 'match-6',
    group: 'Group E',
    homeTeam: 'England',
    awayTeam: 'Senegal',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇸🇳',
    startTime: '2026-06-14T08:00:00+06:00', // June 14, 8:00 AM BD Time (June 13, 10 PM ET)
    endTime: '2026-06-14T10:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[4]],
    status: 'upcoming',
  },
  {
    id: 'match-7',
    group: 'Group F',
    homeTeam: 'Spain',
    awayTeam: 'Croatia',
    homeFlag: '🇪🇸',
    awayFlag: '🇭🇷',
    startTime: '2026-06-15T01:00:00+06:00', // June 15, 1:00 AM BD Time (June 14, 3 PM ET)
    endTime: '2026-06-15T03:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[5], fifaBroadcasters[6]],
    status: 'upcoming',
  },
  {
    id: 'match-8',
    group: 'Group G',
    homeTeam: 'Brazil',
    awayTeam: 'Cameroon',
    homeFlag: '🇧🇷',
    awayFlag: '🇨🇲',
    startTime: '2026-06-15T07:00:00+06:00', // June 15, 7:00 AM BD Time (June 14, 9 PM ET)
    endTime: '2026-06-15T09:00:00+06:00',
    broadcasters: [fifaBroadcasters[0], fifaBroadcasters[3], fifaBroadcasters[4], fifaBroadcasters[5], fifaBroadcasters[6]],
    status: 'upcoming',
  }
];

export function updateMatchStatuses(matches: FifaMatch[]): FifaMatch[] {
  const now = new Date();
  return matches.map(match => {
    const start = new Date(match.startTime);
    const end = new Date(match.endTime);
    let status: 'upcoming' | 'live' | 'finished' = 'upcoming';

    if (now >= start && now <= end) {
      status = 'live';
    } else if (now > end) {
      status = 'finished';
    }

    return { ...match, status };
  });
}
