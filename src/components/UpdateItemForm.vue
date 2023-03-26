<template>
    <transition name="modaledit">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        {{ header }}
                    </div>
                    <div class="modal-body">
                        <label>
                            Please, update the name of the item:
                            <input id="update_name" type="text" role="nameInput" v-model="updatedItem.name" />
                            <br>
                            <div>
                                <span v-if="error !== ''" class="error">{{ error }}</span>
                                <span v-else class="info">For example: Jam</span>
                                <br />
                            </div>
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-button" :disabled="!isValidInput()" @click="$emit('ok', $event, updatedItem)">
                            Accept
                        </button>
                        <button class="modal-button" @click="$emit('cancel')">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </transition>
</template>

<script lang="ts">
import ShoppingListItem from '@/appservices/ShoppingListItem';
import NameValidator from '@/validators/namevalidator';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'UpdateItemForm',
    props: {
        header: String,
        item: ShoppingListItem,
    },
    data() {
        return {
            updatedItem: new ShoppingListItem() as ShoppingListItem,
            validator: new NameValidator() as NameValidator,
            error: '' as string
        }
    },
    mounted() {
        if (this.item !== undefined) {
            this.updatedItem.name = this.item.name;
            this.updatedItem.quantity = this.item.quantity;
            this.updatedItem.id = this.item.id;
        }
    },
    methods: {
        isValidInput(): boolean {
            const result: boolean | undefined = this.validator.isShoppingListItemNameCorrect(this.$data.updatedItem.name);
            if (result === undefined) {
                this.$data.error = "";
                return false;
            }

            if (!result) {
                this.$data.error = "The text must start with A-Z, a-z or a number but no spaces before the first character";
                return false;
            }
            this.$data.error = "";
            return true;
        },
    }
});
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-button {
    margin-right: 10px;
    margin-left: 10px;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

</style>
