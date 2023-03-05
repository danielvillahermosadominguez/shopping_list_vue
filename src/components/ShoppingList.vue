<template>
    <div class="hello"> 
        <label>
            Please, write the name of the item:<br>
            <input type = "text" role="itemInput" v-model="inputValue"/>
        </label>
        <button role="addButton" :disabled="!isButtonEnabled" v-on:click="addItem" >add item</button>
        <br/>
        <span>Your shopping list</span>
        <table role = "itemList">
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
                <tr  v-for="(item,index) in listItems" v-bind="listItems" :key="index">                    
                    <th>{{ index }}</th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.quantity}}</th>
                </tr>

            </tbody>           
        </table>
    </div>    
</template>

<script lang="ts">
import AppService from '@/appservices/AppService';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import { defineComponent } from 'vue';
export default defineComponent({           
    name: 'ShoppingList',
    props: {
        appService:AppService
    },
    data() {        
        return {            
            inputValue:'',
            listItems: [] as Array<ShoppingListItem>
        }
    },    
    mounted() {
        console.log("estoy aquí");
    },
    computed: {
         isButtonEnabled(): boolean {
            return this.$data.inputValue !== '';
         }
    },
    methods: {       
        addItem() {                        
            const item = new ShoppingListItem();    
            item.name = this.$data.inputValue;  
            this.$data.inputValue = '';    
            item.quantity = 1;          
            this.appService?.add(item);                                               
            this.listItems = this.appService?.getItems() ?? [];
            //this.$data.listItems.push(item);
        }
}

});
</script>
<style>

</style>