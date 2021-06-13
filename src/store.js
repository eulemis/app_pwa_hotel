import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ENV from './config'
import createPersistedState from 'vuex-persistedstate'
import NotificationsModule from './NotificationsModule'

Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		isOnline: true,
		languages: [
			{
				id: '1',
				text: 'EN'
			},
			{
				id: '2',
				text: 'ES'
			}

		],
		login: [],
		token: localStorage.getItem('access_token') || null,
		hotel_id: localStorage.getItem('hotel_id') || null,
		user_id: localStorage.getItem('user_id') || null,
		reservation: localStorage.getItem('reservation') || null,
		user: localStorage.getItem('user') || null,
		hotel: localStorage.getItem('hotel') || null,
		fullname: localStorage.getItem('fullname') || null,
		checking: localStorage.getItem('checking') || null,
		email: localStorage.getItem('email') || null,
		phone: localStorage.getItem('phone') || null,
		num_reservtion: localStorage.getItem('num_reservtion') || null,
		banner: localStorage.getItem('banner') || null,
		user: JSON.parse(localStorage.getItem('user')) || null,
		typefood: [],
		food: [],
		isLoading: false,
		fullPage: true,
		BASE_URL: ENV.BASE_URL,
		foodPagination: {
			current_page: 1,
			data: [],
			last_page: null,
			per_page: 5,
			from: null,
			to: null,
			total: null
		}
	},
	mutations: {
		deleteData({ foodPagination }) {
			foodPagination = {
				current_page: 1,
				data: [],
				last_page: null,
				per_page: 5,
				from: null,
				to: null,
				total: null
			}
		},
		setFoodPagination({ foodPagination }, { current_page, data, last_page, per_page, from, to, total }) {
			if (current_page == 1) {
				foodPagination.data = []
			}
			console.log("setFoodPagination", foodPagination, data )
			data = data.map(food => {
					food.quantity = 0,
					food.comment = '',
					food.user_id = this.user_id
				return food
			})


			foodPagination.current_page = current_page;
			if (foodPagination.data.length > 0) {
				foodPagination.data = foodPagination.data.concat(data)
			} else {
				foodPagination.data = data
			}
			foodPagination.last_page = last_page;
			foodPagination.per_page = per_page;
			foodPagination.from = from;
			foodPagination.to = to;
			foodPagination.total = total;
		},
		setFoodCategory(state, data) {
			const { food, category, items } = data
			if (food == 1) {
				if (category == 'desayuno') {
				}
				state.desayunoCategories.items = items
			}
			/* 	console.log('desde mutacion ', data); */
			/* 	console.log('data desde mutcion', data);
				console.log('category desde mutcion', data.category); */

		},
		BASE_URL(state, BASE_URL) {
			state.BASE_URL = BASE_URL
		},
		uploadImage(state, payload) {
			state.isLoading = payload
		},
		language(state) {
			state.languages = language
		},
		retrieveToken(state, token) {
			state.token = token
		},
		destroyToken(state) {
			state.token = null
		},
		hotel_id(state, hotel_id) {
			state.hotel_id = hotel_id
		},
		destroyHotelId(state) {
			state.hotel_id = null

		},
		user_id(state, user_id) {
			state.user_id = user_id
		},
		destroyUserId(state) {
			state.user_id = null

		},
		setFoodComment(state, pack) {
			let index = state.foodPagination.data.findIndex(({ id }) => id == pack[0])
			state.foodPagination.data[index].comment = pack[1]
		},
		incrementItemFood(state, idFood) {
			console.log(state.foodPagination, state.foodPagination.data.findIndex(({ id }) => id == idFood))
			let index = state.foodPagination.data.findIndex(({ id }) => id == idFood)
			state.foodPagination.data[index].quantity++
		},
		decrementItemFood(state, idFood) {
			let index = state.foodPagination.data.findIndex(({ id }) => id == idFood)
			if (state.foodPagination.data[index].quantity > 0)
				state.foodPagination.data[index].quantity--
		},
		resetItemSelection(state, idFood) {
			let index = state.foodPagination.data.findIndex(({ id }) => id == idFood)
			state.foodPagination.data[index].quantity = 0
		},
		reservation(state, reservation) {
			state.reservation = reservation
		},
		user(state, user) {
			state.user = user
		},

		hotel(state, hotel) {
			state.hotel = hotel
		},
		fullname(state, fullname) {
			state.fullname = fullname
		},
		checking(state, checking) {
			state.checking = checking
		},
		email(state, email) {
			state.email = email
		},
		phone(state, phone) {
			state.phone = phone
		},
		num_reservation(state, num_reservation) {
			state.num_reservation = num_reservation
		},
		banner(state, banner) {
			state.banner = banner
		},
		loginResponse(state, response) {

		}
	},
	getters: {
		loggedIn(state) {
			return state.token !== null
		},
		getFoodItems({ foodPagination }) {
			console.log("getFoodItems", foodPagination.data)
			return foodPagination.data
		},
		getSelectedFood({ foodPagination }) {
			return foodPagination.data.filter(({ quantity }) => quantity > 0)
		},
		getHotelId({ typefood }) {
			return localStorage.getItem('hotel_id') || null
		},
		user({ user }) {
			return localStorage.getItem('user') || null
		},
		getToken({ user }) {
			return localStorage.getItem('access_token') || null
		},
		getPagination({ foodPagination }) {
			return foodPagination
		}
	},
	actions: {
		login({ commit }, credentials) {
			return new Promise((resolve, reject) => {
				axios.post(`${ENV.BASE_URL}/login`, {
					email: credentials.email,
					password: credentials.password,
				})
					.then(response => {
						if (response.status == 200) {
							commit('loginResponse', response)
							const token = response.data.access_token
							const hotel_id = response.data.reservation.hotel_id
							const user_id = response.data.user.id
							const reservation = response.data.reservation
							const user = response.data.user
							const hotel = response.data.hotel
							const fullname = response.data.user.full_name
							const checking = response.data.reservation.checking
							const email = response.data.user.email
							const phone = response.data.user.telephone
							const num_reservation = response.data.reservation.num_reservation
							const banner = response.data.hotel[0].banner_home


							localStorage.setItem('access_token', token)
							localStorage.setItem('hotel_id', hotel_id)
							localStorage.setItem('user_id', user_id)
							localStorage.setItem('reservation', JSON.stringify(reservation))
							localStorage.setItem('user', JSON.stringify(user))
							localStorage.setItem('hotel', JSON.stringify(hotel))
							localStorage.setItem('fullname', fullname)
							localStorage.setItem('checking', checking)
							localStorage.setItem('email', email)
							localStorage.setItem('phone', phone)
							localStorage.setItem('num_reservation', num_reservation)
							localStorage.setItem('banner', banner)


							commit('retrieveToken', token)
							commit('hotel_id', hotel_id)
							commit('user_id', user_id)
							commit('reservation', reservation)
							commit('user', user)
							commit('hotel', hotel)
							commit('fullname', fullname)
							commit('checking', checking)
							commit('email', email)
							commit('phone', phone)
							commit('num_reservation', num_reservation)
							commit('banner', banner)

							resolve(response)
						}

					})
					.catch(error => {
						reject(error)
					})
			})
		},
		logout(context) {
			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					axios.post(`${ENV.BASE_URL}/logout`, '', {
						headers: { Authorization: "Bearer " + context.state.token }
					})
						.then(response => {
							localStorage.removeItem('access_token')
							context.commit('destroyToken')
							localStorage.removeItem('user_id')
							localStorage.removeItem('hotel_id')
							localStorage.removeItem('reservation')
							localStorage.removeItem('user')
							localStorage.removeItem('hotel')
							localStorage.removeItem('fullname')
							localStorage.removeItem('checking')
							localStorage.removeItem('email')
							localStorage.removeItem('phone')
							localStorage.removeItem('num_reservation')
							localStorage.removeItem('banner')
							localStorage.removeItem('vuex')
							localStorage.removeItem('method_payment')
							resolve(response)
						})
						.catch(error => {
							localStorage.removeItem('access_token')
							context.commit('destroyToken')
							localStorage.removeItem('user_id')
							localStorage.removeItem('hotel_id')
							reject(error)
						})
				})
			}
		},
		/* getComidas({ commit, getters, state }, { food, page = 1 }) {

			let { current_page, last_page } = state.foodPagination
			let nextPage = current_page + 1;

			return new Promise((resolve, reject) => {
				axios.get(`${ENV.BASE_URL}/food_menu/${food}/${getters.getHotelId}?page=${page}`, {
					headers: {
						Authorization: 'Bearer ' + getters.getToken,
						'Content-Type': 'application/json'
					}
				})
					.then(response => {
						if (response.status == 200) {
							if (response.data.paginate) {
								commit('setFoodPagination', response.data.paginate)
								resolve(response.data.paginate)
							} else {
								resolve(response.data)
							}
						}
					})
					.catch(error => {
						reject(error)
					})
			})
		}, */
		getCagegoryFood({ commit, getters, state }, { food, category, page = 1 }) {
			return new Promise((resolve, reject) => {
				axios.get(`${ENV.BASE_URL}/food_category/${getters.getHotelId}/${food}/${category}`, {
					headers: {
						Authorization: 'Bearer ' + getters.getToken,
						'Content-Type': 'application/json'
					}
				})
					.then(response => {
						if (response.status == 200) {
							if (response.data) {
								commit('setFoodPagination', { data: response.data })
								resolve(response.data)
							} else {
								resolve(response.data)
							}
						}
					})
					.catch(error => {
						reject(error)
					})


			})
		},

		saveOrder(context, credentials) {

			return new Promise((resolve, reject) => {

				axios({
					method: 'post', //you can set what request you want to be
					url: `${ENV.BASE_URL}/order`,
					data: {
						data: credentials.data,
						user_id: credentials.user_id,
						reservation_id: credentials.reservation_id,
						pricetotal: credentials.totalprice,
					},

					headers: {
						Authorization: 'Bearer ' + credentials.token,
						'Content-Type': 'application/json'
					}
				})

					.then(response => {
						if (response.status == 200) {

							resolve(response)
						}

					})
					.catch(error => {

						reject(error)
					})
			})
		},
		getOrder(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.get(`${ENV.BASE_URL}/get-room-service/${credentials.user_id}/${credentials.reservation_id}`, {
					headers: {
						Authorization: 'Bearer ' + credentials.token,
						'Content-Type': 'application/json'
					}
				})
					.then(response => {

						if (response.status == 200) {

							resolve(response)
						}

					})
					.catch(error => {

						reject(error)
					})
			})
		},
		savePictureBaseSeisCuatro(context, image) {
			return new Promise((resolve, reject) => {

				axios({
					method: 'post', //you can set what request you want to be
					url: `${ENV.BASE_URL}/save_image`,
					data: {
						id: context.state.user_id,
						image_doc_huesped: image,
					},


				})

					.then(response => {

						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		saveComment(context, credentials) {
			console.log(credentials)
			return new Promise((resolve, reject) => {
				axios({
					method: 'post', //you can set what request you want to be
					url: `${ENV.BASE_URL}/room-service`,
					data: {
						service_area_id: credentials.service_area_id,
						description: credentials.description,
						user_id: credentials.user_id,
						reservation_id: credentials.reservation_id,
						hotel_id: credentials.hotel_id,
					},

					headers: {
						Authorization: 'Bearer ' + credentials.token,
						'Content-Type': 'application/json'
					}
				})

					.then(response => {
						if (response.status == 200) {

							resolve(response)
						}

					})
					.catch(error => {

						reject(error)
					})
			})

		},
		getAreas(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.get(`${ENV.BASE_URL}/service-area`, {
					headers: {
						Authorization: 'Bearer ' + credentials.token,
						'Content-Type': 'application/json'
					}
				})
					.then(response => {

						if (response.status == 200) {

							resolve(response)
						}

					})
					.catch(error => {

						reject(error)
					})
			})
		},
	},
	plugins: [createPersistedState()],
	modules: {
		notifications: NotificationsModule
	}
})

