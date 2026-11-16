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
    // Static file (no env access): use the origin this admin panel is served from.
    data: {
      url: self.location.origin,
    },
    body: payload?.body,
    icon: `${self.location.origin}/favicon.ico`,
  };

  event.waitUntil(self.registration.showNotification('Hogani Jets Admin', options));
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
