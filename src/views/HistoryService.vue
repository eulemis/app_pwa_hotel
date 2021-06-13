<template>
<div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">
    </loading>
    <div class="mt-5 baner">
        
        <img class="img-fluid baner_principal" v-lazy="imgObj"/>  
    </div>

    <main>
 

        <h2 class="title">{{$t('history_services')}}</h2>
        <div class="row">
            <b-table class="resumeTable" hover :items="getSelectedFood" :fields="fields">

                <template v-slot:cell(food)="data">
                    {{ data.item.food }}
                </template>
                <template v-slot:cell(price)="data"> {{ data.item.price }} $ </template>
                <template v-slot:cell()="data">
                    {{ data.item.price * data.item.quantity }} $
                </template>
                <template v-slot:cell()="data">
                    {{ data.item.price * data.item.quantity }} $
                </template>
                <template v-slot:cell(action)="data">
                    <b-button size="sm" class="btn-trash" @click="deleteSelection(data.item.id)">
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>

                </template>
            </b-table>
        </div>
    </main>

    <!--    <camera-component @newPicture="getPicture"></camera-component>  -->

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
            rows: 10,
            currentPage: 3,
            customStyles,
            isLoading: false,
            fullPage: true,
            value: 0,
            total: '',
            fields: [{
                    key: "food",
                    label: "Date",
                },
                {
                    key: "price",
                    label: "Service area",
                },
                {
                    label: "Status",
                },
                {
                    key: "action",
                    label: "Action",
                },
            ],
            imgObj: {
                src: './img/Banner_detail.png',
                error: 'https://picsum.photos/200/300.webp',
                loading: './img/loading.gif'
            },
        };

    },
    components: {
        Loading

    },

    computed: {
        ...mapState(['token', 'typefood', 'reservation']),
    },

    mounted() {

    },
    methods: {
   
        getPicture(pic) {}
    }

};
</script>

<style scoped>
main {
    max-width: 1528px;
    padding: -11px;
    border-radius: 10px;
    margin: auto;
    margin-top: -5px;
    text-align: center;
}

.img_services {
    width: 70%;
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
    font-size: 36px;
    font-weight: 700;
}

p {
    position: absolute;
    color: #f8f9fa;
    font-size: 151px;
    margin: 8%;
    margin-top: -16%;
}

/* Smartphones (portrait & landscape) */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .imagen {
        text-align: center;
    }

    .title_service {
        text-align: center;
    }

    .img_services[data-v-1a0a9a71] {
        width: 95%;
        margin: 6px;
    }

    p {
        position: absolute;
        /* position: fixed; */
        color: #f8f9fa;
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

    /*.baner_principal{
    display: none;
}*/

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
