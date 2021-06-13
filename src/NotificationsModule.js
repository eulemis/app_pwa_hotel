import BASE_URL_CALLS from './api_url'
import {
  encode, decode, trim,
  isBase64, isUrlSafeBase64
} from 'url-safe-base64'


const NotificationsModule = {
	state: {
		NotificationesSoportadas  : false,
		NotificactionesHabilitadas: false,
		RegistroSW                : null,
		Suscripcion               : null,      
	},
	getters:{
		getRegistro: (state) => {
			return state.RegistroSW;
		},
		getSuscripcion(state){
			return state.Suscripcion
		}
	},
	mutations: {
		setRegistroServiceWorker(state, payload){
			state.RegistroSW = payload
		},
		ausenciaSuscripcion(state, payload){
			state.NotificactionesHabilitadas = false
			state.Suscripcion = null
		},
		setSuscripcion(state, suscripcion){
			state.NotificactionesHabilitadas = true
			state.Suscripcion = suscripcion
		},
		setSupportNotifications(state){
			state.NotificationesSoportadas = true
		}
	},
	actions: {

		/**
		 * SE ENCARGA DE PREGUNTAR
		 * si existe un service worker registrado
		 */
		buscarSuscripcion({ commit, dispatch }, payload) {
			if ('Notification' in window && 'serviceWorker' in navigator) {
				commit("setSupportNotifications")
			}
			return navigator.serviceWorker.ready
			.then(swreg => {
				commit("setRegistroServiceWorker",swreg)
				return dispatch('obtenerSuscripcion',swreg)
			})
		},

		/**
		 * VALIDA si existe una suscripcion anterior
		 * al service worker y almacena el estatus 
		 * de la suscripcion.
		 * SI EXISTE una suscripcion la almacena en una estado para
		 * poder manejarla mas tarde
		 */
		obtenerSuscripcion({ commit, dispatch }, swreg){
			return swreg.pushManager.getSubscription().then((suscripcion)=>{
				if (suscripcion === null) {
					commit("ausenciaSuscripcion")
				} else {
					commit("setSuscripcion",suscripcion)
				}
				return suscripcion
			})
		},	

		/**
		 * Ejecuta la solicitud para suscribir notificaciones
		 */
		activarNotificaciones({ commit, dispatch }, payload){
			dispatch('solicitarPermisoDeNotificaciones')
		},

		/**
		 * Verifica que el dispositivo o navegador 
		 * soportan notificaciones push
		 */
		solicitarPermisoDeNotificaciones({ commit, dispatch }, payload){
			if(!window.Notification){
				return
			}
			
			/**
			 * SI NO SE HA PEDIDO NOTIFICACIONES ANTERIORMENTE
			 * este bloque de codigo se encarga de solicitar al usuario 
			 * permiso para recibir notificaciones.
			 * SI EL USUARIO permite las notificaciones (granted)
			 * Se ejecuta la suscripcion del dispositivo con el 
			 * service worker para que el bakcend almacene el endpoint del dispositivo
			 */
			if(Notification.permission ==='default'){
				Notification.requestPermission().then((permission)=>{				
					if(Notification.permission ==='granted'){
						dispatch('crearSuscripcion').then((suscripcion)=>{
							let user = JSON.parse(localStorage.getItem('user'))
							let body = {
								subscription: suscripcion,
								userId: user.id
							}
							return fetch(`${BASE_URL_CALLS}/api/subscription`,{
								method: 'POST',
								credentials: 'same-origin',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(body)
							})
						}).then((response)=>{
						
						})
					}
				})			
			} 
			

			/**
			 * SI YA SE HA SOLICITADO PERMISO PARA LAS NOTIFICACIONES
			 * y el usuario las permition (granted) se ejecuta
			 * la suscripcion del dispositivo al service worker
			 * y se envia al backend para que almacene el endpoint del
			 * dispositivo para poder enviar notificaciones
			 * y el frontend las reciba
			 */
			if (Notification.permission ==='granted') {
				dispatch('crearSuscripcion').then((suscripcion)=>{
					let user = JSON.parse(localStorage.getItem('user'))
					let body = {
						subscription: suscripcion,
						userId: user.id
					}
					return fetch(`${BASE_URL_CALLS}/api/subscription`,{
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(body)
					})
				}).then((response)=>{
				
				})
			}
		},

		/**
		 * Se encarga de validar si existe el registro del service worker
		 * SI NO SE ENCUENTRA EL REGISTRO DEL SERVICE WORKER
		 * ejecuta el registro del service worker para poder crear las suscripciones
		 * SI YA SE ENCUENTRA ALMACENADO EL REGISTRO
		 * Ejecuta la suscripcion del dispositivo al service worker
		 */
		crearSuscripcion({ commit, dispatch, getters}, payload){
			if (getters.getRegistro === null) {
				return dispatch('buscarSuscripcion').then((suscripcion)=>{
					return dispatch('Suscribir',getters.getRegistro) 
				})
			} else {
				return dispatch('Suscribir',getters.getRegistro) 
			}
		},

		/**
		 * Se encarga de solicitar la llave publica (VAPID KEY)
		 * al backend para suscribirla al service worker.
		 * Una vez el backend responde con la VAPID KEY
		 * se crea la suscripcion al pushManager del serviceWorker
		 * para crear un endpoint al dispositivo que le sirva al backend
		 * para enviar notificaciones
		 */
		Suscribir({ commit, dispatch, getters}, swReg){
			return dispatch('obtenerLlavePublica').then((key)=>{
				
				let buffer = dispatch('urlBase64ToUint8Array',key)
				
				
				const padding = '='.repeat((4 - key.length % 4) % 4);
				const base64 = (key + padding)
					.replace(/\-/g, '+')
					.replace(/_/g, '/');

				const rawData = window.atob(base64);
				let outputArray = new Uint8Array(rawData.length);

				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i);
				}
				
			
				return swReg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: outputArray
				})
			})
		},

		/**
		 * SOLICITA AL BACKEND LA VAPID KEY
		 * una llave publica creada para asociar el backend con el frontend
		 */
		obtenerLlavePublica({ commit, dispatch, getters},){
			return new Promise((resolve,reject)=>{
				fetch(`${BASE_URL_CALLS}/api/subscription/key`)
				.then(res => res.text())
				.then((publicKey)=>{
					resolve(publicKey)
					
				})
			})
		},		

        urlBase64ToUint8Array({ commit, dispatch, getters},base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            let outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        },		
		str2ab({ commit, dispatch, getters},str) {
			var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
			var bufView = new Uint16Array(buf);
			for (var i = 0, strLen = str.length; i < strLen; i++) {
			  bufView[i] = str.charCodeAt(i);
			}
			return buf;
		  },
		

		  /**
		   * Se encarga de eliminar una suscripcion a las notificaciones
		   * El primer paso es eliminar la suscripcion en la base
		   * de datos dle backend y luego elimina la suscripcion del
		   * service worker
		   */
		eliminarSuscripcion({ commit, dispatch, getters},payload){
			let suscripcion = getters.getSuscripcion
			let user = JSON.parse(localStorage.getItem('user'))
			let body = {
				endpoint: suscripcion.endpoint,
				userId: user.id
			}

			return fetch(`${BASE_URL_CALLS}/api/subscription/delete`,{
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}).then((response)=>{
				return suscripcion.unsubscribe().then((suscripcion)=>{
					commit('ausenciaSuscripcion')
				})
			})

		}
	}
};

export default NotificationsModule
