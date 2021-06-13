const STATIC_CACHE    = 'static-v1.6';
const DYNAMIC_CACHE    = 'dynamic-v1.6';
const APP_SHELL = [
    '/home',
    '/food',
    '/detailFood',
    'reservation',
    '/cenas',
    '/detailreservation',
    '/amallaves'
];

if (workbox) {
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
else {
}


self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ,{credentials: 'same-origin'}));
    e.waitUntil( cacheStatic  );
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil( respuesta );
});

self.addEventListener( 'fetch', e => {
    
    let esRutaDeLogin = e.request.url.includes('/auth/login')
    let suscription = e.request.url.includes('/subscription')
    let deletesuscription = e.request.url.includes('/subscription/delete')
    let esRutaFoodMenu = e.request.url.includes('/auth/food_menu')
    let esNotificacion = e.request.url.includes('/notify')
    let esOrder = e.request.url.includes('/order')
    let esDocument = e.request.url.includes('/save_image')

    let esTipoPOST = e.request.method == 'POST'
    
    if(esNotificacion || esOrder || esDocument || suscription || deletesuscription){
        return
    }

    if((!esRutaDeLogin) && (!esTipoPOST) && (!suscription) ){
        const respuesta = cacheWithNetworkUpdate(e)
       e.respondWith( respuesta );
    } else {
        
        return fetch(e.request,{credentials: 'same-origin'})
    }
});

// Listen to Push
self.addEventListener('push', (e) => {
    let data

    if (e.data) {
        data = e.data.json()
    }


    const options = {
        body: data.body,
        icon: '/img/icon/icon-192x192.png',
        image: '/img/fondo_notificacion.jpg',
        vibrate: [300, 200, 300],
        badge: '/img/icon/icon-192x192.png',
    }


    e.waitUntil(self.registration.showNotification(data.title, options))
})

function cacheWithNetworkUpdate(e) {
    return caches.match(e.request).then(res => {
        if (res) {
            actualizaCacheStatico(STATIC_CACHE, e.request);
            return res;
        } else {
            e.request.credentials = 'same-origin'
            return fetch( e.request ).then( newRes => {
                return updateCache( DYNAMIC_CACHE, e.request, newRes );
            }).catch((err)=>{
                return new Response({
                    err: 101,
                    message: 'No internet conection'
                })
            });
        }
    });
}


// Guardar  en el cache dinamico
function updateCache( dynamicCache, req, res ) {
    if ( res.ok ) {
        return caches.open( dynamicCache ).then( cache => {
            let response = res.clone()
            cache.put( req, response );
            return res;
        });
    } else {
        return res;
    }
}

// Cache with network update
function actualizaCacheStatico( staticCache, req ) {
    return fetch( req ,{credentials: 'same-origin'})
            .then( res => {
                return updateCache( staticCache, req, res );
            }).catch(err=>{
               
            });

}

