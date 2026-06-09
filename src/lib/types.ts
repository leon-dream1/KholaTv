export interface Channel {
  id: string;
  name: string;
  url: string;
  logo: string;
  category: string;
  country: string;
  language: string;
  tvgId: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface Country {
  code: string;
  name: string;
  count: number;
  flag: string;
}
