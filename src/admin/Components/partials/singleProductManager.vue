<template>
  <div v-if="isShoeModal">
    <div
      class="fixed z-10 overflow-y-auto top-0 w-full left-0"
      id="new-item-modal"
    >
      <div
        class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <div
          class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div class="p-4">
              <div class="my-6">
                <input
                  class="w-full py-2 px-3 text-gray-700 shadow appearance-none border border-grey-light hover:border-grey rounded leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  v-model="targetItem.name"
                  placeholder="نام "
                />
              </div>
              <div class="my-6 flex justify-between">
                <div>
                  <input
                    class="w-full py-2 px-3 text-gray-700 shadow appearance-none border border-grey-light hover:border-grey rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="number"
                    v-model="targetItem.priceBuy"
                    placeholder=" قیمت خرید :"
                  />
                </div>
                <div class="flex items-start space-x-3 py-6">
                  <input
                    type="checkbox"
                    v-model="targetItem.isBuyDisable"
                    class="border-gray-300 rounded h-5 w-5 mx-1"
                  />

                  <div class="flex flex-col">
                    <h1 class="text-gray-700 font-medium leading-none">
                      غیر فعال
                    </h1>
                  </div>
                </div>
              </div>
              <div class="my-6 flex justify-between">
                <div>
                  <input
                    class="w-full py-2 px-3 text-gray-700 shadow appearance-none border border-grey-light hover:border-grey rounded leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="number"
                    v-model="targetItem.priceSell"
                    placeholder="قیمت فروش :"
                  />
                </div>
                <div class="flex items-start space-x-3 py-6">
                  <input
                    type="checkbox"
                    v-model="targetItem.isSellDisable"
                    class="border-gray-300 rounded h-5 w-5 mx-1"
                  />

                  <div class="flex flex-col">
                    <h1 class="text-gray-700 font-medium leading-none">
                      غیر فعال
                    </h1>
                  </div>
                </div>
              </div>
              <div class="my-6">

                <!-- <singleProductCategoryManagement
                  :categories="props.categories"
                  :productCategory="props.initValue.categories"
                /> -->

              </div>
              <div class="flex items-start space-x-3 py-6">
                <input
                  type="checkbox"
                  v-model="targetItem.isHidden"
                  class="border-gray-300 rounded h-5 w-5 mx-1"
                />

                <div class="flex flex-col">
                  <h1 class="text-gray-700 font-medium leading-none">
                    پنهان کردن
                  </h1>
                  <!-- <p class="text-xs text-gray-500 mt-2 leading-4">
                    همون حذف موقت
                  </p> -->
                </div>
              </div>
              <div class="flex items-start space-x-3 py-6">
                <input
                  type="checkbox"
                  v-model="targetItem.isDisable"
                  class="border-gray-300 rounded h-5 w-5 mx-1"
                />

                <div class="flex flex-col">
                  <h1 class="text-gray-700 font-medium leading-none">
                    غیر فعال کردن کل آیتم
                  </h1>
                  <!-- <p class="text-xs text-gray-500 mt-2 leading-4">
                    داریم ولی نداریم !!
                  </p> -->
                </div>
              </div>

              <div class="my-6 text-red-700" v-if="hasError">
                <p>یه چیزی رو پر نکردی ...!!!</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              @click="onCloseModal"
            >
              <i class="fas fa-times"></i> بی خیال
            </button>
            <button
              class="py-2 mx-1 px-4 bg-green-600 hover:bg-teal text-white font-bold rounded focus:outline-none focus:shadow-outline"
              @click="addOrUpdateProduct"
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineModel,
  watch,
  defineProps,
  defineEmits,
  reactive,
  ref,
  onMounted,
  onBeforeMount,
} from "vue";
import coreCard from "../core/coreCard.vue";
import { generateUniqueId, reactiveUpdate } from "../../utils";
import ProductForm from './ProductForm.vue'
import  singleProductCategoryManagement  from './singleProductCategoryManagement.vue'

const props = defineProps({
  isShoeModal: {
    Required: true,
    type: Boolean,
    default: false,
  },
  initValue: {
    Required: true,
    type: Object,
  },
  categories:{
    Required:true
  }
});

const emit = defineEmits(["onClose"]);

const targetItem = reactive({
  id: null,
  name: null,
  priceBuy: null,
  priceSell: null,
  isDisable: false,
  isHidden: false,
  isSellDisable: false,
  isBuyDisable: false,
});

const hasError = ref(false);

watch(
  () => props.isShoeModal,
  (newValue, oldValue) => {
    console.log("in watch", newValue, oldValue);
    if (newValue) {
      reactiveUpdate(targetItem, props.initValue);
      console.log("open", targetItem);
    }
  }
);

function addOrUpdateProduct() {
  console.log(" addOrUpdateProduct targetItem :>> ", targetItem);
  if (targetItem.priceBuy && targetItem.priceSell && targetItem.name) {
    if (targetItem.id) {
      emit("onClose", {
        ...targetItem,
      });
    } else {
      emit("onClose", {
        ...targetItem,
      });
    }
  } else {
    hasError.value = true;
  }
}

function onCloseModal() {
  emit("onClose");
}
</script>

<style lang="scss" scoped></style>
