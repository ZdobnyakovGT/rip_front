self.addEventListener('fetch',() => console.log("fetch"));


// self.addEventListener('fetch', (event) => {
//     console.log(`Запрос: ${event.request.url}`);
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });
