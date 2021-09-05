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
      <!-- Current SubContractor & StockList in centre-->      
      <v-col cols="5" offset="0">
        <!-- Current SubContractor -->
        <v-row justify="center">
          <v-list 
            three-line 
            outlined 
            shaped
            class="overflow-y-auto"
            max-height="30vh">
            <v-subheader>
            <h3> <b> Selected Sub Contractor </b> </h3>
            </v-subheader>
            <draggable
              v-model="currentSubContractor"
              :group="group3"
              style="min-height: 10px"
              @change="currentContractorChanged"
            >
              <template v-for="item in currentSubContractor">
                <v-list-item :key="item.id" ripple>
                  <v-list-item-icon>
                    <v-icon large color="blue">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.supplierName"
                    ></v-list-item-title>
                   
                  </v-list-item-content>
                  <v-list-item-action>
                   <v-btn
                      icon
                      :id="item.id"
                      @click="deleteCurrentSubContractor"
                    >
                      <v-icon color="red">mdi-account-off</v-icon>
                         </v-btn>
                      
                  </v-list-item-action>
                </v-list-item>
              </template>
            </draggable>
          </v-list>
        </v-row>
        <br/><br/><br/>
        <!-- current StockList selected for Transfer -->
        <v-row justify="center">
          <v-list
            three-line outlined shaped
            class="overflow-y-auto"
            max-height="55vh"
          >
            <v-subheader>
             <h3> <b> Selected Stock Transfer List </b> </h3>  <v-btn
                        icon                                                
                        @click="clearCurrentStockList"
                        label="Clear Stock List ">
                        <v-icon color="red">mdi-close</v-icon>
                      </v-btn>       
            </v-subheader>
            <draggable
              v-model="currentStockList"
              :group="group2"
              style="min-height: 10px"
              @change="currentStockListChanged"
              :disabled="disabled"
            >
              <template v-for="stock in currentStockList">
                <v-list-item :key="stock.id" ripple>
                  <v-list-item-icon>
                    <v-icon large color="green">{{ stock.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="stock.itemCode"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="stock.mainCategory"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="stock.qtyToTrxLbl"
                    ></v-list-item-title>                    
                    <v-text-field
                      v-model="stock.qtyToTransfer"
                      type="number"
                      min="0"
                      class="shrink"
                      label=""                        
                    ></v-text-field>
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
        </v-row>
      </v-col>

      <!-- Sub Contractors List -->
      <v-col cols="3" offset="0">
        <v-list 
          three-line 
          outlined 
          shaped
          class="overflow-y-auto"
          max-height="90vh">
          <v-subheader>
            <h3> <b> Sub Contractors </b> </h3>
          </v-subheader>
          <draggable
            v-model="SubContractors"
            :group="group3"
            style="min-height: 10px"
            @change="currentContractorChanged"
          >
            <template v-for="item in SubContractors">
              <v-list-item :key="item.id" ripple>
                <v-list-item-icon>
                  <v-icon large color="blue">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.supplierName"
                  ></v-list-item-title>              
                </v-list-item-content>
              </v-list-item>
            </template>
          </draggable>
        </v-list>
      
      </v-col>
    </v-row>

    <!-- Stock Transfer Dialog -->
    <v-row justify="center">
      <v-dialog v-model="transferDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Stock Transfer</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>      
                <v-col cols="12">
                  <v-text-field
                    label="Sub Contractor"
                    required
                    v-model="selectedSubContractorName"
                    readonly
                    placeholder="Enter title of your request"                    
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="block"
                      type="text"                      
                      class="shrink"
                      label="Block"                      
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="unit"
                    type="text"                    
                    class="shrink"
                    label="Unit"                    
                  ></v-text-field>                  
                </v-col>              
                <v-col cols="12">
                  <v-file-input
                    v-model="stockTransferImage"
                    label="Upload Image"
                    accept="image/png, image/jpeg, image/bmp, image/jpg"
                    filled
                    hint="Upload Image"
                    persistent-hint
                    @change="uploadImage()"              
                  ></v-file-input>       
                </v-col> 
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeView" v-if="openTransferDialog">
              Close
            </v-btn>          
            <v-btn color="blue darken-1" text @click="completeTransfer" v-if="openTransferDialog">
              Save
              <v-icon
               
              >
              $steam
               
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Task Details-->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Task Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-if="!viewOnly"
                    label="User*"
                    v-model="userName"
                    required
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Title*"
                    required
                    v-model="title"
                    placeholder="Enter title of your request"
                    :readonly="viewOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Text*"
                    type="password"
                    required
                    v-model="text"
                    placeholder="Place description / explanation here"
                    :readonly="viewOnly"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Time Estimate"
                    required
                    v-model="estimate"
                    placeholder="Estimate of Time"
                    v-if="(userName = 'Wayne Bruton' || viewOnly)"
                    :readonly="viewOnly"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeView">
              Close``
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saveTask"
              v-if="!viewOnly"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Edit Task -->
    <v-row justify="center">
      <v-dialog v-model="dialog1" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-if="!viewOnly"
                    label="User*"
                    v-model="userName"
                    required
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Title*"
                    required
                    v-model="title"
                    placeholder="Enter title of your request"
                    :readonly="viewOnly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Text*"
                    type="password"
                    required
                    v-model="text"
                    placeholder="Place description / explanation here"
                    :readonly="viewOnly"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Time Estimate"
                    required
                    v-model="estimate"
                    placeholder="Estimate of Time"
                    v-if="(userName = 'Wayne Bruton' || viewOnly)"
                    :readonly="viewOnly"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog1 = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saveEditTask"
              v-if="!viewOnly"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
let url = process.env.VUE_APP_BASEURL;
import draggable from "vuedraggable";
export default {
  name: "StockTrx",
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
      dialog: false,
      dialog1: false,
      
      userName: this.$store.state.userName,
      editId: 0,
      title: "",
      estimate: "TBA",
      text: "",
      viewOnly: false,
      group1: "group",
      group2: "group",
      group3: "group",
      group4: "group",
      disabled: true,
      group: {
        group: "people"
      },
      items: [],
      items1: [],
      items2: [],
      items3: [],

      // left hand side Properties
      StockList: [],
      StockMainCateg: [],
      StockSubCateg: [],
      // right hand side Properties
      SubContractors: [],

      // Centre Column Properties
      currentSubContractor: [],
      currentStockList: [],

      selectedSubContractorName: "",

      // Transfer Dialog Properties
      openTransferDialog: false, // used like viewOnly
      transferDialog: false,
      itemCode: "",
      unit: "",
      block: "",
      qtyToTransfer: 0,
      stockTransferImage: null
    };
  },
  beforeDestroy() {
    this.updateTasks();
  },
  mounted() {
    this.getTasks();
    // crm
    this.getStockList();

    this.getSubContractors();

    if (
      this.$store.state.userName === "Wayne Bruton" ||
      this.$store.state.userName === "Wynand Haywood" ||
      this.$store.state.userName === "Dirk Coetzee" ||
      this.$store.state.userName === "Connor McLean"
    ) {
      this.disabled = false;
    }
    if (this.$store.state.userName === "Wayne Bruton" ||
        this.$store.state.userName === "Connor McLean") {
      this.group1 = "group";
      this.group2 = "group";
      this.group3 = "group";
      this.group4 = "group";
    } else {
      this.group1 = "group1";
      this.group2 = "group2";
      this.group3 = "group3";
      this.group4 = "group4";
    }
  },  

  methods: {
    // crm
    async getStockList() {
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
    // crm
    async getSubContractors() {
      this.SubContractors = [];    
      let data = {
        id: this.$store.state.development
      };
      await axios({
        method: "post",
        url: `${url}/getSubContractors`,
        data: data
      })
        .then(
          response => {
            response.data.forEach(el => {
              this.SubContractors.push(el);                            
            });
            //console.log("this.SubContractors = ", this.SubContractors);
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    opencompleteTransfer() {
       this.openTransferDialog = true;
       this.transferDialog = true;       
    },
    completeTransfer() {
      console.log("CompleteTransfers get StockList and SupplierID")
      this.completeTransfers();
    },
    async completeTransfers() {
      // take all the stock in the currentStockList and update the status in StockTranfers table from busy to complete, or mismatch, ? 
      let insert = {
        development: this.$store.state.development.id,
        subContractor: this.currentSubContractor,
        supplierName: this.currentSubContractor.supplierName,
        contactId: this.currentSubContractor.contactId,

        stockList: this.currentStockList,
        unit: this.unit,
        block: this.block,
        qtyToTransfer: this.qty  
      };
      await axios({
        method: "post",
        url: `${url}/completeTransfers`,
        data: insert
      })
        .then(
          () => {
            this.refreshData()            
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },

    currentContractorChanged(theEvent) {      
      if(theEvent.added) { 
        if(this.currentSubContractor.length === 2) {
          this.clearCurrentSubContractor();
          alert("You may only have 1 Sub Contractor selected at a time");
        }
        this.currentSubContractor.forEach(subContractor => {
          console.log("SubContractor: ", subContractor)
          this.selectedSubContractorName = subContractor.supplierName;
          console.log("this.selectedSubContractorName = " , this.selectedSubContractorName)
        })
      }
    },
    currentStockListChanged(theEvent) {
      if(theEvent.added) {        
        this.StockList.forEach(el => {
          if (el.stockId === theEvent.added.element.stockId) {
            el.qtyToTransfer = this.qtyToTransfer;                
          }
        })
      }
    },
    
    uploadImage(event) {
      // upload the image 

      if (event.added) {
        this.items.forEach(el => {
          if (el.id === event.added.element.id) {
            el.icon = "mdi-progress-wrench";
            el.typeTask = "WIP";
          }
        });
      }
    }, 
    async deleteCurrentSubContractor() {
      this.clearCurrentSubContractor();
    },
    //clear the array of currentSubContractor for the new one
    clearCurrentSubContractor() {  
      this.currentSubContractor.splice(0, this.currentSubContractor.length)
    },
    clearCurrentStockList() {
      this.currentStockList.splice(0, this.currentStockList.length)      
    }, 
    closeView() {
      this.dialog = false;
      this.transferDialog = false;
      this.openTransferDialog = false;
      this.viewOnly = false;
    },
    refreshData() {
      this.clearCurrentSubContractor();
      this.clearCurrentStockList();
      this.closeView();
      alert("Successfully completed Stock Transfer");
    },
    

    // From the TaskList.vue
    async getTasks() {
      this.items = [];
      this.items1 = [];
      this.items2 = [];
      this.items3 = [];
      let data = {
        id: this.$store.state.development.id
      };
      await axios({
        method: "post",
        url: `${url}/getTaskList`,
        data: data
      })
        .then(
          response => {
            response.data.forEach(el => {
              if (el.typeTask === "WIP") {
                this.items.push(el);
              } else if (el.typeTask === "Suggested") {
                this.items1.push(el);
              } else if (el.typeTask === "Completed") {
                this.items2.push(el);
              } else if (el.typeTask === "Finalised") {
                this.items3.push(el);
              }
            });
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    async updateTasks() {
      let dataToUpdate = [];
      this.items.forEach((el, index) => {
        el.sortIndex = index;
        dataToUpdate.push(el);
      });
      this.items1.forEach((el, index) => {
        el.sortIndex = index;
        dataToUpdate.push(el);
      });
      this.items2.forEach((el, index) => {
        el.sortIndex = index;
        dataToUpdate.push(el);
      });
      this.items3.forEach((el, index) => {
        el.sortIndex = index;
        dataToUpdate.push(el);
      });

      let data = {
        info: dataToUpdate
      };
      await axios({
        method: "post",
        url: `${url}/updateTaskList`,
        data: data
      })
        .then(
          () => {},
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    createTask() {
      this.text = "";
      (this.title = ""), (this.estimate = "TBA");
      this.dialog = true;
    },
    async saveTask() {
      let insert = {
        development: this.$store.state.development.id,
        taskText: this.text,
        taskTitle: this.title,
        userName: this.userName,
        icon: "mdi-thought-bubble",
        typeTask: "Suggested",
        sortIndex: this.items1.length,
        estimate: this.estimate
      };
      await axios({
        method: "post",
        url: `${url}/createTaskListItem`,
        data: insert
      })
        .then(
          () => {
            this.items1.push(insert);
            this.title = "";
            this.text = "";
            this.dialog = false;
            this.getTasks();
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    items1Changed(evt) {
      if (evt.added) {
        this.items1.forEach(el => {
          if (el.id === evt.added.element.id) {
            el.icon = "mdi-thought-bubble";
            el.typeTask = "Suggested";
          }
        });
      }
      if (evt.moved) {
        this.items1.forEach(el => {
          if (el.id === evt.moved.element.id) {
            el.sortIndex = evt.moved.newIndex;
          }
        });
      }
    },
    itemsChanged(evt) {
      if (evt.added) {
        this.items.forEach(el => {
          if (el.id === evt.added.element.id) {
            el.icon = "mdi-progress-wrench";
            el.typeTask = "WIP";
          }
        });
      }
    },
    items2Changed(evt) {
      if (evt.added) {
        this.items2.forEach(el => {
          if (el.id === evt.added.element.id) {
            el.icon = "mdi-checkbox-marked-circle";
            el.typeTask = "Completed";
          }
        });
      }
    },
    items3Changed(evt) {
      if (evt.added) {
        this.items3.forEach(el => {
          if (el.id === evt.added.element.id) {
            el.icon = "mdi-emoticon-happy";
            el.typeTask = "Finalised";
          }
        });
      }
    },    
    viewTask(event) {
      console.log("the viewTask event", event);
      let filteredData = this.items1.filter(el => {
        return el.id === parseInt(event.currentTarget.id);
      });

      this.viewOnly = true;
      this.title = filteredData[0].taskTitle;
      this.text = filteredData[0].taskText;
      this.estimate = filteredData[0].estimate;
      this.dialog = true;
    },
    editTask(event) {
      let filteredData = this.items1.filter(el => {
        return el.id === parseInt(event.currentTarget.id);
      });

      this.title = filteredData[0].taskTitle;
      this.text = filteredData[0].taskText;
      this.estimate = filteredData[0].estimate;
      this.editId = parseInt(event.currentTarget.id);
      this.dialog1 = true;
    },
    saveEditTask() {
      this.items1.forEach(el => {
        if (el.id === this.editId) {
          el.taskText = this.text;
          el.estimate = this.estimate;
          el.taskTitle = this.title;
        }
      });
      this.dialog1 = false;
    },
    
    async deleteTask(event) {
      console.log("the event", event);
      let data = {
        id: event.currentTarget.id
      };
      await axios({
        method: "post",
        url: `${url}/deleteTaskListItem`,
        data: data
      })
        .then(
          () => {
            this.getTasks();
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
