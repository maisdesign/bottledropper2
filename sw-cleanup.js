// SAFE SERVICE WORKER CLEANUP - Remove all service workers without infinite reload
console.log('🧹 SAFE SW CLEANUP: Starting cleanup without reload loops...');

self.addEventListener('install', function(event) {
  console.log('🧹 Safe Cleanup SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('🧹 Safe Cleanup SW activated, cleaning up...');

  event.waitUntil(
    (async function() {
      try {
        // Clear all caches
        const cacheNames = await caches.keys();
        console.log('🗑️ Deleting caches:', cacheNames);

        for (const cacheName of cacheNames) {
          await caches.delete(cacheName);
        }

        console.log('✅ All caches cleared successfully');

        // Self-destruct immediately - NO CLIENT RELOAD MESSAGES
        await self.registration.unregister();
        console.log('🧹 Safe Cleanup SW unregistered itself');

      } catch (error) {
        console.error('🧹 Safe Cleanup SW error:', error);
        // Still try to unregister even on error
        try {
          await self.registration.unregister();
        } catch (unregError) {
          console.error('Failed to unregister:', unregError);
        }
      }
    })()
  );
});

// NO FETCH LISTENER - let normal requests go through// Build trigger ven  3 ott 2025 20:52:54
