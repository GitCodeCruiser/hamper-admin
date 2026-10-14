import { useCallback, useEffect, useState } from 'react';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * Web Push Subscription Custom Hook
 * @returns WebApp web-push (PushSubscription) if user allowed
 */
const useWebPush = () => {
  const [savedSubscription, setSavedSubscription] = useState<PushSubscription | null>(null);

  const publicKey = process.env.WEB_PUSH_KEY_PUBLIC || '';

  const onPermissionGranted = useCallback(async () => {
    if (Notification.permission === 'granted' && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setSavedSubscription(existingSubscription);

        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      setSavedSubscription(newSubscription);
    }
  }, [publicKey]);

  const forcelyUnsubscribe = useCallback(() => {
    savedSubscription
      ?.unsubscribe()
      .then((res) => {
        console.info('Unsubscribed:', res);
        setSavedSubscription(null);
      })
      .catch((err) => {
        console.error('Unsubscribe error:', err);
      });
  }, [savedSubscription]);

  const initiateRequestPermission = useCallback(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          onPermissionGranted();
        }
      });
    } else if (Notification.permission === 'granted') {
      onPermissionGranted();
    }
  }, [onPermissionGranted]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          initiateRequestPermission();
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [initiateRequestPermission]);

  return { savedSubscription, forcelyUnsubscribe };
};

export default useWebPush;
