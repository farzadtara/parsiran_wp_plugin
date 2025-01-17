<template>
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
              class="group relative mx-2 py-4 px-1 focus:outline-none"
              :class="[
                activeCategory === category.id
                  ? 'text-blue-600 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <div class="flex items-center space-x-3">
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