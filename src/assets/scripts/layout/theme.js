import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import '../custom/home-testimonials';
import '../custom/featured-collection';
import '../custom/case-studies';
import '../custom/tabs';
import '../custom/product-related';
import '../custom/different-mentions';
import '../custom/testimonials';
import '../custom/faq';
import '../custom/information-center';
import '../custom/header';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';
import { cookiesEnabled } from '@shopify/theme-cart';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies'
  );
}
