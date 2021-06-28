<template>
  <div class="listar_desayuno">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    >
    </loading>
    <div class="baner">
      <img
        v-if="foodID == 1"
        class="img-fluid baner_principal"
        src="@/assets/desayunos.jpg"
        alt=""
      />

      <img
        v-else
        class="img-fluid baner_principal"
        src="@/assets/almuerzo.jpg"
        alt=""
      />
      <b-container>
        <div class="button_badge">
          <p class="pedido">
            {{ $t("place") }}<br />
            {{ $t("order") }}
          </p>
          <button
            class="bt_top btt_1"
            @click="showModal(0)"
            :disabled="!getSelectedFood.length > 0"
          >
            {{ $t("see_order") }}
            <b-badge class="bt_left" variant="light">{{
              getSelectedFood.length
            }}</b-badge>
          </button>
          <button
            class="bt_top"
            :disabled="!getSelectedFood.length > 0"
            @click="showModal(1)"
          >
            {{ $t("confirm_order") }}
          </button>
        </div>
      </b-container>
    </div>
    <main>
      <b-container fluid style="margin-top: -100px">
        <b-row v-if="this.foodID == 1">
          <b-col
            v-for="(food, index) in desayunoCategories"
            :key="index"
            cols="12"
          >
            <h2 v-show="titlefood" class="">{{ food.title }}</h2>
            <v-row>
              <v-col
                v-for="(food, i) in food.items"
                :key="i"
                cols="12"
                md="4"
                lg="3"
              >
                <b-card
                  :title="food.food"
                  img-top
                  tag="article"
                  class="mb-2 ppal_card"
                >
                  
                  <b-card-text class="description-read-more" style="text-align: justify">
                      
                      <ReadMore v-if="contarChart(food.description) >= 50" more-str="Leer Más..." :text="food.description" link="#" less-str="Leer Menos..." :max-chars="50"></ReadMore>
                      
                      <p v-else>{{ food.description }}</p>
                      
                  </b-card-text>
                  <div class="text">
                    <div style="line-height: 150%">
                      <p class="title_food">{{ $t("cost") }}</p>
                      <p class="costo">${{ food.price }}</p>
                    </div>

                    <div class="cantidad">
                      <label for="sb-inline" class="title_food"
                        >{{ $t("quantity") }}
                      </label>
                      <div class="contador">
                        <b-button
                          class="count"
                          pill
                          variant="outline-primary"
                          @click="decrementItemFood(food.id)"
                          >-</b-button
                        >
                        <p class="cant">
                          {{ getQuantity(food.id) }}
                        </p>
                        <b-button
                          class="count"
                          variant="outline-primary"
                          @click="incrementItemFood(food.id)"
                          >+</b-button
                        >
                      </div>
                    </div>
                <!--     <div>
                      <p class="title_food">Total:</p>
                      <p class="costo">
                        $ {{ getQuantity(food.id) * food.price }}
                      </p>
                    </div> -->
                  </div>
                  <div class="text-center">
                    <b-button
                      :disabled="!getQuantity(food.id) > 0 ? true : false"
                      @click="addComment(food)"
                      class="bt_1"
                      size="sm"
                      >{{ $t("comment") }}
                    </b-button>
                  </div>
                </b-card>
              </v-col>
            </v-row>
          </b-col>
        </b-row>

        <b-row v-if="this.foodID == 2">
          <b-col
            v-for="(food, index) in almuerzosCategories"
            :key="index"
            cols="12"
          >
            <h2 v-show="titlefood" class="" v-if="food.title == 'Menu Infantil'" >Menú Infantil</h2>
            <h2 v-show="titlefood" class="" v-else >{{ food.title }}</h2>
            <v-row>
              <v-col
                v-for="(food, i) in food.items"
                :key="i"
                cols="12"
                md="4"
                lg="3"
              >
                <b-card
                  :title="food.food"
                  img-top
                  tag="article"
                  class="mb-2 ppal_card"
                >
                  <b-card-text class="description-read-more" style="text-align: justify">
                      
                      <ReadMore v-if="contarChart(food.description) >= 50" more-str="Leer Más..." :text="food.description" link="#" less-str="Leer Menos..." :max-chars="50"></ReadMore>
                      
                      <p v-else>{{ food.description }}</p>
                      
                  </b-card-text>
                  <div class="text">
                    <div style="line-height: 150%">
                      <p class="title_food">{{ $t("cost") }}</p>
                      <p class="costo">${{ food.price }}</p>
                    </div>

                    <div class="cantidad">
                      <label for="sb-inline" class="title_food"
                        >{{ $t("quantity") }}
                      </label>
                      <div class="contador">
                        <b-button
                          class="count"
                          pill
                          variant="outline-primary"
                          @click="decrementItemFood(food.id)"
                          >-</b-button
                        >
                        <p class="cant">
                          {{ getQuantity(food.id) }}
                        </p>
                        <b-button
                          class="count"
                          variant="outline-primary"
                          @click="incrementItemFood(food.id)"
                          >+</b-button
                        >
                      </div>
                    </div>
                    <div>
                      <p class="title_food">Total:</p>
                      <p class="costo">
                        $ {{ getQuantity(food.id) * food.price }}
                      </p>
                    </div>
                  </div>
                  <div class="text-center">
                    <b-button
                      :disabled="!getQuantity(food.id) > 0 ? true : false"
                      @click="addComment(food)"
                      class="bt_1 text-center"
                      size="sm"
                      >{{ $t("comment") }}
                    </b-button>
                  </div>
                </b-card>
              </v-col>
            </v-row>
          </b-col>
        </b-row>
      </b-container>

      <b-modal class="commentModal" ref="commentModal" hide-footer>
        <h5
          style="
            text-align: center;
            color: #94700a;
            text-transform: uppercase;
            font-family: 'FonstFree';
          "
        >
          {{ $t("comment_order") }}
        </h5>
        <br />
        <b-form-textarea
          id="commentFood"
          v-model="temporalComment"
          rows="3"
          max-rows="4"
        ></b-form-textarea>
        <div class="mt-5 buttonsFooter">
          <b-button class="btn-modal" @click="setComment()">{{
            $t("acept")
          }}</b-button>
        </div>
      </b-modal>
      <b-modal class="notfood" ref="notfood" hide-footer hide-header>
        <h5
          style="text-align: center; color: #94700a; text-transform: uppercase"
        >
          Notificación
        </h5>
        <br />
        <div class="mt-3">
          <p
            style="
              text-align: center;
              color: #94700a;
              text-transform: uppercase;
            "
          >
            No contamos con disponibilidad
          </p>
        </div>
        <div class="mt-5 buttonsFooter">
          <b-button class="btn-modal" @click="back()">{{
            $t("acept")
          }}</b-button>
        </div>
      </b-modal>
    </main>

    <b-modal class="orderModal" ref="orderModal" hide-footer hide-header>
      <div class="d-block text-center">
        <h3 class="m_title" v-if="this.valor == 1">{{ $t("detail_order") }}</h3>
        <h3 class="m_title" v-else>{{ $t("see_order") }}</h3>
      </div>
      <b-table
        class="resumeTable"
        hover
        striped
        responsive
        :items="getSelectedFood"
        :fields="fields"
      >
        <template v-if="getSelectedFood.length > 0" v-slot:custom-foot="data">
          <tr>
            <td style="font-weight: bold"></td>
            <td style="text-align: left; font-weight: bold">Total =</td>
            <td style="text-align: inherit; font-weight: bold" class="totalP">
              ${{ totalItems }}
            </td>
          </tr>
        </template>
        <template v-slot:cell(food)="data">
          {{ data.item.food }}
        </template>
        <template v-slot:cell(quantity)="data">
          {{ data.item.quantity }}
        </template>
        <template v-slot:cell(price)="data"> $ {{ data.item.price }} </template>
        <template v-slot:cell()="data">
          $ {{ data.item.price * data.item.quantity }}
        </template>
        <template v-slot:cell()="data">
          $ {{ data.item.price * data.item.quantity }}
        </template>
        <template  v-slot:cell()="data">
           {{ data.item.comment}}
        </template>
        <template v-slot:cell(action)="data">
          <b-button
            size="sm"
            class="btn-trash"
            @click="deleteSelection(data.item.id)"
          >
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
      <div v-if="this.valor == 1" class="buttonsFooter">
        <b-button class="btn-modal" @click="hideModal">{{
          $t("return")
        }}</b-button>
        <b-button
          class="btn-modal"
          @click="confirmOrder(getSelectedFood, totalItems)"
          >{{ $t("confirm_order") }}</b-button
        >
      </div>
      <div v-else class="buttonsFooter">
        <b-button class="btn-modal" @click="hideModal">{{
          $t("return")
        }}</b-button>
      </div>
    </b-modal>
    <b-modal class="confirmedModal" ref="confirmedModal" size="lg" hide-footer hide-header>
      <h5 class="text-center">{{ $t("buy_order") }}</h5>
      <div>
        <!-- <b-img center src="@/assets/check_order.png" alt="Center image"></b-img> -->
      </div>
      <h5 class="text-center">{{ $t("order_in_room") }}</h5>
      <div class="buttonsFooter">
        <!--b-button class="btn-modal" @click="hideConfirmedModal">{{
          $t("new_order")
        }}</b-button-->
        <b-button class="btn-modal" @click="continueConfirmedModal">{{
          $t("continue")
        }}</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import Paginador from "@/components/Paginador.vue";
