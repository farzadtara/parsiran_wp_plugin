<template>
  <div>
    <div class="border-b border-gray-200 shadow">
      <table
        class="w-full table-auto text-xs text-lg font-bold text-gray-500 divide-y divide-green-400"
      >
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2">نام</th>
            <th class="px-4 py-2">قیمت خرید</th>
            <th class="px-4 py-2">قیمت فروش</th>
            <th class="px-4 py-2">عملیات</th>
          </tr>
        </thead>

        <tbody class="text-center bg-white divide-y divide-gray-300">
          <tr
            class="whitespace-nowrap"
            v-for="(product, index) in props.products"
            :key="product.id"
            @dblclick="$emit('update', { product, index })"
          >
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
import { ToPersianMoney } from '../../utils';

const props = defineProps({
  products: {
    required: true,
  },
});

const emits = defineEmits(["update", "delete", "visibility", "ability"]);

</script>

<style lang="scss" scoped></style>
