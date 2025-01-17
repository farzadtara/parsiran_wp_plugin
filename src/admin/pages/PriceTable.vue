<template>
  <div id="price-table-container" class="w-full">

    <div v-for="(category, index) of categories" :key="index">
      <corePriceTable :products="products[category.id]" :category="category" />
    </div>


  </div>

</template>

<script>
import AJAX from "../Bits/AJAX";
import { ToPersianMoney } from "../utils";
import corePriceTable from "../Components/core/corePriceTable.vue";

export default {
  components: { corePriceTable },
  data() {
    return {
      products: {},
      fetchInterval: null,
      categories: [],
    };
  },

  async beforeCreate() {
    // const appElement = document.getElementById('WPWVT_app');
    // console.log("appElement", appElement)
    // if (appElement && appElement.dataset.categories) {
    //   console.log('appElement :>> ', appElement);
    //     console.log('JSON.parse(appElement.dataset.categories) :>> ', JSON.parse(appElement.dataset.categories));
    //     this.categories = JSON.parse(appElement.dataset.categories);

    //   // try {

    //   // } catch (error) {
    //   //   console.error("Error parsing JSON:", error);
    //   // }
    // }

  },


  async created() {
    await this.fetchCategories()
    await this.fetchAndProcessProducts()

  },

  mounted() {
    window.setTimeout(() => {
      this.fetchInterval = setInterval(this.fetchAndProcessProducts, 35000);
    }, 25000);
  },

  beforeDestroy() {
    clearInterval(this.fetchInterval);
  },

  methods: {
    onColReorder(){
      console.log("onColReorder");
    },    
    onRowReorder(){
      console.log("onRowReorder");
    },

    async fetchCategories() {
      const data = await AJAX.get("category/all");
      this.categories = data.filter((item)=> !item.isHidden ).sort((a, b) => a.order - b.order);
    },

    async fetchAndProcessProducts() {
      this.categories.forEach(async(category) => {
        
        const rawProducts = await AJAX.get(`product/category/${category.id}`);
  
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
              product.priceBuy = "---";
              return product;
            }
            if (product.isSellDisable) {
              product.priceSell = "---";
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
          }).sort((a, b) => a.order - b.order);
  
        this.products = {...this.products, [category.id]: processedProducts};
      })

    },

  },
};
</script>

<style lang="scss" scoped></style>
