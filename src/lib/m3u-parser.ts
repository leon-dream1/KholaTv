export interface M3UChannel {
  name: string;
  url: string;
  logo: string;
  tvgId: string;
  tvgCountry: string;
  tvgLanguage: string;
  groupTitle: string;
}

export function parseM3U(content: string): M3UChannel[] {
  const channels: M3UChannel[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      const name = line.split(',').slice(1).join(',').trim();
      const logo = extractAttr(line, 'tvg-logo');
      const tvgId = extractAttr(line, 'tvg-id');
      const tvgCountry = extractAttr(line, 'tvg-country');
      const tvgLanguage = extractAttr(line, 'tvg-language');
      const groupTitle = extractAttr(line, 'group-title');

      const nextLine = lines[i + 1]?.trim();
      if (nextLine && !nextLine.startsWith('#')) {
        channels.push({
          name,
          url: nextLine,
          logo,
          tvgId,
          tvgCountry: tvgCountry.toUpperCase(),
          tvgLanguage,
          groupTitle: groupTitle || 'Uncategorized',
        });
      }
    }
  }

  return channels;
}

function extractAttr(line: string, attr: string): string {
  const regex = new RegExp(`${attr}="([^"]*)"`);
  const match = line.match(regex);
  return match ? match[1] : '';
}
