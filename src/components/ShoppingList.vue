<template @new-item_has_been-added="refreshList()">
    <div class="hello">
        <form>
            <div style="float:left;margin-right:20px;">
                <label for="input_text">
                    Please, write the name of the item:                    
                    <input id="input_text" name="input_text" type="text" role="itemInput" v-model="inputValue" />
                </label>
                
                <button role="addButton" :disabled="!isValidInput()" v-on:click="addItem">add item</button>
                <button role="deleteAllButton" :disabled="!canIDeleteAtLeastOne()" v-on:click="showModal = true">delete all items</button>
                <ContinueQuestion role = "questionForm" v-if="showModal" header="" question="You are going to delete all the items.are you sure?" @ok="deleteAll" @cancel="showModal=false"> </ContinueQuestion>
                <br>
                <p v-if="error !== ''" class="error">{{ error }}</p>
                <p class="info" v-else>For example: Bread</p>
                <br />
                <h1>Your shopping list</h1>
                <table role="itemList" class="table">
                    <thead>
                        <tr class="tr">
                            <th>
                                Nº
                            </th>
                            <th>
                                Item
                            </th>
                            <th>
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listItems" v-bind="listItems" :key="index">
                            <td>{{ index }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
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
const emptyShoppingItem = new ShoppingListItem();
export default defineComponent({
    name: "ShoppingList",
    props: {
        appService: AppService
    },
    data() {
        return {
            inputValue: "",
            listItems: [] as Array<ShoppingListItem>,
            lastAdded: emptyShoppingItem as ShoppingListItem,
            error: "",
            showModal: false,
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
        addItem() {
            const item = new ShoppingListItem();
            item.name = this.$data.inputValue;
            item.quantity = 1;
            this.$data.inputValue = "";
            if (this.appService !== undefined) {
                this.appService.add(item).then(() => {
                    this.lastAdded = item;
                });
            }
        },
        deleteAll() {
            if (this.appService !== undefined) {
                this.appService.deleteAll();
                this.refreshList();             
            }

            this.showModal = false;
        },
        isValidInput(): boolean {
            this.$data.error = "";
            const text = this.$data.inputValue;
            if (text === "") {
                return false;
            }
            const regex = new RegExp("^[A-Za-z0-9].");
            if (!regex.test(text)) {
                this.$data.error = "The text must start with A-Z, a-z or a number but no spaces before the first character";
                return false;
            }
            return true;
        },
        canIDeleteAtLeastOne(): boolean {
            const variable = this.listItems.length > 0;
            console.log("¿boton delete debe estar?" + variable);
            return variable;
        },
        refreshList() {
            if (this.appService) {
                this.appService.getItems().then(items => {
                    console.log("LA LISTA TIENE " + items.length + " elementos");
                    this.listItems = items;
                });
            }
        }
    },
    components: { ContinueQuestion }
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
    font-size: 12px;
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
    border-top: 4px solid #aabcfe;
    border-bottom: 1px solid #fff;
    color: #039;
    font-weight: bold
}

td {
    padding: 8px;
    background: #e8edff;
    border-bottom: 1px solid #fff;
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
}</style>