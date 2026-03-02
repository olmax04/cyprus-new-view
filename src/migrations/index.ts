import * as migration_20260207_122328 from './20260207_122328';
import * as migration_20260207_125623_seed_footer from './20260207_125623_seed_footer';
import * as migration_20260207_130000_seed_hero_locales from './20260207_130000_seed_hero_locales';
import * as migration_20260207_130100_seed_about_us from './20260207_130100_seed_about_us';
import * as migration_20260207_130200_seed_faq from './20260207_130200_seed_faq';
import * as migration_20260207_130300_seed_testimonials from './20260207_130300_seed_testimonials';
import * as migration_20260207_130400_seed_footer from './20260207_130400_seed_footer';
import * as migration_20260225_132421 from './20260225_132421';
import * as migration_20260225_210129_add_estates_collection from './20260225_210129_add_estates_collection';
import * as migration_20260302_000221_add_slug_and_richtext_description from './20260302_000221_add_slug_and_richtext_description';
import * as migration_20260302_003045_add_user_roles_and_estate_assignment from './20260302_003045_add_user_roles_and_estate_assignment';
import * as migration_20260302_172817_replace_price_text_with_number_and_currency from './20260302_172817_replace_price_text_with_number_and_currency';
import * as migration_20260302_174545_user_employee_contact_data from './20260302_174545_user_employee_contact_data';

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
    name: '20260207_130300_seed_testimonials',
  },
  {
    up: migration_20260207_130400_seed_footer.up,
    down: migration_20260207_130400_seed_footer.down,
    name: '20260207_130400_seed_footer',
  },
  {
    up: migration_20260225_132421.up,
    down: migration_20260225_132421.down,
    name: '20260225_132421',
  },
  {
    up: migration_20260225_210129_add_estates_collection.up,
    down: migration_20260225_210129_add_estates_collection.down,
    name: '20260225_210129_add_estates_collection',
  },
  {
    up: migration_20260302_000221_add_slug_and_richtext_description.up,
    down: migration_20260302_000221_add_slug_and_richtext_description.down,
    name: '20260302_000221_add_slug_and_richtext_description',
  },
  {
    up: migration_20260302_003045_add_user_roles_and_estate_assignment.up,
    down: migration_20260302_003045_add_user_roles_and_estate_assignment.down,
    name: '20260302_003045_add_user_roles_and_estate_assignment',
  },
  {
    up: migration_20260302_172817_replace_price_text_with_number_and_currency.up,
    down: migration_20260302_172817_replace_price_text_with_number_and_currency.down,
    name: '20260302_172817_replace_price_text_with_number_and_currency',
  },
  {
    up: migration_20260302_174545_user_employee_contact_data.up,
    down: migration_20260302_174545_user_employee_contact_data.down,
    name: '20260302_174545_user_employee_contact_data'
  },
];
