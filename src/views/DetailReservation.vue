<template>
<div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">
    </loading>
    
    <div class="baner">
        <img style="margin-top:4%;" class="img-fluid baner_principal" src="@/assets/Banner_detail.png" />
    </div>
    <!--<b-container>
    <b-row>
        <b-col  cols="6" md="6">
            <div >
                <p class="title_check">{{$t('hab')}} # <span id="num_room" v-text="num_room"></span></p>

                <p class="title_check_2"><span id="fullname" v-text="this.fullname"></span></p>
            </div>
        </b-col>
        <b-col  cols="6" md="6" class="pull-right">
            <div >
                <p class="title_check">Check-in</p>
                <p id="checking" v-text="this.checking"></p>
            </div>
        </b-col>
    </b-row>
</b-container>-->
    
    

    <main class="general-font">
        <h2 style="margin-top:30px;" class="title">{{$t('history_services')}}</h2>
        <div><br><br>
            <!--<b-tabs content-class="mt-3">
                    <b-tab  title="Pedidos Realizados" :title-link-class="linkClass(0)">-->
            <template>
                <div style="width:100%;">
                    <b-table v-if="getOrder != null" striped hover outlined :per-page="perPage" :current-page="currentPage" :items="getOrder" :fields="fieldsOrder" style="width:100%">
                        <template v-if="getOrder != null" v-slot:custom-foot="data">
                            <tr>
                                <td style="font-weight: bold"></td>
                                <td style="text-align: right; font-weight: bold">Total =</td>
                                <td style="text-align: inherit; font-weight: bold" class="totalP">

                                   $ {{ totalItems.toFixed(2) }} 
                                </td>
                            </tr>
                        </template>
                        <template v-slot:cell(menu)="data">
                            {{ data.item.menu  }}
                        </template>
                        <template v-slot:cell(total)="data">
                            $ {{ data.item.total.toFixed(2) }}
                        </template>
                    </b-table>
                    <div class="mt-3">
                        <b-pagination v-if="getOrder != null" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
                    </div>

                    <!--       <b-alert class="info" v-else="" show>{{$t('messaje_order')}}</b-alert> -->

                </div>
            </template>
            <!-- </b-tab>
                   <b-tab  title="Services" :title-link-class="linkClass(1)">
                        <template>
                            <div  style="width:100%;">
                                <b-table v-if="getRoomService != null" hover :items="getRoomService" :fields="fields" style="width:100%">

                                    <template  v-slot:cell(area)="data">
                                      {{ data.item.service_area.area  }}
                                    </template>
                                    <template  v-slot:cell(status)="data">
                                        <span class="btn btn-info btn-sm">{{ data.item.status  }}</span>
                                    </template>
                                </b-table>
                               <b-alert class="info" v-else="" show>{{$t('messaje_services')}}</b-alert>

                            </div>
                        </template>
                        <div class="title">
                            <h2>{{$t('service')}}</h2>
                        </div>
                        <div class="row  ">
                            <div class="col-md-3  col-xs-12">
                                <img class="img_services" v-lazy="service"/>
                                <div v-lazy:background-image="service"></div>

                            </div>
                            <div class="col-md-3  col-xs-12">
                                <img class="img_services" v-lazy="service2"/>
                                <div v-lazy:background-image="service2"></div>

                            </div>
                            <div class="col-md-3  col-xs-12">
                                <img class="img_services" v-lazy="service3"/>
                                <div v-lazy:background-image="service3"></div>

                            </div>
                            <div class="col-md-3  col-xs-12">
                                <img class="img_services" style="border-radius: 10px;" v-lazy="service4"/>
                                <div v-lazy:background-image="service4"></div>

                            </div>
                        </div> 
                    </b-tab>

                    </b-tabs>-->
        </div>
    </main>

</div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const customStyles = {
    ul: {
        border: '2px solid red'
    },
    li: {
        display: 'inline-block',
        border: '2px dotted green'
    },
    a: {
        color: 'blue'
    }
};

