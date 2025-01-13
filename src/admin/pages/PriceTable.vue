<template>
  <div>
    <div class="w-full border border-slate-200 rounded-xl overflow-x-auto">
      <table class="w-full divide-y divide-x divide-slate-200 border-collapse border">
        <thead class="bg-amber-300 text-slate-800">
          <tr>
            <th class="px-4 py-2 bg-yellow-400 text-start border border-gray-300">سکه بانکی</th>
            <th class="px-4 py-2 bg-yellow-400 text-start border border-gray-300">خرید</th>
            <th class="px-4 py-2 bg-yellow-400 text-start border border-gray-300">فروش</th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-x divide-slate-200 bg-white text-slate-800"
        >
          <tr
            v-for="product of products"
            :key="product.id"
            class=" cursor-pointer odd:bg-white even:bg-slate-50"
          >
            <td class="px-4 py-2 border border-gray-300">{{ product.name }}</td>
            <td class="px-4 py-2 border border-gray-300">{{ product.priceBuy }}</td>
            <td class="px-4 py-2 border border-gray-300">{{ product.priceSell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AJAX from "../Bits/AJAX";
import { ToPersianMoney } from "../utils";

export default {
  data() {
    return {
      products: [],
      fetchInterval: null,
    };
  },

  // async beforeCreate() {

  // },

  created() {
    this.fetchAndProcessProducts();
  },

  mounted() {
    window.setTimeout(() => {
      this.fetchInterval = setInterval(this.fetchAndProcessProducts, 30000);
    }, 25000);
  },

  beforeDestroy() {
    console.log("beforeDestroy");

    clearInterval(this.fetchInterval);
  },

  methods: {
    onColReorder(){
      console.log("onColReorder");
    },    
    onRowReorder(){
      console.log("onRowReorder");
    },

    async fetchAndProcessProducts() {
      const rawProducts = await AJAX.get("product/all");

      const processedProducts = Array.from(rawProducts)
        .filter((product) => !product.isHidden)
        .map((product) => {
          if (product.isDisable) {
            product.priceSell = 0;
            product.priceBuy = 0;
            return product;
          }
          return product;
        })
        .map((product) => {
          if (!!product.isBuyDisable) {
            product.priceBuy = null;
            return product;
          }
          if (product.isSellDisable) {
            product.priceSell = null;
            return product;
          }
          return product;
        })
        .map((product) => {
          if (product.priceSell)
            product.priceSell = ToPersianMoney(product.priceSell);
          if (product.priceBuy)
            product.priceBuy = ToPersianMoney(product.priceBuy);
          return product;
        });

      this.products = processedProducts;
    },
  },
};
</script>

<style lang="scss" scoped></style>
