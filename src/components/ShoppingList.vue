<template @new-item_has_been-added="refreshList()">
    <div class="hello">        
        <form>
            <div style="float:left;margin-right:20px;">
                <label for="input_text">
                    {{$t("shopping-list-please-write-the-name")}}                    
                    <input id="input_text" name="input_text" type="text" role="itemInput" v-model="inputValue" data-error="hola" required/>
                </label>                
                <button role="addButton" :disabled="!isValidInput()" v-on:click="addItem">{{$t("shopping-list-add-item")}}</button>
                <button role="deleteAllButton" :disabled="!canIDeleteAtLeastOne()" v-on:click="askToDeleteAll()">{{$t("shopping-list-delete-all")}}</button>
                <ContinueQuestion id="questionForm" role="questionForm" v-if="showModal" header="" :question="modalMessage"
                    @ok="executeAction($event)" @cancel="cancelLastAction()"> </ContinueQuestion>                                
                <UpdateItemForm id="editForm" role="editForm" v-if="showEdit" header="" :item="actionArgument"
                    @ok="($event,args) => executeAction($event,args)" @cancel="cancelLastAction()"> </UpdateItemForm> 
                <br>
                <div>
                    <p v-if="error !== ''" class="error">{{ error }}</p>
                    <p v-else class="info" >{{$t("shopping-list-for-example")}}</p>
                    <br />
                </div>
                <h1> {{$t("shopping-list-your-shopping-list")}}   </h1>
                <table role="itemList" class="table">
                    <thead>
                        <tr class="tr">                           
                            <th>
                                {{$t("shopping-list-item")}}                                
                            </th>
                            <th>
                                {{$t("shopping-list-quantity")}}                                
                            </th>
                            <th>
                                {{$t("shopping-list-action")}}                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listItems" v-bind="listItems" :key="index">                            
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>
                                <button role="increaseQuantity" @click="increaseItem(item, 1)">+</button>
                                <button role="decreaseQuantity" :disabled="item.quantity <= 1"
                                    @click="increaseItem(item, -1)">-</button>
                                <button role="editItem" @click="askToEditItem(item)">
                                    <img src="@/assets/edit.png" heigth="10px" width="10px">
                                </button>
                                <button role="deleteItem" v-on:click="askToDeleteOne(item)">
                                    <img src="@/assets/deleteItem.png" heigth="10px" width="10px">
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </form>
    </div>
</template>