export default {
    data() {
        return {
            foods: [],
            show: false,
            perPage: 4,
            currentPage: 1,
            customStyles,
            isLoading: false,
            fullPage: true,
            value: 0,
            total: '',
            fields: [{
                    key: "fecha",
                    label: "Fecha",
                },
                {
                    key: "area",
                    label: "Service area",
                },
                {
                    key: "status",
                    label: "Status",
                },

            ],
            fieldsOrder: [{
                    key: "date",
                    label: "Fecha",
                },
                {
                    key: "menu",
                    label: "Menú",
                },
                /*   {
                     key: "status",
                     label: "Status",
                   },*/
                {
                    key: "total",
                    label: "Total",
                },

            ],

            num_room: '',
            getRoomService: [],
            getOrder: [],
            tabIndex: 0,
            service: {
                src: './img/servicio_1.webp',
                error: 'https://picsum.photos/200/300.webp',
                loading: './img/loading.gif'
            },
            service2: {
                src: './img/servicio_2.webp',
                error: 'https://picsum.photos/200/300.webp',
                loading: './img/loading.gif'
            },
            service3: {
                src: './img/servicio_3.webp',
                error: 'https://picsum.photos/200/300.webp',
                loading: './img/loading.gif'
            },
            service4: {
                src: './img/400x400.webp',
                error: 'https://picsum.photos/200/300.webp',
                loading: './img/loading.gif'
            },
            imgObj: {
                src: './img/banner_detail.png',
                error: './img/banner_detail.png',
                loading: './img/loading.gif'
            },

        };

    },
    components: {
        Loading

    },

    computed: {
        ...mapState(['token', 'typefood', 'reservation', 'user', 'fullname', 'checking', 'BASE_URL']),
        totalItems() {
            let totalPrice = this.getOrder.reduce((acc, item) => {
                acc += item.total;
                return acc;
            }, 0);
            return totalPrice;
        },
        rows() {
            return this.getOrder.length;
        },
    },

    mounted() {

        this.getRoomServiceHuesped()
        this.getOrderHuesped()
        /*  this.checking = this.reservation.checking*/
        this.num_room = this.reservation.room.num_room

    },
    methods: {

        async getRoomServiceHuesped() {
            let response = await axios.get(this.BASE_URL + "/get-room-service" + '/' + this.user.id + '/' + this.reservation.id, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            if (response.data.data == '') {
                this.getRoomService = null;
            } else {
                this.getRoomService = response.data.data.data;

            }

        },

        async getOrderHuesped() {
            this.isLoading = true;
            let response = await axios.get(this.BASE_URL + "/get-order" + '/' + this.user.id + '/' + this.reservation.id, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            if (response.data.data == '') {
                this.getOrder = null;
                this.isLoading = false;
            } else {
                this.getOrder = response.data.data.data;
            }
            this.isLoading = false;
        },
        linkClass(idx) {
            if (this.tabIndex === idx) {
                return ['bg-light', 'text-dark']
            } else {
                return ['bg-light', 'text-dark']
            }
        }
    },

};
</script>

<style scoped>



.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #94700a !important;
    border-color: #94700a !important;
}

.tab {
    overflow: hidden;

    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

main {
    max-width: 1528px;
    padding: -11px;
    border-radius: 10px;
    margin: auto;
    margin-top: -5px;
    text-align: center;
}

.img_service_all {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    justify-content: space-between;
    margin: auto;
}

.servicesAll {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}

.title_service {
    margin: 1%;
    margin-left: 4.5%;
    text-align: initial;
}

h2 {
    font-size: 30px;
    font-weight: 700;
}

p {
    position: absolute;
    color: black;
    font-size: 151px;
    margin: 8%;
    margin-top: -16%;
    top: 1em;
    left: 0;
}

/*Css Datos Reservation*/
.check_in {
    border-radius: 6px;
    position: absolute;
    left: 82%;
    top: 26%;
    width: 15%;
    height: 63px;
    background-color: #f1e8e88c;
    padding: 0px;
}

.title_check {
    color: black;
    text-align: center;
    margin-top: 0px;
    font-size: 20px;
    font-weight: 600;

}

.title_check_2 {
    color: black;
    text-align: center;
    margin-top: 10%;
    font-size: 20px;
    font-weight: 600;

}

.huesped {
    border-radius: 6px;
    position: absolute;
    left: 4%;
    top: 22%;
    width: 27%;
    height: 100px;
    background-color: #fafafab3;
    border: red;
    padding: 0px;
}

#checking {
    text-align: center;
    margin-top: 24px;
    font-size: 21px;
    font-weight: 500;
}

.title {
    color: black;
    
}

.info {
    color: #fff;
    background-color: #94700a;
    border-color: #94700a;
}

.btn-info:hover {
    color: #fff;
    background-color: #94700a;
    border-color: #94700a;
}

.nav-tabs .nav-link a {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
}

.tab-title-class {
    color: red !important;
}

.img_services {
    width: 74%;
    margin: 8px;

    /*Find css datos reservation*/
}

#fullname {
    text-transform: uppercase;
}

.general-font{
    color: black;
    font-family: 'FonstFree';
    text-transform: uppercase;
}

