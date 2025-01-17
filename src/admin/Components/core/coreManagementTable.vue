<template>
  <div>
    <div class="border-b border-gray-200 shadow">
      <table
        class="w-full table-auto text-xs text-lg font-bold text-gray-500 divide-y divide-green-400"
      >
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2">ترتیب</th>
            <th class="px-4 py-2">نام</th>
            <th class="px-4 py-2">قیمت خرید</th>
            <th class="px-4 py-2">قیمت فروش</th>
            <th class="px-4 py-2">عملیات</th>
          </tr>
        </thead>

        <tbody class="text-center bg-white divide-y divide-gray-300">
          <tr
            class="whitespace-nowrap"
            v-for="(product, index) in currentProducts"
            :key="product.id"
            @dblclick="$emit('update', { product, index })"
            draggable="true"
            @dragstart="handleDragStart(product)"
            @dragover.prevent="handleDragOver(index)"
            @drop.prevent="handleDrop(index)"
          >
            <td class="px-4 py-2">{{ product.order }}</td>
            <td class="px-4 py-2">{{ product.name }}</td>
            <td class="px-4 py-2">{{ ToPersianMoney(product.priceBuy) }}</td>
            <td class="px-4 py-2">{{ ToPersianMoney(product.priceSell) }}</td>
            <td class="px-6 py-4 py-2">
              <div class="flex justify-evenly content-center">
                <div>
                  <a @click="$emit('update', { product, index })">
                    <i class="fa-solid fa-pen-to-square text-green-500"></i>
                  </a>
                </div>
                <div>
                  <a @click="$emit('delete', { product, index })">
                    <i
                      :class="{ 'text-red-500': product.isDeleted }"
                      class="fa-solid fa-trash"
                    ></i>
                  </a>
                </div>
                <div>
                  <a @click="$emit('visibility', { product, index })">
                    <i
                      v-if="product.isHidden"
                      class="fa-solid fa-eye-slash text-orange-500"
                    ></i>
                    <i v-else class="fa-solid fa-eye text-blue-500"></i>
                  </a>
                </div>
                <div>
                  <a @click="$emit('ability', { product, index })">
                    <i
                      v-if="product.isBuyDisable || product.isSellDisable"
                      class="fa-solid fa-store-slash text-orange-500"
                    ></i>
                    <i v-else class="fa-solid fa-store text-blue-500"></i>
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
import {ref, watch} from 'vue'
import { ToPersianMoney } from '../../utils';
import cloneDeep from 'clone-deep';

const props = defineProps({
  products: {
    required: true,
  },
});

const emit = defineEmits(["update", "delete", "visibility", "ability", 'update:order']);

const draggedItem = ref(null)
const draggedOverIndex = ref(null)
const currentProducts = ref([])

watch(()=> props.products, (newList) => {
  if(newList){
    currentProducts.value = newList 
  }
}, {deep: true, immediate: true})



function handleDragStart(item) {
  draggedItem.value = item
}

function handleDragOver(index) {
  draggedOverIndex.value = index
}

function handleDrop(index) {
  if (!draggedItem.value) return

  const cloneCurrentProducts = cloneDeep(currentProducts.value)

  const fromIndex = cloneCurrentProducts.findIndex(item => item.id === draggedItem.value?.id)
  const toIndex = index

  // Remove the item from its original position
  const [removed] = cloneCurrentProducts.splice(fromIndex, 1)
  // Insert it at the new position
  cloneCurrentProducts.splice(toIndex, 0, removed)

  // Update order numbers and emit the new list
  const updatedRows = cloneCurrentProducts.map((row, index) => ({
    ...row,
    order: index + 1
  }))


  currentProducts.value = updatedRows
  console.log('updatedRows :>> ', updatedRows);
  console.log('currentProducts.value :>> ', currentProducts.value);
  emit('update:order', updatedRows)

  draggedItem.value = null
  draggedOverIndex.value = null
}

</script>

<style lang="scss" scoped></style>
