export interface NavItem {
  id: string;
  label: string;
  code: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'origin', label: 'ORIGIN', code: '01' },
  { id: 'identity', label: 'IDENTITY', code: '02' },
  { id: 'builds', label: 'BUILDS', code: '03' },
  { id: 'toolkit', label: 'TOOLKIT', code: '04' },
  { id: 'field-log', label: 'FIELD LOG', code: '05' },
  { id: 'the-frame', label: 'THE FRAME', code: '06' },
  { id: 'weblog', label: 'WEBLOG', code: '07' },
  { id: 'profile', label: 'PROFILE', code: '08' },
  { id: 'connect', label: 'CONNECT', code: '09' },
];

