/**
 * Canonical industrial-sector keys.
 *
 * Shared by the quote form (client) and the /api/quote handler (server) so the
 * dropdown and the server-side validation can never drift apart. The option's
 * `value` is the stable `key`; the visible label comes from `i18nKey` in
 * src/i18n/translations.js.
 */
export const SECTORS = [
  { key: 'food',       i18nKey: 'formInd1' },
  { key: 'water',      i18nKey: 'formInd2' },
  { key: 'fertilizer', i18nKey: 'formInd3' },
  { key: 'glass',      i18nKey: 'formInd4' },
  { key: 'oil',        i18nKey: 'formInd5' },
  { key: 'cookware',   i18nKey: 'formInd6' },
  { key: 'other',      i18nKey: 'formInd7' },
];

export const SECTOR_KEYS = SECTORS.map((s) => s.key);

const I18N_BY_KEY = new Map(SECTORS.map((s) => [s.key, s.i18nKey]));

/** Translation key for a sector, or undefined if the sector is unknown. */
export function sectorI18nKey(key) {
  return I18N_BY_KEY.get(key);
}
