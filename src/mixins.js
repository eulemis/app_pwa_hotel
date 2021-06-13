import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'
export default {
    methods: {
        ...mapMutations([
            'setFood',
            'incrementItemFood',
            'decrementItemFood',
            'deleteData',
            'resetItemSelection',
            'setFoodComment',

        ]),
        ...mapActions([
            'Food',
            'getFoodEndpoint',
            'saveOrder',
            'getComidas',
            'getCagegoryFood',
            'savePictureBaseSeisCuatro',
            'getToken',
            'buscarSuscripcion',
            'obtenerSuscripcion',
            'activarNotificaciones',
            'eliminarSuscripcion'
        ]),
    },
    computed: {
        ...mapGetters([
            'getFoodItems',
            'getSelectedFood',
            'getHotelId',
            'user',
            'getPagination',
            'getSuscripcion'
        ]),
        ...mapState([
            'hotel_id',
            'token',
            'typefood',
            'user_id',
            'reservation',
            'user',
            'hotel',
            'viewFondo',
            'checking',
            'fullname',
            'email',
            'phone',
            'num_reservation',
            'banner',
            'BASE_URL',
            'NotificactionesHabilitadas',
            'RegistroSW',
            'Suscripcion',
            'almuerzoCategories',
            'almuerzoCategories'

        ])
    },
}