<script lang="ts">
import AppService from '@/appservices/AppService';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import { defineComponent } from 'vue';
import ContinueQuestion from './ContinueQuestion.vue';
import UpdateItemForm from './UpdateItemForm.vue';
import NameValidator from '@/validators/namevalidator';
import * as util from 'util';
const emptyShoppingItem = new ShoppingListItem();
enum Actions {
    none,
    editItem,
    deleteAll,
    deleteSelectedItem,
}
export default defineComponent({
    name: "ShoppingList",
    props: {
        appService: Object as () =>AppService 
    },
    data() {
        return {
            inputValue: '',
            listItems: [] as Array<ShoppingListItem>,
            lastAdded: emptyShoppingItem as ShoppingListItem,
            error: '',
            showModal: false,
            showEdit: false,
            modalMessage: '',
            action: Actions.none,
            actionArgument: undefined as ShoppingListItem | undefined,
            validator: new NameValidator() as NameValidator
        };
    },
    mounted() {        
        this.refreshList();
    },
    watch: {
        lastAdded() {
            this.refreshList();
        }
    },
    methods: {      
        async addItem() {
            const item = new ShoppingListItem();
            item.name = this.$data.inputValue;
            item.quantity = 1;
            this.$data.inputValue = "";
            if (this.appService !== undefined) {
                await this.appService.add(item);
                this.lastAdded = item;
            }
        },
        askToEditItem(item: ShoppingListItem) {            
            this.action = Actions.editItem;            
            this.actionArgument = item;
            this.showEdit = true;
        },
        askToDeleteAll() {
            this.modalMessage = this.$t("shopping-list-delete-all-message") as string;
            this.action = Actions.deleteAll;            
            this.showModal = true;
        },
        askToDeleteOne(item: ShoppingListItem) {                        
            this.modalMessage = util.format(this.$t("shopping-list-you-are-going-to-remove-one-item"), item.name);
            this.action = Actions.deleteSelectedItem;            
            this.actionArgument = item;
            this.showModal = true;
        },
        cancelLastAction() {            
            this.modalMessage = '';
            this.action = Actions.none;
            this.showModal = false;
            this.showEdit = false;
            this.actionArgument = undefined;
        },
        executeAction(event: Event, updatedItem: ShoppingListItem | undefined = undefined) {            
            if (this.action === Actions.deleteAll) {
                this.deleteAll();
            } else if ((this.action ===  Actions.deleteSelectedItem) && (this.actionArgument !== undefined)) {
                this.deleteItem(this.actionArgument);
            } else if ((this.action ===  Actions.editItem) && (updatedItem !== undefined)) {                
                this.updateItem(updatedItem);
            }
            this.cancelLastAction();
        },
        deleteAll() {
            if (this.appService !== undefined) {
                this.appService.deleteAll();
                this.refreshList();
            }
        },
        deleteItem(item: ShoppingListItem) {
            if (this.appService !== undefined) {
                this.appService.deleteItem(item);
                this.refreshList();
            }
        },
        updateItem(item: ShoppingListItem) {
            if (this.appService !== undefined) {
                this.appService.updateItem(item);
                this.refreshList();
            }
        },
        increaseItem(item: ShoppingListItem, increment: number) {
            if (this.appService !== undefined) {
                const updatedItem = new ShoppingListItem(item.name, item.quantity + increment);
                updatedItem.id = item.id;
                this.appService.updateItem(updatedItem);
                this.refreshList();
            }
        },
        isValidInput(): boolean {            
            if (this.$data.inputValue === "") {
                this.$data.error = "";
                return false;
            } 
            const result:boolean = this.validator.isShoppingListItemNameCorrect(this.$data.inputValue);            

            if(!result) {
                this.$data.error = this.$t("validation-the_text_must_start") as string;
                return false;
            }            
            this.$data.error = "";
            return true;
        },
        canIDeleteAtLeastOne(): boolean {
            const variable = this.listItems.length > 0;
            return variable;
        },
        refreshList() {            
            if (this.appService) {
                this.appService.getItems().then((items:Array<ShoppingListItem>) => {
                    this.listItems = items;
                });
            }
        }
    },
    components: { ContinueQuestion , UpdateItemForm}
});
</script>
<style>
body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
}

.success,
.warning,
.validation {
    border: 1px solid;
    margin: 10px 0px;
    padding: 15px 10px 15px 50px;
    background-repeat: no-repeat;
    background-position: 10px center;
}

.info {
    color: #00529B;
    font-size: 12px;
}

.info2 {
    color: #FFFF;
    background-color: #00529B;
    font-size: 12px;
    background-image: url('https://i.imgur.com/Q9BGTuy.png');
}

.success {
    color: #4F8A10;
    background-color: #DFF2BF;
    background-image: url('https://i.imgur.com/Q9BGTuy.png');
}

.warning {
    color: #9F6000;
    background-color: #FEEFB3;
    background-image: url('https://i.imgur.com/Z8q7ww7.png');
}

.error {
    color: #D8000C;
    font-size: 10px;
    overflow-wrap: break-spaces; 
    inline-size: 100px;    
}

.validation {
    color: #D63301;
    background-color: #FFCCBA;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
}

table {
    font-family: «Lucida Sans Unicode», «Lucida Grande», Sans-Serif;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    border-collapse: collapse;
}

th {
    font-size: 13px;
    font-weight: normal;
    padding: 8px;
    background: #b9c9fe;
    border-top: 1px solid #aabcfe;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    color: #039;
    font-weight: bold
}

td {
    padding: 8px;
    background: #e8edff;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    color: #669;
    border-top: 1px solid transparent;
}

label {
    display: block;
    color: #039;
    font-weight: bold;
    display: block;
    padding: 3px;
    margin: 3px;
}

input {
    display: block;
    padding: 3px;
    margin: 3px;
    padding: 3px;
    font-size: 14px;
    font-weight: 600;
    width: 300px;
}

button:disabled,
button[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
}
p {
     font-size: "8px";
     width: 250px;
     white-space: nowrap;     
     text-overflow: ellipsis;
}
</style>