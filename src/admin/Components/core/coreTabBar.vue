<template>
    <span>{{ !!getCurrentCategory }} - {{ activeCategory }}</span>
    <div class="min-h-screen bg-gray-50" v-if="getCurrentCategory">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-bold text-gray-900 py-6"> محصولات به تفکیک دسته بندی</h1>
        </div>
      </header>
  
      <!-- Category Tab Bar -->
      <div class="bg-white border-b mx-2 my-1">
        <div class="w-full px-4 sm:px-6 lg:px-8">
          <div class="flex space-x-8 overflow-x-auto">
            <button
              v-for="category in categoryList"
              :key="category.id"
              @click="updateActiveCategory(category)"
              class="group relative py-4 px-1 focus:outline-none"
              :class="[
                activeCategory === category.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <div class="flex items-center space-x-3">
                <!-- <component
                  :is="category.icon"
                  class="w-5 h-5"
                  :class="[
                    activeCategory === category.id
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  ]"
                /> -->
                <span class="font-medium text-sm">{{ category.name }}</span>
              </div>
              <!-- Active indicator -->
              <div
                class="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200"
                :class="[
                  activeCategory === category.id
                    ? 'bg-blue-600'
                    : 'bg-transparent group-hover:bg-gray-200'
                ]"
              />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Content Area -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              {{ getCurrentCategory.name }}
            </h2>

            <div>
              <slot :category="getCurrentCategory" ></slot>
            </div>
            
            <!-- Product Grid -->
            <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <!-- <div
                v-for="product in getCurrentProducts"
                :key="product.id"
                class="group relative"
              >
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm text-gray-700">
                      <a href="#" class="font-medium">
                        {{ product.name }}
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
                  </div>
                  <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import {
    Shirt,
    Smartphone,
    Laptop,
    Home,
    Watch,
    Headphones,
    ShoppingBag
  } from 'lucide-vue-next'


  const props = defineProps(({
    categoryList:{
        default: [],
        required: true,
        type: Array,
    }
  }))

  const emit = defineEmits(['changeCategory'])

  const activeCategory = ref('')
  
  const getCurrentCategory = computed(() => {
    return props.categoryList.find(category => category.id === activeCategory.value)
  })

  function updateActiveCategory(category){
    activeCategory.value = category.id
    emit('changeCategory', category)

  }
  

  watch(()=> props.categoryList, (newList, oldList)=>{
    if(newList.length > 0 ){
        activeCategory.value = props.categoryList[0].id

    }
  }, { once: true })


//   onMounted(()=>{
//     if(props.categoryList.length > 0 ){
//         activeCategory.value = props.categoryList[0].name
//     }else{
//         console.log(props.categoryList);
//     }
//   })
  </script>
  
  <style>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  </style>