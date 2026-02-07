import * as migration_20260207_122328 from './20260207_122328';
import * as migration_20260207_125623_seed_footer from './20260207_125623_seed_footer';
import * as migration_20260207_130000_seed_hero_locales from './20260207_130000_seed_hero_locales';
import * as migration_20260207_130100_seed_about_us from './20260207_130100_seed_about_us';
import * as migration_20260207_130200_seed_faq from './20260207_130200_seed_faq';
import * as migration_20260207_130300_seed_testimonials from './20260207_130300_seed_testimonials';
import * as migration_20260207_130400_seed_footer from './20260207_130400_seed_footer';

export const migrations = [
  {
    up: migration_20260207_122328.up,
    down: migration_20260207_122328.down,
    name: '20260207_122328',
  },
  {
    up: migration_20260207_125623_seed_footer.up,
    down: migration_20260207_125623_seed_footer.down,
    name: '20260207_125623_seed_footer',
  },
  {
    up: migration_20260207_130000_seed_hero_locales.up,
    down: migration_20260207_130000_seed_hero_locales.down,
    name: '20260207_130000_seed_hero_locales',
  },
  {
    up: migration_20260207_130100_seed_about_us.up,
    down: migration_20260207_130100_seed_about_us.down,
    name: '20260207_130100_seed_about_us',
  },
  {
    up: migration_20260207_130200_seed_faq.up,
    down: migration_20260207_130200_seed_faq.down,
    name: '20260207_130200_seed_faq',
  },
  {
    up: migration_20260207_130300_seed_testimonials.up,
    down: migration_20260207_130300_seed_testimonials.down,
    name: '20260207_130300_seed_testimonials'
  },
  {
    up: migration_20260207_130400_seed_footer.up,
    down: migration_20260207_130400_seed_footer.down,
    name: '20260207_130400_seed_footer'
  },
];