/* Smartphones (portrait & landscape) */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

    /*Responsive reservation*/
    .info {
        color: #fff;
        background-color: #94700a;
        border-color: #94700a;
        width: 87%;
        margin: auto;
    }

    .huesped {
        border-radius: 6px;
        position: absolute;
        left: 2.5%;
        top: 10%;
        width: 46%;
        height: 44px;
        background-color: #fafafab3;
        border: red;
        padding: 0px;
    }

    .title_check {
        color: black;
        text-align: center;
        margin-top: 7%;
        font-size: 10px;
        font-weight: 600;

    }

    .check_in {

        border-radius: 6px;
        position: absolute;
        left: 52%;
        top: 10%;
        width: 46%;
        height: 44px;
        background-color: #f1e8e88c;
        border: red;
        padding: 0px;

    }

    #checking {
        text-align: center;
        margin-top: 24px;
        font-size: 10px;
        font-weight: 500;
    }

    .title_check_2 {
        color: black;
        text-align: center;
        margin-top: 14%;
        font-size: 10px;
        font-weight: 600;

    }

    /*fin responsive reservation*/
    .imagen {
        text-align: center;
    }

    .title_service {
        text-align: center;
    }

    .img_services[data-v-1a0a9a71] {
        width: 95%;
        margin: 10px;

    }

    p {
        position: absolute;
        /* position: fixed; */
        color: black;
        font-size: 151px;
        margin: 3.5%;
        margin-top: -15%;
    }

    .main {
        max-width: 1528px;
        margin-top: -5px;
        padding: 9px;
    }

    .baner img {
        width: 100%;
        height: 70px;
        margin-top: 15%;
    }

    .content-card-2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 3%;
        padding: 17px;
    }

    .button_badge {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 9px;
        margin-top: 76px;
        width: 100%;
        height: 60px;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 3px
    }

    .pedido {
        display: none;
    }

    .bt_top {
        background-color: #c4a650;
        width: 44%;
        height: 32px;
        margin: 5px;
        margin-top: 2%;
        font-size: 11px;

    }

    .buton {
        position: absolute;
        left: 12%;
        top: 88%;
    }

    .bt_1 {
        border-radius: 5px;
        background-color: black;
        margin: 9px;
        width: 135px;
    }

    .bt_2 {
        width: 84px;
    }

    .btt_1 {
        background-color: #c7c1c1a6;
        color: black;
    }

    .bt_left {
        position: relative;
        top: -15px;
        left: 23%;
        border-radius: 10px;
        background-color: red;
        color: white;
        width: 19%;
        height: 19px;
        padding: 5px;
    }

    .b-form-spinbutton.d-inline-flex:not(.flex-column) {
        width: 54%;
        height: 24px;
    }

    .text[data-v-514aa278] {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 7px;
        margin-top: 21px;
    }

    p {
        margin-top: -7px;
        margin-bottom: 1rem;
    }

    .page-item.active .page-link {
        z-index: 3;
        color: #fff;
        background-color: #c4a650;
        border-color: #c4a650;
    }

    .card {
        width: 100%;
        height: auto;
        transform: translateY(-22%);
        border-radius: none !important;
        padding-bottom: 10%;

    }

    .card img {
        border-radius: unset;
        height: 250px;
    }

    .costo[data-v-514aa278] {
        font-size: 20px;
        margin-top: 5%;
        color: #695417;
        margin-left: -20%;
    }
}

/* Smartphones (landscape) */
@media only screen and (min-width : 321px) {}

/* Smartphones (portrait) */
@media only screen and (max-width : 750px) {
    .buton {
        position: absolute;
        left: 12%;
        top: 88%;
    }
}

/* iPads (portrait & landscape) */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
    .content-card-2 {
        width: 99%;
        transform: translateY(-7%);
    }

    .pedido {
        margin-top: 27px;
        margin-bottom: 1rem;
        font-size: 14px;
        text-align: center;
        -webkit-transform: translate(-89px);
        transform: translate(-6px, 1px);
        text-transform: uppercase;
        line-height: 23px;
    }

    .button_badge {
        width: 88%;
    }

    .btt_1[data-v-514aa278] {
        background-color: #c7c1c1a6;
        color: black;
    }

    .bt_top {
        background-color: #c4a650;
        border: #c4a650;
        width: 40%;
        margin-top: 3%;
    }

    .bt_left {
        position: relative;
        top: -15px;
        left: 29%;
        border-radius: 10px;
        background-color: red;
        color: white;
        width: 12%;
    }

}

/* iPads (landscape) */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {

    .main {
        width: 89%;
    }

    .bt_top {
        background-color: #c4a650;
        border: #c4a650;
        width: 40%;
        margin-top: 5%;
    }

}

/* iPads (portrait) */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {

    .bt_top {
        background-color: #c4a650;
        border: #c4a650;
        width: 40%;
        margin-top: 3%;
    }
}

/* Ordenadores de sobremesa y portátiles */
@media only screen and (min-width : 1224px) {}

/* Pantallas grandes */
@media only screen and (min-width : 1824px) {}

/* iPhone 4 */
@media only screen and (-webkit-min-device-pixel-ratio : 1.5),
only screen and (min-device-pixel-ratio : 1.5) {}
</style>
