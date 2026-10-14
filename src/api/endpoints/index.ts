import { TApiVersions, TMediaUrlUserType } from '@/types/common/common.type';
import { ApiVersionEnum } from '@/types/enums/common.emums';

export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const frontUrl = process.env.NEXT_APP_FRONTEND_BASE_URL;
export const mainWebsiteUrl = process.env.NEXT_APP_MAIN_WEBSITE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/`;
export const baseUrlMedia = process.env.NEXT_APP_MEDIA_BASE_URL;

const version = ApiVersionEnum.V1;

// export const mediaUrl = (url: string, path: string = 'user') => {
//   return `${baseUrlMedia}uploads/${path}/${url}`;
// };
export const mediaUrl = (url: string, path?: TMediaUrlUserType) => {
  return `${baseUrlMedia}/${url}`;
};

export const endpoints = {
  auth: {
    admin: {
      login: '/api/admin/auth/login',
      logout: '/api/admin/auth/logout',
      forgotPassword: '/api/admin/auth/forgot-password',
      resetPassword: '/api/admin/auth/reset-password',
      profileDetails: (version: TApiVersions) => {
        return `/api/${version}/admin/profile-details`;
      },
      profileUpdate: (version: TApiVersions) => {
        return `/api/${version}/admin/update`;
      },

      settingsDetails: (version: TApiVersions) => {
        return `/api/${version}/admin/settings/get`;
      },
      settingsUpdate: (version: TApiVersions) => {
        return `/api/${version}/admin/settings/update`;
      },
      notificationSettingsUpdate: (version: TApiVersions) => {
        return `/api/${version}/admin/update-settings`;
      },
      menuFooterDetails: (version: TApiVersions) => {
        return `/api/${version}/admin/menu-footer/get`;
      },
      menuFooterUpdate: (version: TApiVersions) => {
        return `/api/${version}/admin/menu-footer/update`;
      },
    },
  },
  media: {
    uploadSingleFile: (version: TApiVersions) => {
      return `/api/${version}/admin/media/upload-single-file`;
    },
    uploadMultipleFile: (version: TApiVersions) => {
      return `/api/${version}/admin/media/upload-multiple-file`;
    },
    deleteFile: (version: TApiVersions) => {
      return `/api/${version}/admin/media/delete`;
    },
  },
  city: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/city/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/city/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/city/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/city/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/city/delete`;
    },
    restore: (version: TApiVersions) => {
      return `/api/${version}/admin/city/undo-delete`;
    },
    hardDelete: (version: TApiVersions) => {
      return `/api/${version}/admin/city/hard-delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/city/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/city/featured`;
    },
  },
  airport: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/delete`;
    },
    restore: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/undo-delete`;
    },
    hardDelete: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/hard-delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/airport/featured`;
    },
  },
  airportData: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/delete`;
    },
    restore: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/undo-delete`;
    },
    hardDelete: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/hard-delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/status-change`;
    },
    listing: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-data/listing`;
    },
  },
  airportType: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/status-change`;
    },
    listing: (version: TApiVersions) => {
      return `/api/${version}/admin/airport-type/listing`;
    },
  },
  testimonial: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/testimonial/status-change`;
    },
  },
  master: {
    country: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/status-change`;
      },
      showInCMS: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/country/show-in-cms`;
      },
    },
    state: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/state/status-change`;
      },
    },
    city: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/country-state-city/city/status-change`;
      },
    },
  },
  salesPerson: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/user/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/user/details`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/user/save`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/user/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/user/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/user/status-change`;
    },
  },
  contactUs: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/contact-us/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/contact-us/get`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/contact-us/delete`;
    },
    sendReply: (version: TApiVersions) => {
      return `/api/${version}/admin/contact-us/send-reply`;
    },
  },
  legEnquiry: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/leg-enquire-form/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/leg-enquire-form/get`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/leg-enquire-form/delete`;
    },
    sendReply: (version: TApiVersions) => {
      return `/api/${version}/admin/leg-enquire-form/send-reply`;
    },
  },
  supportTicket: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/support/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/support/get`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/support/delete`;
    },
    sendReply: (version: TApiVersions) => {
      return `/api/${version}/admin/support/send-reply`;
    },
  },
  charterEnquiry: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/charter-enquiry/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/charter-enquiry/get`;
    },
    assignSalesPerson: (version: TApiVersions) => {
      return `/api/${version}/admin/charter-enquiry/assign`;
    },
  },
  masterData: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/master-data/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/master-data/get`;
    },
  },
  cms: {
    main: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/cms/listing`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/cms/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/cms/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/cms/update`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/cms/status-change`;
      },
    },
    content: {
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/get`;
      },
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/getall`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/status-change`;
      },
      reorder: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb/reorder`;
      },
    },
    faq: {
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/get`;
      },
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/getall`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/status-change`;
      },
      reorder: (version: TApiVersions) => {
        return `/api/${version}/admin/blurb-faq/reorder`;
      },
    },
    sectionContent: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/listing`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/section-content/status-change`;
      },
    },
    mattFacts: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/listing`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/matt-facts-cms/status-change`;
      },
    },
    membership: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/subscription-plan/list`;
      },
      save: (version: TApiVersions) => {
        return `/api/${version}/admin/subscription-plan/save`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/subscription-plan/update`;
      },
      details: (version: TApiVersions, id: string) => {
        return `/api/${version}/admin/subscription-plan/details/${id}`;
      },
      reorder: (version: TApiVersions) => {
        return `/api/${version}/admin/subscription-plan/reorder`;
      },
    },
    hourlyBreakdown: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/listing`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/hourly-breakdown-cms/status-change`;
      },
    },
    categoryVsPremium: {
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/listing`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/category-vs-premium-cms/status-change`;
      },
    },
  },
  heroSectionCMS: {
    heroDetails: (version: TApiVersions) => {
      return `/api/${version}/admin/hero-section-cms/details`;
    },
    heroUpdate: (version: TApiVersions) => {
      return `/api/${version}/admin/hero-section-cms/edit`;
    },
  },
  seo: {
    detailsBySlug: (version: TApiVersions) => {
      return `/api/${version}/admin/cms-seo/slug`;
    },
    detailsUpdate: (version: TApiVersions) => {
      return `/api/${version}/admin/cms-seo/update`;
    },
  },
  aircraft: {
    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/status-change`;
      },
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-category/listing`;
      },
      typicalAircraft: (version: TApiVersions, id: string) => {
        return `/api/${version}/admin/aircraft/bookable-list/${id}`;
      },
      typicalAircraftReorder: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/bookable-list/reorder`;
      },
    },
    main: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/delete`;
      },
      restore: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/undo-delete`;
      },
      hardDelete: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/hard-delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/status-change`;
      },
      makeFeature: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/featured`;
      },
      makeBookable: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/is-bookable`;
      },
      listing: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft/listing`;
      },
    },
  },

  typesOfCharter: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/types-of-charter/status-change`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/status-change`;
      },
      reorder: (version: TApiVersions) => {
        return `/api/${version}/admin/types-of-charter-category/reorder`;
      },
    },
  },
  resources: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/resources/status-change`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/status-change`;
      },
      reorder: (version: TApiVersions) => {
        return `/api/${version}/admin/resources-category/reorder`;
      },
    },
  },
  membership: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/status-change`;
    },
    reorder: (version: TApiVersions) => {
      return `/api/${version}/admin/membership/reorder`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/membership-category/status-change`;
      },
    },
  },
  whyHogani: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/status-change`;
    },
    reorder: (version: TApiVersions) => {
      return `/api/${version}/admin/why-hogani/reorder`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/why-hogani-category/status-change`;
      },
    },
  },
  aircraftOptions: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/status-change`;
    },
    reorder: (version: TApiVersions) => {
      return `/api/${version}/admin/aircraft-options/reorder`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/aircraft-options-category/status-change`;
      },
    },
  },
  travelResources: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/status-change`;
    },
    reorder: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-resources/reorder`;
    },

    category: {
      getAll: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/getall`;
      },
      get: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/get`;
      },
      create: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/create`;
      },
      update: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/update`;
      },
      delete: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/delete`;
      },
      statusChange: (version: TApiVersions) => {
        return `/api/${version}/admin/travel-resources-category/status-change`;
      },
    },
  },
  travelOffer: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/travel-offer/status-change`;
    },
  },
  blog: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/blog/featured`;
    },
  },
  insiderGuide: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide/featured`;
    },
  },
  insiderGuideDownload: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide-download/getall`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide-download/delete`;
    },
  },
  insiderGuideDownloadSetting: {
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide-download-setting/details`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/insider-guide-download-setting/edit`;
    },
  },
  ctaSetting: {
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/cta-setting/details`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/cta-setting/edit`;
    },
  },
  partnerships: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/partnerships/featured`;
    },
  },
  location: {
    countryList: (version: TApiVersions) => {
      return `/api/${version}/admin/location/country-list`;
    },
    stateList: (version: TApiVersions) => {
      return `/api/${version}/admin/location/state-list`;
    },
    cityList: (version: TApiVersions) => {
      return `/api/${version}/admin/location/city-list`;
    },
  },
  route: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/route/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/route/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/route/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/route/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/route/delete`;
    },
    restore: (version: TApiVersions) => {
      return `/api/${version}/admin/route/undo-delete`;
    },
    hardDelete: (version: TApiVersions) => {
      return `/api/${version}/admin/route/hard-delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/route/status-change`;
    },
    makeFeature: (version: TApiVersions) => {
      return `/api/${version}/admin/route/featured`;
    },
  },
  dynamicForm: {
    save: (version: TApiVersions) => {
      return `/api/${version}/admin/dynamic-form/save`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/dynamic-form/update`;
    },
    getBySlug: (version: TApiVersions) => {
      return `/api/${version}/admin/dynamic-form/get-by-slug`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/dynamic-form/status-change`;
    },
  },
  redirection: {
    getAll: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/getall`;
    },
    get: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/get`;
    },
    create: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/create`;
    },
    update: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/update`;
    },
    delete: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/delete`;
    },
    statusChange: (version: TApiVersions) => {
      return `/api/${version}/admin/redirection/status-change`;
    },
  },
};

