/**
 * Web Push Service Worker File
 */

self.addEventListener('push', (event) => {
  const payload = JSON.parse(event?.data?.text());

  // Options to make the push notification layout and events
  const options = {
    requireInteraction: true,
    actions: [
      {
        title: 'View',
        action: 'view',
      },
      {
        title: 'Close',
        action: 'close',
      },
    ],
    data: {
      url: 'https://dms-admin-development.dedicateddevelopers.us',
    },
    body: payload?.body,
    icon: 'https://dms-admin-development.dedicateddevelopers.us/favicon.ico',
  };

  event.waitUntil(self.registration.showNotification('DMS Admin Notification', options));
});

/**
 * Notification handler for events
 */

self.addEventListener('notificationclick', (event) => {
  const forwardURL = event?.notification?.data?.url;
  if (event?.action === 'view') {
    clients?.openWindow(forwardURL);
  }
});
