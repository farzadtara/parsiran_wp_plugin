<template>
  <div>
    <div>
      <coreTabBar :categoryList="categories" @changeCategory="onCategoryChange">
        <template v-slot="{ category } ">
          <div :id="category.name" class="text-lg">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <singleProductManager
                :isShoeModal="isShoeModal"
                :initValue="selectedItem"
                :categories="categories"
                @onClose="onCloseHandler"
              />
              <coreCard>
                <div class="flex flex-wrap">
                  <div class="w-full px-2 my-4">
                    <h2 class="text-1xl mb-2 font-semibold text-center">
                      لیست قیمت ها
                    </h2>
                    <button
                      class="py-2 my-2 mx-1 px-4 bg-blue-600 hover:bg-teal text-white font-bold rounded focus:outline-none focus:shadow-outline"
                      @click="onCreateNewItem"
                    >
                      اضافه کردن
                    </button>
                    <!-- <button
                      v-show="hasChange"
                      class="py-2 my-1 px-4 bg-green-600 hover:bg-teal text-white font-bold rounded focus:outline-none focus:shadow-outline"
                      @click="updateProduct"
                    >
                      به روز رسانی
                    </button> -->

                    <div class="mt-1">
                      <coreManagementTable
                        :products="currentProducts"
                        @update="onUpdateProduct"
                        @delete="onDeleteProduct"
                        @visibility="onViabilityProduct"
                        @ability="onAbilityProduct"
                      />
                    </div>
                  </div>
                </div>
              </coreCard>
            </div>
          </div>
        </template>
      </coreTabBar>
    </div>
  </div>
</template>

<script setup>
import {
  toValue,
  ref,
  onMounted,
  onBeforeMount,
  computed,
  toRaw,
  reactive,
  nextTick,
  watch, 
  useSlots
} from "vue";
import coreTabBar from "../Components/core/coreTabBar.vue";
import coreManagementTable from "../Components/core/coreManagementTable.vue";
import coreCard from "../Components/core/coreCard.vue";
import singleProductManager from "../Components/partials/singleProductManager.vue";
import cloneDeep from "clone-deep";
import { reactiveUpdate } from "../utils";
import AJAX from "../Bits/AJAX";

const products = ref([]);
const currentProducts = ref([]);
const categories = ref([]);
const currentCategory = ref({})
const selectedItem = reactive({
  id: null,
  name: null,
  priceBuy: null,
  priceSell: null,
  isDisable: false,
  isHidden: false,
  isSellDisable: false,
  isBuyDisable: false,
  categories:[]
});

const isShoeModal = ref(false);

watch( currentCategory , async (nv) => {
  if(nv?.id){
    await fetchProductListByCategoryID(nv.id)     
  }
}, {deep: true})

function onCategoryChange(category){
  currentCategory.value = category

}

function closeModel() {
  isShoeModal.value = false;
}
function showModel() {
  isShoeModal.value = true;
}

async function onCloseHandler(item) {
  if (item) {
    const cloneItem = cloneDeep(item);
    const cloneCurrentProducts = cloneDeep(currentProducts.value);
    const index = cloneCurrentProducts.findIndex((c) => c.id === cloneItem.id);

    if (index === -1) {
      // currentProducts.value = cloneCurrentProducts.concat([{...item}]);
      await createProduct(item);
    } else {
      await updateProduct(item);
      // cloneCurrentProducts[index] = cloneItem;
      // currentProducts.value = [...cloneCurrentProducts];
    }
  }

  closeModel();
}

function onUpdateProduct(params) {
  const { product, index } = params;
  const cloneCurrentProducts = cloneDeep(currentProducts.value);
  reactiveUpdate(selectedItem, cloneCurrentProducts[index]);
  nextTick(() => {
    showModel();
  });
}

function onCreateNewItem() {
  const rawItem = {
    id: null,
    name: null,
    priceBuy: null,
    priceSell: null,
    isDisable: false,
    isHidden: false,
    isSellDisable: false,
    isBuyDisable: false,
    categories:[]
  };
  reactiveUpdate(selectedItem, rawItem);
  nextTick(() => {
    showModel();
  });
}

async function fetchProductList() {
  const data = await AJAX.get("product/all");

  products.value = data;
  currentProducts.value = data;
}

async function fetchProductListByCategoryID(id) {
  const data = await AJAX.get(`product/category/${id}`);

  products.value = data;
  currentProducts.value = data;
}

async function fetchCategoryList() {
  const data = await AJAX.get("category/all");

  if(data?.length > 0){
    categories.value = data;
    currentCategory.value = data[0];
  }

}

async function createProduct(newProduct) {
  const categoryId= toValue(currentCategory).id
  const newProductItem = Object.assign(newProduct, { 'categories': [categoryId] })
  const newItem = await AJAX.post("product", { ...newProductItem });

  await fetchProductListByCategoryID(toValue(currentCategory).id);
}

async function updateProduct(product) {
  const updatedItem = await AJAX.patch(`product/${product.id}`, { ...product });

  await fetchProductListByCategoryID(toValue(currentCategory).id);;
}

const hasChange = computed(() => {
  return (
    JSON.stringify(toRaw(products.value)) !==
    JSON.stringify(toRaw(currentProducts.value))
  );
});

onBeforeMount(async () => {
  await fetchCategoryList();
});

onMounted( async() => {
//
});
</script>

<style scoped>
i {
  font-size: large;
}
/* *{
  font-family: 'Shabnam', sans-serif;

} */
</style>
