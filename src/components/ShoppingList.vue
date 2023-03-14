<template @new-item_has_been-added="refreshList()">
    <div class="hello">
        <label for="input_text">
            Please, write the name of the item:
            <input id="input_text" name="input_text" type="text" role="itemInput" v-model="inputValue" />            
        </label>
        <button role="addButton" :disabled="!isValidInput()" v-on:click="addItem">add item</button>
        <br />
        <div>
            <p v-if="error!==''" class="error">{{ error }}</p> 
            <p class ="info" v-else>For example: Bread</p>
            <br/>            
        </div>
        
        <span>Your shopping list</span>
        <table role="itemList">
            <thead>
                <tr>
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
                    <th>{{ index }}</th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.quantity }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import AppService from '@/appservices/AppService';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import { defineComponent } from 'vue';
const emptyShoppingItem = new ShoppingListItem();
export default defineComponent({
    name: 'ShoppingList',
    props: {
        appService: AppService
    },
    data() {
        return {
            inputValue: '',
            listItems: [] as Array<ShoppingListItem>,
            lastAdded: emptyShoppingItem as ShoppingListItem,
            error:''
        }
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
            this.$data.inputValue = '';
            if (this.appService !== undefined) {
                this.appService.add(item).then(() => {
                    this.lastAdded = item;
                });
            }
        },
        isValidInput(): boolean {
            this.$data.error = '';
            const text = this.$data.inputValue;            
            if(text === '') {
                return false;
            }
            const regex = new RegExp("^[A-Za-z0-9].");            
            if(!regex.test(text)) {
                this.$data.error = 'The text must start with A-Z, a-z or a number but no spaces before the first character';
                return false;
            }

            return true;
        },
        refreshList() {
            if (this.appService) {
                this.appService.getItems().then(items => {
                    this.listItems = items;
                });
            }
        }
    }

});
</script>
<style>
body{
			font-family: Arial, Helvetica, sans-serif;
			font-size: 13px;
		}
		.success, .warning, .validation {
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
		.error{
			color: #D8000C;            
			font-size: 12px;	
		}
		.validation{
			color: #D63301;
			background-color: #FFCCBA;
			background-image: url('https://i.imgur.com/GnyDvKN.png');
		}
</style>