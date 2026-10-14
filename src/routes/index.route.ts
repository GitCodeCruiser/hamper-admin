export enum RouteConfig {
  auth = '/auth',
  dashboard = '/dashboard',
  cms = '/dashboard/cms',
  availableAircraft = '/dashboard/available-aircraft',
  destinations = '/dashboard/destinations',
  lifestyle = '/dashboard/lifestyle',
}

export const PAGE_ROUTE = {
  auth: {
    login: `${RouteConfig.auth}/login`,
    forgotPassword: `${RouteConfig.auth}/forgot-password`,
    checkEmail: `${RouteConfig.auth}/forgot-password/check-email`,
    resetPassword: `${RouteConfig.auth}/reset-password`,
  },

  dashboard: {
    mainpage: `${RouteConfig.dashboard}`,
    homepage: `${RouteConfig.dashboard}/homepage`,
    membership: {
      list: `${RouteConfig.dashboard}/membership`,
      add: `${RouteConfig.dashboard}/membership/add`,
      edit: `${RouteConfig.dashboard}/membership/edit`,
    },
    whyHogani: {
      list: `${RouteConfig.dashboard}/why-hogani`,
      add: `${RouteConfig.dashboard}/why-hogani/add`,
      edit: `${RouteConfig.dashboard}/why-hogani/edit`,
    },
    aircraftOptions: {
      list: `${RouteConfig.dashboard}/aircraft-options`,
      add: `${RouteConfig.dashboard}/aircraft-options/add`,
      edit: `${RouteConfig.dashboard}/aircraft-options/edit`,
    },
    travelResources: {
      list: `${RouteConfig.dashboard}/travel-resources`,
      add: `${RouteConfig.dashboard}/travel-resources/add`,
      edit: `${RouteConfig.dashboard}/travel-resources/edit`,
    },
    aboutUs: `${RouteConfig.dashboard}/about-us`,
    mattHogan: `${RouteConfig.dashboard}/matt-hogan`,
    compareAircraft: `${RouteConfig.dashboard}/compare-aircraft`,
    availableAircraft: {
      categoryList: `${RouteConfig.availableAircraft}/aircraft-category`,
      categoryAdd: `${RouteConfig.availableAircraft}/aircraft-category/add`,
      categoryEdit: `${RouteConfig.availableAircraft}/aircraft-category/edit`,
      typicalAircraft: (id: string) =>
        `${RouteConfig.availableAircraft}/aircraft-category/${id}/typical-aircraft`,
      list: `${RouteConfig.availableAircraft}/aircraft`,
      add: `${RouteConfig.availableAircraft}/aircraft/add`,
      edit: `${RouteConfig.availableAircraft}/aircraft/edit`,
    },
    destinations: {
      list: `${RouteConfig.dashboard}/destinations`,
      add: `${RouteConfig.dashboard}/destinations/add`,
      edit: `${RouteConfig.dashboard}/destinations/edit`,
    },
    airport: {
      list: `${RouteConfig.dashboard}/airport`,
      add: `${RouteConfig.dashboard}/airport/add`,
      edit: `${RouteConfig.dashboard}/airport/edit`,
    },
    airportData: {
      list: `${RouteConfig.dashboard}/airport-data`,
      add: `${RouteConfig.dashboard}/airport-data/add`,
      edit: `${RouteConfig.dashboard}/airport-data/edit`,
    },
    route: {
      list: `${RouteConfig.dashboard}/route`,
      add: `${RouteConfig.dashboard}/route/add`,
      edit: `${RouteConfig.dashboard}/route/edit`,
    },
    salesPerson: {
      list: `${RouteConfig.dashboard}/sales-person`,
      add: `${RouteConfig.dashboard}/sales-person/add`,
      edit: `${RouteConfig.dashboard}/sales-person/edit`,
    },
    charterEnquiry: {
      list: `${RouteConfig.dashboard}/charter-enquiry`,
      add: `${RouteConfig.dashboard}/charter-enquiry/add`,
      view: `${RouteConfig.dashboard}/charter-enquiry/view`,
    },
    typesOfCharter: {
      list: `${RouteConfig.dashboard}/types-of-charter`,
      add: `${RouteConfig.dashboard}/types-of-charter/add`,
      edit: `${RouteConfig.dashboard}/types-of-charter/edit`,
    },
    resources: {
      list: `${RouteConfig.dashboard}/resources`,
      add: `${RouteConfig.dashboard}/resources/add`,
      edit: `${RouteConfig.dashboard}/resources/edit`,
    },
    lifestyle: {
      testimonial: {
        list: `${RouteConfig.lifestyle}/testimonial`,
        add: `${RouteConfig.lifestyle}/testimonial/add`,
        edit: `${RouteConfig.lifestyle}/testimonial/edit`,
      },
      blog: {
        list: `${RouteConfig.lifestyle}/blog`,
        add: `${RouteConfig.lifestyle}/blog/add`,
        edit: `${RouteConfig.lifestyle}/blog/edit`,
      },
      insiderGuide: {
        list: `${RouteConfig.lifestyle}/insider-guide`,
        add: `${RouteConfig.lifestyle}/insider-guide/add`,
        edit: `${RouteConfig.lifestyle}/insider-guide/edit`,
      },
      partnerships: {
        list: `${RouteConfig.lifestyle}/partnerships`,
        add: `${RouteConfig.lifestyle}/partnerships/add`,
        edit: `${RouteConfig.lifestyle}/partnerships/edit`,
      },
    },
    contactUs: {
      list: `${RouteConfig.dashboard}/contact-us`,
      reply: `${RouteConfig.dashboard}/contact-us/reply`,
    },
    legEnquiry: {
      list: `${RouteConfig.dashboard}/leg-enquiry`,
      reply: `${RouteConfig.dashboard}/leg-enquiry/reply`,
    },
    master: {
      countryList: {
        list: `${RouteConfig.dashboard}/master/country-list`,
        add: `${RouteConfig.dashboard}/master/country-list/add`,
        edit: `${RouteConfig.dashboard}/master/country-list/edit`,
      },
      stateList: {
        list: `${RouteConfig.dashboard}/master/state-list`,
        add: `${RouteConfig.dashboard}/master/state-list/add`,
        edit: `${RouteConfig.dashboard}/master/state-list/edit`,
      },
      cityList: {
        list: `${RouteConfig.dashboard}/master/city-list`,
        add: `${RouteConfig.dashboard}/master/city-list/add`,
        edit: `${RouteConfig.dashboard}/master/city-list/edit`,
      },
    },
    salesSupport: {
      list: `${RouteConfig.dashboard}/sales-support`,
      reply: `${RouteConfig.dashboard}/sales-support/reply`,
    },
    travelOffer: {
      list: `${RouteConfig.dashboard}/travel-offer`,
      add: `${RouteConfig.dashboard}/travel-offer/add`,
      edit: `${RouteConfig.dashboard}/travel-offer/edit`,
    },
    settings: `${RouteConfig.dashboard}/settings`,
    profileDetails: `${RouteConfig.dashboard}/profile-details`,
    privacyPolicy: `${RouteConfig.dashboard}/privacy-policy`,
    emptyLegFlight: `${RouteConfig.dashboard}/empty-leg-flights`,
    cookiePolicy: `${RouteConfig.dashboard}/cookie-policy`,
    termsAndCondition: `${RouteConfig.dashboard}/terms-condition`,
    safety: `${RouteConfig.dashboard}/safety`,
    referralProgram: `${RouteConfig.dashboard}/referral-program`,
    pricingCalculator: `${RouteConfig.dashboard}/pricing-calculator`,
    enquiry: `${RouteConfig.dashboard}/enquiry`,
    disclaimer: `${RouteConfig.dashboard}/disclaimer`,
    guideDownloads: `${RouteConfig.dashboard}/guide-downloads`,
    cta: `${RouteConfig.dashboard}/cta`,
    robotsText: `${RouteConfig.dashboard}/robots-text`,
    llmsText: `${RouteConfig.dashboard}/llms-text`,
    cookieBannerScript: `${RouteConfig.dashboard}/cookie-banner-script`,
    otherScript: `${RouteConfig.dashboard}/other-script`,
    documentUploadScript: `${RouteConfig.dashboard}/document-upload-script`,

    redirection: {
      list: `${RouteConfig.dashboard}/redirection`,
      add: `${RouteConfig.dashboard}/redirection/add`,
      edit: `${RouteConfig.dashboard}/redirection/edit`,
    },

    ourStory: `${RouteConfig.dashboard}/our-story`,
    concierge: `${RouteConfig.dashboard}/concierge`,
    safetyOperatorVetting: `${RouteConfig.dashboard}/safety-operator-vetting`,
    onDemandCharter: `${RouteConfig.dashboard}/on-demand-charter`,
    jetCard: `${RouteConfig.dashboard}/jet-card`,
    loyaltyProgram: `${RouteConfig.dashboard}/loyalty-program`,
    privateOffice: `${RouteConfig.dashboard}/private-office`,
    jetCardEnquiry: `${RouteConfig.dashboard}/jet-card-enquiry`,
    loyaltyProgramEnquiry: `${RouteConfig.dashboard}/loyalty-program-enquiry`,
    privateOfficeEnquiry: `${RouteConfig.dashboard}/private-office-enquiry`,
  },
};
