<template>
    <div :class="{
            'w-full text-xl font-medium	 mx-auto p-4 mb-20': !isFullScreen,
            'fixed inset-0 bg-white z-50 p-4': isFullScreen
        }" 
    >
        <span class="block text-2xl font-bold mb-2">{{ props.category.name }} </span>
        <div class="w-full border border-slate-200 rounded-xl overflow-x-auto">
            <table class="w-full divide-y divide-x divide-slate-200 border-collapse border m-0">
            <thead class="bg-amber-300 text-slate-800">
                <tr @dblclick="isFullScreen = !isFullScreen">
                <th class="px-4 py-2 bg-yellow-400 border border-gray-300 text-center">{{props.category.name}}</th>
                <th class="px-4 py-2 bg-yellow-400 border border-gray-300 text-center">خرید</th>
                <th class="px-4 py-2 bg-yellow-400 border border-gray-300 text-center">فروش</th>
                </tr>
            </thead>
            <tbody
                class="divide-y divide-x divide-slate-200 bg-white text-slate-800"
            >
                <tr
                v-for="product of props.products"
                :key="product.id"
                class=" cursor-pointer odd:bg-white even:bg-slate-50"
                >
                <td class="px-4 py-2 border border-gray-300 text-center">{{ product.name }}</td>
                <td class="px-4 py-2 border border-gray-300 text-center">{{ product.priceBuy }}</td>
                <td class="px-4 py-2 border border-gray-300 text-center">{{ product.priceSell }}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <!-- <span class="mt-1">آخرین به روز سانی در : {{ lastUpdateDate }}</span> -->
        </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { remainingTime } from "@persian-tools/persian-tools";


const isFullScreen = ref(false) 

const props = defineProps({
    products:{
        type: Array,
        required: true
    },
    category:{
        type: String,
        required: true
    }
})

// const lastUpdateDate = computed(() => {
//     const date = props.products ?  props.products.map(product => product.updated_at).sort().reverse()[0] : ''
//     console.log('remainingTime(date) :>> ',date, remainingTime(date));
//     return date 
// })






</script>

<style lang="scss" scoped>

</style>