import ReadMore from "@/components/ReadMore.vue";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapState, mapMutations, mapGetters } from "vuex";

const customStyles = {
  ul: {
    border: "2px solid red",
  },
  li: {
    display: "inline-block",
    border: "2px dotted green",
  },
  a: {
    color: "blue",
  },
};

export default {
  name: "listarDesayunos",
 
  data() {
    return {
      more: false,
      imgObj: {
        src: "https://picsum.photos/id/237/200/300",
        error: "https://picsum.photos/200/300.webp",
        loading: "./img/loading.gif",
      },
      temporalCommentFoodId: null,
      temporalComment: null,
      show: false,
      customStyles,
      isLoading: false,
      fullPage: true,
      value: 0,
      total: "",
      open: false,
      id: "",
      contador: 0,
      valor: 0,
      serviceWorkerRegistation: null,
      fields: [
        {
          key: "food",
          label: "Menú",
        },
        {
          key: "quantity",
          label: "Cantidad",
        },
        {
          key: "price",
          label: "Valor",
        },
           {
          label: "Comentario",
         
        },
        {
          label: "Total",
        },
        {
          key: "action",
          label: "",
        },
      ],
      dataorder: [],
      foodID: null,
      loadingButton: false,
      
      desayunoCategories: [
        { title: "Desayunos", items: [] },
        { title: "Especialidades", items: [] },
        { title: "Bebidas", items: [] },
      ],
      /* {en tipo de comida almuerzo y cena( Principal, entradas, contornos, bebidas y postres)} */
      almuerzosCategories: [
        { title: "Entradas", items: [] },
        { title: "Ensaladas y Sopas", items: [] },
        { title: "Pastas", items: [] },
        { title: "Carnes y Aves", items: [] },
        { title: "Sandwiches y Hamburguesas", items: [] },
        { title: "Menu Infantil", items: [] },
        { title: "Postres", items: [] },
        { title: "Bebidas", items: [] }, 
      ],
      titlefood:false,
    };
  },
  components: {
    Loading,
    Paginador,
    ReadMore
  },
  beforeDestroy() {
    this.deleteData();
  },
  created() {},
  mounted() {
    /*   console.log("aqui");
    const filterdesayunoType = this.getFoodItems.filter(
      (food) => food.type_food == "desayuno"
    );

    console.log(filterdesayunoType); */
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    if (this.$route.params.id) {
      this.foodID = this.$route.params.id;
      /*  this.goToPage(); */
      this.setCategories();
      this.scroll();
    }
  },
  computed: {
    totalItems() {
      let totalPrice = this.getSelectedFood.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);
      return totalPrice;
    },
    confirmar() {
      return this.$store.getters.getSelectedFood = [];
    },
    paginationRows() {
      return 50;
    },
    paginationPerPage() {
      return 4;
    },
    buttonsEnabled() {
      return false;
    },
    ...mapState(["token", "reservation"]),
  },
  methods: {
    contarChart(text){
      //let lengthText = 96;
      let texto = new String(text);

      return texto.length;
      /*let newStr = '';
      let removedStr = '';

      if(texto.length > lengthText ){
        newStr = texto.substring(0, lengthText);
        removedStr = texto.substring(lengthText, texto.length);
        this.more = true;
        this.corto  = true;
        this.complet = false;

        return newStr;
      }
      
        
        this.corto  = false;
        this.complet = true;
        return text;*/
    },
    readMore(idFood){
     
      if (this.getFoodItems.length > 0) {
        
        let index = this.getFoodItems.findIndex(({ id }) => id == idFood);

        console.log(idFood, this.getFoodItems.length, index, this.getFoodItems[index], this.getFoodItems[index].description)
        
        this.corto = !this.corto;  
      /* if(this.corto){

      this.corto = false;
      this.complet = true;

      }else{

        this.corto = true;
        this.complet = false;
      } */

      }
     
      
    },
    habilitarNotificaciones() {
      this.activarNotificaciones().then((sub) => {
        //console.log("valor de sub: "+ sub)
        this.$refs["my-modal"].hide();
      });
    },
    cerrarModal() {
      this.$refs["my-modal"].hide();
    },
    scroll() {
      window.onscroll = () => {
        let scrollTop = document.documentElement.scrollTop;
        let innerHeight = window.innerHeight;
        let offsetHeight = document.documentElement.offsetHeight;
        let bottomOfWindow = scrollTop + innerHeight >= offsetHeight - 5;

        if (bottomOfWindow) {
          let { current_page, last_page } = this.getPagination,
            nextPage = current_page + 1;
          if (nextPage <= last_page && nextPage != current_page) {
            this.goToPage(nextPage);
          }
        }
      };
    },
    setCategories() {
      if (this.foodID == 1) {
        this.isLoading = true;
        this.getCagegoryFood({
          food: this.foodID,
          category: "desayuno",
        }).then((response) => {
          this.desayunoCategories = this.desayunoCategories.map((item) => {
            if (item.title == "Desayunos") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "bebidas",
        }).then((response) => {
          this.desayunoCategories = this.desayunoCategories.map((item) => {
            if (item.title == "Bebidas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.titlefood = true;
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "especialidades",
        }).then((response) => {
          this.desayunoCategories = this.desayunoCategories.map((item) => {
            if (item.title == "Especialidades") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.titlefood = true;
          this.isLoading = false;
        });
      }
      if (this.foodID == 2) {
        this.isLoading = true;
        this.getCagegoryFood({
          food: this.foodID,
          category: "pastas",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Pastas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "carnes",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Carnes y Aves") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "entradas",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Entradas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "ebidas",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Bebidas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "postres",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Postres") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.titlefood = true;
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "ensaladas",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Ensaladas y Sopas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "infantil",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Menu Infantil") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
        this.getCagegoryFood({
          food: this.foodID,
          category: "sandwiches",
        }).then((response) => {
          this.almuerzosCategories = this.almuerzosCategories.map((item) => {
            if (item.title == "Sandwiches y Hamburguesas") {
              let items = response.map((e) => ({
                ...e,
                quantity: 0,
                comment: "",
                user_id: this.user_id,
              }));
              return {
                ...item,
                items,
              };
            }
            return item;
          });
          this.isLoading = false;
        });
      }
    },
    getQuantity(idFood) {
      if (this.getFoodItems.length > 0) {
        let index = this.getFoodItems.findIndex(({ id }) => id == idFood);
        return this.getFoodItems[index].quantity
          ? this.getFoodItems[index].quantity
          : 0;
      }
      return 0;
    },
    goToPage(page = 1) {
      this.isLoading = true;
      this.loadingButton = true;
      this.getComidas({
        food: this.foodID,
        page: page,
      }).then((response) => {
        if (response.data.length <= 0) {
          this.getFoodItems = "";
          // this.back()
          this.$refs["notfood"].show();
        }
        this.loadingButton = false;
        this.isLoading = false;
      });
    },
    addComment({ id }) {
      this.temporalCommentFoodId = id;
      /*  this.temporalComment = comment;*/
      this.$refs["commentModal"].show();
    },
    setComment() {
      this.setFoodComment([this.temporalCommentFoodId, this.temporalComment]);
      this.temporalCommentFoodId = null;
      this.temporalComment = null;
      this.hideModalComment();
    },
    nextPageFood(page) {},
    showModal(value) {
      this.valor = value;
      this.$refs["orderModal"].show();
    },
    hideModalComment() {
      this.$refs["commentModal"].hide();
    },
    hideModal() {
      this.$refs["orderModal"].hide();
    },
    confirmOrder(getSelectedFood, totalItems) {
      this.isLoading = true;
      this.$store
        .dispatch("saveOrder", {
          data: getSelectedFood,
          token: this.token,
          user_id: this.user_id,
          reservation_id: this.reservation.id,
          totalprice: this.totalItems,
        })
        .then((response) => {
          if (response.status == 200) {
            this.isLoading = false;
           
            this.hideModal();
            this.showConfirmedModal();
            this.getSelectedFood.splice(0, this.getSelectedFood.length)
            this.getSelectedFood = this.getSelectedFood;
            this.getFoodItems.splice(0,   this.getFoodItems.length)
            this.getFoodItems =   this.getFoodItems
          
          }
        })

        .catch((error) => {
          if (error.status === 401) {
            this.$route.push({ name: "Login" });
          }
          this.$toast.error("Error al Procesar la Orden.", {
            position: "top",
          });
          this.error = this.isLoading = false;
        });
    },
    showConfirmedModal() {
      this.$refs["confirmedModal"].show();
    },
    hideConfirmedModal() {
      this.$refs["confirmedModal"].hide();
    },
    continueConfirmedModal() {
      this.hideConfirmedModal();
      this.back();
    },
    back: function () {
      this.$router.go(-1);
    },
    deleteSelection(itemId) {
      this.resetItemSelection(itemId);
      if (!this.getSelectedFood.length > 0) {
        this.hideModal();
      }
    },
  },
};
</script>



<style scoped>
.img-fluid {
    width: 100%;
    height: auto;
}
.modal-header {
  border-bottom: 0px solid #dee2e6;
}

.modal-body {
  margin-top: -18px;
}

.ppal_card {
  background-image: url("~@/assets/Background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.m_title {
  font-family: "HelveticaBold";

  text-transform: uppercase;
}

.title_card {
  font-weight: bold;
  font-family: "FonstFree";
  text-transform: uppercase;
}

.title_food {
  font-weight: bold;
  font-family: "FonstFree";
  text-transform: uppercase;
}

.confirmedModal,
.orderModal,
.notfood,
.commentModal {
  font-family: "FonstFree";
}

textarea::placeholder {
  font-family: "FonstFree";
  text-transform: uppercase;
  font-size: 12px;
}

.shadow-card {
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
.btn-trash {
  /*   margin: 0px !important; */
  margin-top: -6px;
  background-color: #94700a;
}
.resumeTable {
  border-spacing: 2px;
  font-family: "FonstFree";
  text-transform: uppercase;
  font-size: 80%;
}
.resumeTable th {
  text-align: center;
  border-top: none !important;
}
.resumeTable th:first-child {
  text-align: left;
}
.resumeTable td {
  text-align: center;
  border-top: 2px solid #94700a;
  width: 10px;
}
.resumeTable td:first-child {
  text-align: left;
  border-top: 2px solid #94700a;
}
.resumeTable tr:first-child td {
  border-top: none !important;
}
.resumeTable thead th {
  vertical-align: bottom;
  border-bottom: none !important;
}
.buttonsFooter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.btn-modal {
  border: 1px solid #94700a;
  background-color: #94700a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  min-width: 142px;
  color: white;
  font-family: "FonstFree";
  text-transform: uppercase;
  font-size: 80%;
}
.btn-danger {
  color: #fff;
  background-color: #94700a;
  border-color: #94700a;
  margin-left: 9px;
}

.btn-sm,
.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.885rem;
  line-height: 1.5;
  border-radius: 1.2rem;
  font-family: "FontsFree";
  font-weight: bold;
}
img.mx-auto.d-block {
  width: 100px;
}

main {
  max-width: 1528px;
  padding: -11px;
  border-radius: 10px;
  margin: auto;
  margin-top: -5px;
  font-family: "Helvetica";
}
.image_card {
  height: auto;
}

.bt_lg {
  position: absolute;
  left: 35%;
  bottom: 5%;
}

.bt_1 {
  border-radius: 5px;
  background-color: #585858;
  /* width: 120%; */
  /* margin-left: 224%; */
  color: white;
  /* margin-top: -138%; */
  /* height: 57px; */
  /*padding: 13px;*/
  /* border-radius: 15px 0px 0px 15px; */
  font-family: "FonstFree";
}

.bt_2 {
  display: none;
  border-radius: 5px;
  background-color: #94700a;
  width: 140px;
}

.btn-outline-primary {
  border-color: #967517;
  color: #967517;
  border-radius: 50px;
  margin: 10px;
}
.btn-outline-primary:hover {
  border-color: #967517;
  background-color: #967517;
  color: white;
  border-radius: 50px;
  margin: 10px;
}
.btn-outline-primary.active,
.btn-outline-primary:active,
.btn-outline-primary:active:focus,
.btn-outline-primary:active:hover,
.btn-outline-primary:focus,
.btn-outline-primary:hover {
  border-color: #967517;
  color: #fff;
  background-color: #967517;
}
.count {
  width: 33px;
  height: 32px;
  border-color: #967517;
  color: #967517;
  margin: 10px;
  padding: 2px;
}
.cant {
  margin-top: 16px;
}

.content-card-2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
}

h4 {
  text-align: center;
  /*    margin-top: 25%;*/
  background: #936d02;
  height: auto;
  padding: 17px;
  /*    border-radius: 0px 15px 15px 0px;*/
  color: white;
  font-size: 21px;
}

.text {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-around;
    margin-top: 10px;
}
.card-body {
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.45rem;

}

.cantidad {
  text-align: center;
  margin-bottom: 7px;
  margin-top: -4%;
}

.button_badge {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: flex-end;
  -webkit-transform: translateY(-100px);
  background: white;
  width: 70%;
  height: 95px;
  margin: auto;
  margin-top: 49px;
  padding-right: 32px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 3px;
}

.bt_top {
  background-color: #94700a;
  border: #4c3a05;
  width: 28%;
  height: 60px;
  margin: 5px;
  margin-top: 19px;
  color: white;
  font-family: "FonstFree";
  text-transform: uppercase;
}

.btt_1 {
  background-color: #c7c1c1a6;
  color: black;
}

.bt_left {
  width: 30px;
  height: 30px;
  text-align: center;
  background: #a17e13 none;
  border-radius: 50%;
  position: absolute;
  left: 64%;
  top: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: aliceblue;
}

.b-form-spinbutton.d-inline-flex:not(.flex-column) {
  width: 45%;
  height: 24px;
}

p {
  margin-top: -6px;
  margin-bottom: 1rem;
}

.description {
  padding: 10px;
  text-align: center !important;
  font-family: "FonstFree";
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #c4a650;
  border-color: #c4a650;
}

.pedido {
  margin-top: 17px;
  margin-bottom: 1rem;
  font-size: 25px;
  text-align: center;
  transform: translate(-89px);
  text-transform: uppercase;
  line-height: 33px;
  letter-spacing: 6px;
  font-family: "Helvetica";
}

#sb-inline {
  width: 95%;
}

.costo {
  font-size: 20px;
  margin-top: 5px;
  color: #967517;
  font-family: "Fonstfree";
  margin-left: 23%;
}

.contador {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn-outline-danger:hover {
  border-color: #ab8930;
  color: #ab8930;
}
.btn.btn-outline.red {
  border-color: #ab8930;
  color: #ab8930;
  background: 0 0;
}
.btn.btn-outline.red.active,
.btn.btn-outline.red:active,
.btn.btn-outline.red:active:focus,
.btn.btn-outline.red:active:hover,
.btn.btn-outline.red:focus,
.btn.btn-outline.red:hover {
  border-color: #ab8930;
  color: #fff;
  background-color: #ab8930;
}
.btn.btn-outline.red:hover {
  background: #ab8930;
  border-color: #ab8930;
}

.baner_principal {
  margin-top: 4%;
}

/* Smartphones (portrait & landscape) */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .main {
    max-width: 1528px;
    margin-top: -5px;
    padding: 9px;
  }
  .baner img {
    width: 100%;
  /*   height: 70px; */
    margin-top: 16%;
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
    align-items: center;
    padding: 9px;
    margin-top: 76px;
    width: 100%;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 3px;
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
    position: relative;
    left: 12%;
    top: 88%;
  }
  .bt_1 {
    border-radius: 5px;
    background-color: black;
    margin: 9px;
    height: 44px;
    margin-top: -5px; 
  }
  .bt_2 {
    display: none;
    width: 84px;
  }

  .btt_1 {
    background-color: #c7c1c1a6;
    color: black;
  }

  .bt_left {
    width: 25px;
    height: 25px;
    text-align: center;
    background: #94700a none;
    border-radius: 50%;
    position: absolute;
    left: 41%;
    top: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: aliceblue;
  }

  .b-form-spinbutton.d-inline-flex:not(.flex-column) {
    width: 54%;
    height: 24px;
  }
  .text {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    align-items:  ;
    margin: 7px;
    margin-top: 21px;
    font-family: "FonstFree";
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

  /* .card {
    width: 100%;
    height: auto;
    transform: translateY(-22%);
    border-radius: none !important;
    padding-bottom: 10%;
  } */
  .card img {
    border-radius: unset;
    height: 250px;
    font-family: "FonstFree";
  }

  .costo {
    font-size: 20px;
    color: #695417;
    font-family: "FonstFree";
    margin-left: 25%;
  }
  .total_price {
    color: #695417;
    font-size: 20px;
    margin-top: -16px;
    font-family: "FonstFree";
  }

  .table th,
  .table td {
    padding: 3px;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }

  .baner_principal {
    margin-top: 16%;
  }

  h4[data-v-514aa278] {
    text-align: center;
    /* margin-top: 4%; */
    background: #936d02;
    height: 57px;
    padding: 13px;
    /* border-radius: 0px 25px 25px 0px; */
    color: white;
    width: 100%;
  }
}

/* Smartphones (portrait) */
@media only screen and (max-width: 750px) {
  .buton {
    position: relative;
    margin-left: 7.8%;
  }
    .text{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-around;
        margin-top: 8%;
    }
    .pedido{
        display: none;
    }
    .bt_top{
    width: 43%;

    }

.bt_left{
        width: 30px;
    height: 30px;
    text-align: center;
    background: #a17e13 none;
    border-radius: 50%;
    position: absolute;
    left: 42%;
    top: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: aliceblue;
}
}
/* iPads (portrait & landscape) */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {

    .text{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: space-around;
        margin-top: 5%;
    }
  .content-card-2 {
    width: 99%;
    transform: translateY(-7%);
  }

  .pedido {
    margin-top: 27px;
    margin-bottom: 1rem;
    font-size: 13px;
    text-align: center;
    -webkit-transform: translate(-89px);
    transform: translate(1px, 1px);
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
    width: 30px;
    height: 30px;
    text-align: center;
    background: #94700a none;
    border-radius: 50%;
    position: absolute;
    left: 52.5%;
    top: 10%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: aliceblue;
  }
}

/* Ordenadores de sobremesa y portátiles */
@media only screen and (min-width: 1224px) {
}
/* Pantallas grandes */
@media only screen and (min-width: 1824px) {
}
/* iPhone 4 */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
}
.listar_desayuno{
  margin-bottom: 10%;
}
</style>

