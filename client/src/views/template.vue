<template>
  <div class="about">
    <br />
    <h2> Stock Management </h2>
    <v-btn id="createButton" outlined text @click="opencompleteTransfer">Complete Transfer</v-btn>
    <br /> <br />
    <!-- Row wrapping the entire app -->
    <v-row>
      <!-- Entire List of Stock On Hand -->
      <v-col cols="4" >
        <v-list
          three-line
          outlined
          shaped
          class="overflow-y-auto"
          max-height="90vh"
        >
          <v-subheader>
           <h3 justify="center"> <b> Stock List </b> </h3>
          </v-subheader>
          <draggable
            v-model="StockList"
            :group="group2"
            style="min-height: 10px"
            @change="items1Changed"
            :disabled="disabled"
          >
            <template v-for="stock in StockList">
              <v-list-item :key="stock.id" ripple>
                <v-list-item-icon>
                  <v-icon large color="green">{{ stock.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="stock.itemDescription"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="`${stock.itemCode}`" 
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="stock.mainCategory"
                  ></v-list-item-subtitle> 
                </v-list-item-content>
                 <v-list-item-content>
                   <v-list-item-title
                    v-html="stock.qtyOnHandLbl"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="stock.qtyOnHand"
                  ></v-list-item-subtitle>
                    </v-list-item-content>
              </v-list-item>
            </template>
          </draggable>
        </v-list>
      </v-col>
    </div>
</template>


<script>
import axios from "axios";
let url = process.env.VUE_APP_BASEURL;
import draggable from "vuedraggable";

export default {
  name: "StockTake",
  components: {
    draggable
  },
  metaInfo: {
    title: "About us",
    titleTemplate: "CPC - %s",
    meta: [
      {
        name: `description`,
        content: `About CPC here.`
      }
    ],
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },

  data() {
    return {
        qtyCounted: 0,
        StockList: []

    };
  },
  mounted() {
  },
  beforeDestroy() {
  },

  methods: { 
   getStockList() {
    this.StockList = [];     
      let data = {
        id: this.$store.state.development.id
      };
      await axios({
        method: "post",
        url: `${url}/getStockList`,
        data: data
      })
        .then(
          response => {
            response.data.forEach(el => {
                el.qtyOnHandLbl = "Qty On Hand";
                el.qtyToTrxLbl = "Qty To Transfer";
                el.qtyToTransfer = 0;
                this.StockList.push(el);                                              
            });
            //console.log("this.StockList = ", this.StockList)           
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
   },

  }

};
</script>