export const successNotificationEndPoints = [
  endpoints.auth.admin.login,
  endpoints.auth.admin.logout,
  endpoints.auth.admin.forgotPassword,
  endpoints.auth.admin.resetPassword,
  endpoints.auth.admin.profileUpdate('v1'),
  endpoints.auth.admin.settingsUpdate('v1'),
  endpoints.auth.admin.menuFooterUpdate('v1'),
  endpoints.media.uploadSingleFile('v1'),
  endpoints.media.uploadMultipleFile('v1'),
  endpoints.media.deleteFile('v1'),
  endpoints.seo.detailsUpdate('v1'),
  endpoints.heroSectionCMS.heroUpdate('v1'),
  endpoints.cms.main.create('v1'),
  endpoints.cms.main.update('v1'),
  endpoints.cms.main.statusChange('v1'),
  endpoints.cms.content.create('v1'),
  endpoints.cms.content.update('v1'),
  endpoints.cms.content.delete('v1'),
  endpoints.cms.content.statusChange('v1'),
  endpoints.cms.content.reorder('v1'),
  endpoints.cms.faq.create('v1'),
  endpoints.cms.faq.update('v1'),
  endpoints.cms.faq.delete('v1'),
  endpoints.cms.faq.statusChange('v1'),
  endpoints.cms.faq.reorder('v1'),
  endpoints.cms.sectionContent.create('v1'),
  endpoints.cms.sectionContent.update('v1'),
  endpoints.cms.sectionContent.delete('v1'),
  endpoints.cms.sectionContent.statusChange('v1'),
  endpoints.cms.membership.reorder('v1'),
  endpoints.city.create('v1'),
  endpoints.city.update('v1'),
  endpoints.city.delete('v1'),
  endpoints.city.restore('v1'),
  endpoints.city.statusChange('v1'),
  endpoints.city.makeFeature('v1'),
  endpoints.airport.create('v1'),
  endpoints.airport.update('v1'),
  endpoints.airport.delete('v1'),
  endpoints.airport.restore('v1'),
  endpoints.airport.hardDelete('v1'),
  endpoints.airport.statusChange('v1'),
  endpoints.airport.makeFeature('v1'),
  endpoints.airportData.create('v1'),
  endpoints.airportData.update('v1'),
  endpoints.airportData.delete('v1'),
  endpoints.airportData.restore('v1'),
  endpoints.airportData.hardDelete('v1'),
  endpoints.airportData.statusChange('v1'),
  endpoints.testimonial.create('v1'),
  endpoints.testimonial.update('v1'),
  endpoints.testimonial.delete('v1'),
  endpoints.testimonial.statusChange('v1'),
  endpoints.salesPerson.create('v1'),
  endpoints.salesPerson.update('v1'),
  endpoints.salesPerson.delete('v1'),
  endpoints.salesPerson.statusChange('v1'),
  endpoints.aircraft.category.create('v1'),
  endpoints.aircraft.category.update('v1'),
  endpoints.aircraft.category.delete('v1'),
  endpoints.aircraft.category.statusChange('v1'),
  endpoints.aircraft.main.create('v1'),
  endpoints.aircraft.main.update('v1'),
  endpoints.aircraft.main.delete('v1'),
  endpoints.aircraft.main.restore('v1'),
  endpoints.aircraft.main.hardDelete('v1'),
  endpoints.aircraft.main.statusChange('v1'),
  endpoints.aircraft.main.makeFeature('v1'),
  endpoints.aircraft.main.makeBookable('v1'),
  endpoints.blog.create('v1'),
  endpoints.blog.update('v1'),
  endpoints.blog.delete('v1'),
  endpoints.blog.statusChange('v1'),
  endpoints.blog.makeFeature('v1'),
  endpoints.insiderGuide.create('v1'),
  endpoints.insiderGuide.update('v1'),
  endpoints.insiderGuide.delete('v1'),
  endpoints.insiderGuide.statusChange('v1'),
  endpoints.insiderGuide.makeFeature('v1'),
  endpoints.insiderGuideDownload.delete('v1'),
  endpoints.insiderGuideDownloadSetting.update('v1'),
  endpoints.ctaSetting.update('v1'),
  endpoints.partnerships.create('v1'),
  endpoints.partnerships.update('v1'),
  endpoints.partnerships.delete('v1'),
  endpoints.partnerships.statusChange('v1'),
  endpoints.partnerships.makeFeature('v1'),
  endpoints.route.create('v1'),
  endpoints.route.update('v1'),
  endpoints.route.delete('v1'),
  endpoints.route.restore('v1'),
  endpoints.route.hardDelete('v1'),
  endpoints.route.statusChange('v1'),
  endpoints.route.makeFeature('v1'),
  endpoints.contactUs.delete('v1'),
  endpoints.contactUs.sendReply('v1'),
  endpoints.legEnquiry.delete('v1'),
  endpoints.legEnquiry.sendReply('v1'),
  endpoints.supportTicket.delete('v1'),
  endpoints.supportTicket.sendReply('v1'),
  endpoints.charterEnquiry.assignSalesPerson('v1'),
  endpoints.typesOfCharter.create('v1'),
  endpoints.typesOfCharter.update('v1'),
  endpoints.typesOfCharter.delete('v1'),
  endpoints.typesOfCharter.statusChange('v1'),
  endpoints.typesOfCharter.category.create('v1'),
  endpoints.typesOfCharter.category.update('v1'),
  endpoints.typesOfCharter.category.delete('v1'),
  endpoints.typesOfCharter.category.statusChange('v1'),
  endpoints.typesOfCharter.category.reorder('v1'),
  endpoints.resources.create('v1'),
  endpoints.resources.update('v1'),
  endpoints.resources.delete('v1'),
  endpoints.resources.statusChange('v1'),
  endpoints.resources.category.create('v1'),
  endpoints.resources.category.update('v1'),
  endpoints.resources.category.delete('v1'),
  endpoints.resources.category.statusChange('v1'),
  endpoints.resources.category.reorder('v1'),
  endpoints.membership.create('v1'),
  endpoints.membership.update('v1'),
  endpoints.membership.delete('v1'),
  endpoints.membership.statusChange('v1'),
  endpoints.membership.category.create('v1'),
  endpoints.membership.category.update('v1'),
  endpoints.membership.category.delete('v1'),
  endpoints.membership.category.statusChange('v1'),
  endpoints.membership.reorder('v1'),
  endpoints.whyHogani.reorder('v1'),
  endpoints.aircraftOptions.reorder('v1'),
  endpoints.travelResources.reorder('v1'),
  endpoints.cms.hourlyBreakdown.create('v1'),
  endpoints.cms.hourlyBreakdown.update('v1'),
  endpoints.cms.hourlyBreakdown.delete('v1'),
  endpoints.cms.hourlyBreakdown.statusChange('v1'),
  endpoints.cms.mattFacts.create('v1'),
  endpoints.cms.mattFacts.update('v1'),
  endpoints.cms.mattFacts.delete('v1'),
  endpoints.cms.mattFacts.statusChange('v1'),
  endpoints.cms.categoryVsPremium.create('v1'),
  endpoints.cms.categoryVsPremium.update('v1'),
  endpoints.cms.categoryVsPremium.delete('v1'),
  endpoints.cms.categoryVsPremium.statusChange('v1'),
  endpoints.redirection.create('v1'),
  endpoints.redirection.update('v1'),
  endpoints.redirection.delete('v1'),
  endpoints.redirection.statusChange('v1'),
];
