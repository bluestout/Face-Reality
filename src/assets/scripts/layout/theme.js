import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/rias/ls.rias";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
import "lazysizes/plugins/respimg/ls.respimg";

import "../../styles/theme.scss";
import "../../styles/theme.scss.liquid";

import "../custom/home-testimonials-slick";
import "../custom/featured-collection-slick";
import "../custom/tabs";
import "../custom/product-related-slick";
import "../custom/different-mentions-slick";
import "../custom/testimonials";
import "../custom/faq";
import "../custom/information-center";
import "../custom/header";
import "../custom/image-compare";
import "../custom/home-stories";
import "../custom/register";
import "../custom/account";
import "../custom/qty-changer";
import "../custom/accordion";
import "../custom/collection-page";
import "../custom/product-item";
import "../custom/ajax-add-to-cart";
import "../custom/case-study-slick";
import "../custom/responsive-sidemenu";
import "../custom/footer";
import "../custom/case-studies";
import "../custom/search";

import { focusHash, bindInPageLinks } from "@shopify/theme-a11y";

// Common a11y fixes
focusHash();
bindInPageLinks();
