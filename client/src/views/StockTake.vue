<template>
  <div class="about">
    <br />
    <h2> Stock Take </h2>
     <v-btn id="createButton" outlined text @click="submitStockTake">Submit Stock Take</v-btn> 
    <br /> <br />
    <!-- Row wrapping the entire app -->
    <v-row>
      <!-- Entire List of Stock On Hand -->
      <v-col cols="12" >
        <v-list three-line outlined shaped class="overflow-y-auto" max-height="90vh">
          <v-subheader>
           <h3 justify="center"> <b> Stock List </b> </h3>
          </v-subheader>
          <draggable v-model="StockList"
            @change="stockListChanged"
            :group="group2"
            style="min-height: 10px"
            :disabled="disabled"
          >
            <template v-for="stockItem in StockList">
              <v-list-item :key="stockItem.id" ripple>
                <v-list-item-icon>
                  <v-icon large color="green">{{ stockItem.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="stockItem.itemDescription"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="`${stockItem.itemCode}`" 
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="stockItem.mainCategory"
                  ></v-list-item-subtitle> 
                </v-list-item-content>
                 <v-list-item-content>
                   <v-list-item-title
                    v-html="stockItem.qtyOnHandLbl"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="stockItem.qtyOnHand"
                  ></v-list-item-subtitle>
                    </v-list-item-content>
                    
                    <v-list-item-content>
                   <v-list-item-title
                    v-html="stockItem.qtyCountedLbl"
                  ></v-list-item-title>
                  <v-text-field
                      v-model="stockItem.qtyCounted"
                      type="number"
                      min="0"
                      class="shrink"
                      label=""                        
                    ></v-text-field>
                    </v-list-item-content>

                    <v-list-item-content>
                   <v-list-item-title
                    v-html="stockItem.CountCorrectLbl"
                  ></v-list-item-title>
                 <v-switch
                    v-model="stockItem.CountCorrect"
                    :label="stockItem.CountCorrect  ?  'Yes' : 'No'"
                    @change="changeSwitch"
                  ></v-switch>
                    </v-list-item-content>
              </v-list-item>
            </template>
          </draggable>
        </v-list>
      </v-col>
    </v-row>
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
        StockList: [],
        switch1 : false
    };
  },
  mounted() {
    this.getStockList()
  },
  beforeDestroy() {
  },

  methods: { 
   async getStockList() {
    this.StockList = [];     
      let data = {
        id: this.$store.state.development.id,
        
      }
       await axios({
        method: "post",
        url: `${url}/getStockList`,
        data: data
      })
        .then(
          response => {
            response.data.forEach(stockItem => {
                stockItem.qtyOnHandLbl  = "Qty On Hand";
                stockItem.qtyCountedLbl = "Qty Counted";
                stockItem.CountCorrect   = ""
                stockItem.CountCorrectLbl = "Count Correct?"
                stockItem.qtyCounted    = 0;
                stockItem.CountCorrect = false;
                this.StockList.push(stockItem);                                              
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
   changeSwitch(evt) {
     console.log("evt",evt);
     this.StockList.forEach(stockItem => {
       //if()
       console.log("StockItem=", stockItem)
     })
   },
   async submitStockTake() {
    this.StockList = [];     
      let data = {
        id: this.$store.state.development.id,
        StockList: this.StockList,
        countCorrect: this.switch1
      }
       await axios({
        method: "post",
        url: `${url}/submitStockTake`,
        data: data
      })
        .then(
          response => {
            response.data.forEach(stockItem => {
                // stockItem.qtyOnHandLbl  = "Qty On Hand";
                // stockItem.qtyCountedLbl = "Qty Counted";
                // stockItem.qtyCounted    = 0;
                this.StockList.push(stockItem);                                              
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