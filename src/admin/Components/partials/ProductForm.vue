<template>
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Create New Product</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
  
        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          ></textarea>
        </div>
  
        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            step="0.01"
            min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
  
        <!-- Image URL -->
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="image"
            v-model="form.image"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
  
        <!-- Categories Multi-Select Dropdown -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Categories</label>
          <div 
            @click="isOpen = !isOpen"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 cursor-pointer"
          >
            <div class="flex flex-wrap gap-2">
              <span v-if="form.categories.length === 0" class="text-gray-500">
                Select categories...
              </span>
              <span
                v-for="categoryId in form.categories"
                :key="categoryId"
                class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-700"
              >
                <!-- <component
                  :is="getCategoryIcon(categoryId)"
                  class="w-4 h-4 mr-1"
                /> -->
                {{ getCategoryLabel(categoryId) }}
                <button
                  @click.stop="removeCategory(categoryId)"
                  class="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
  
          <!-- Dropdown Menu -->
          <div
            v-if="isOpen"
            class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto"
          >
            <div class="py-1">
              <button
                v-for="category in availableCategories"
                :key="category.id"
                @click.prevent="addCategory(category.id)"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
              >
                <component
                  :is="category.icon"
                  class="w-5 h-5 text-gray-400"
                />
                <span>{{ category.label }}</span>
              </button>
              <!-- Create New Category Button -->
              <button
                @click.prevent="showCreateCategoryDialog = true"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-blue-600 border-t"
              >
                <Plus class="w-5 h-5" />
                <span>Create New Category</span>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Product
          </button>
        </div>
      </form>
  
      <!-- Create Category Dialog -->
      <div
        v-if="showCreateCategoryDialog"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showCreateCategoryDialog = false"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Category</h3>
          <form @submit.prevent="handleCreateCategory" class="space-y-4">
            <!-- Category Name -->
            <div>
              <label for="categoryName" class="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                id="categoryName"
                v-model="newCategory.label"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Icon Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="icon in availableIcons"
                  :key="icon.name"
                  type="button"
                  @click="newCategory.icon = icon.component"
                  class="p-2 rounded-lg border flex items-center justify-center"
                  :class="[
                    newCategory.icon === icon.component
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  ]"
                >
                  <component :is="icon.component" class="w-6 h-6" :class="[
                    newCategory.icon === icon.component
                      ? 'text-blue-500'
                      : 'text-gray-400'
                  ]" />
                </button>
              </div>
            </div>
  
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showCreateCategoryDialog = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import {
    Shirt,
    Smartphone,
    Laptop,
    Home,
    Watch,
    Headphones,
    ShoppingBag,
    Plus,
    Camera,
    Car,
    Book,
    Gamepad,
    Gift,
    Palette,
    Music
  } from 'lucide-vue-next'
  
  const availableIcons = [
    { name: 'Shirt', component: Shirt },
    { name: 'Smartphone', component: Smartphone },
    { name: 'Laptop', component: Laptop },
    { name: 'Home', component: Home },
    { name: 'Watch', component: Watch },
    { name: 'Headphones', component: Headphones },
    { name: 'ShoppingBag', component: ShoppingBag },
    { name: 'Camera', component: Camera },
    { name: 'Car', component: Car },
    { name: 'Book', component: Book },
    { name: 'Gamepad', component: Gamepad },
    { name: 'Gift', component: Gift },
    { name: 'Palette', component: Palette },
    { name: 'Music', component: Music },
  ]
  
  const categories = ref([
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'electronics', label: 'Electronics', icon: Smartphone },
    { id: 'computers', label: 'Computers', icon: Laptop },
    { id: 'home', label: 'Home & Living', icon: Home },
    { id: 'accessories', label: 'Accessories', icon: Watch },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'deals', label: 'Deals', icon: ShoppingBag },
  ])
  
  const form = ref({
    name: '',
    description: '',
    price: '',
    image: '',
    categories: []
  })
  
  const isOpen = ref(false)
  const showCreateCategoryDialog = ref(false)
  const newCategory = ref({
    label: '',
    icon: null
  })
  
  const availableCategories = computed(() => {
    return categories.value.filter(category => !form.value.categories.includes(category.id))
  })
  
  const getCategoryLabel = (categoryId) => {
    return categories.value.find(c => c.id === categoryId)?.label
  }
  
  const getCategoryIcon = (categoryId) => {
    return categories.value.find(c => c.id === categoryId)?.icon
  }
  
  const addCategory = (categoryId) => {
    form.value.categories.push(categoryId)
    isOpen.value = false
  }
  
  const removeCategory = (categoryId) => {
    form.value.categories = form.value.categories.filter(id => id !== categoryId)
  }
  
  const handleCreateCategory = () => {
    if (!newCategory.value.label || !newCategory.value.icon) return
  
    const id = newCategory.value.label.toLowerCase().replace(/\s+/g, '-')
    categories.value.push({
      id,
      label: newCategory.value.label,
      icon: newCategory.value.icon
    })
  
    // Add the new category to the selected categories
    form.value.categories.push(id)
  
    // Reset and close
    newCategory.value = { label: '', icon: null }
    showCreateCategoryDialog.value = false
    isOpen.value = false
  }
  
  const emit = defineEmits(['submit'])
  
  const handleSubmit = () => {
    emit('submit', {
      ...form.value,
      id: Date.now(),
      price: Number(form.value.price)
    })
    
    // Reset form
    form.value = {
      name: '',
      description: '',
      price: '',
      image: '',
      categories: []
    }
  }
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (isOpen.value && !event.target.closest('.relative')) {
      isOpen.value = false
    }
  }
  
  // Add click outside listener
  window.addEventListener('click', handleClickOutside)
  </script>