<template>
  <div>
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Categories</label
      >
      <div
        @click="isOpen = !isOpen"
        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 cursor-pointer"
      >
        <div class="flex flex-wrap gap-2">
          <span v-if="categories.length === 0" class="text-gray-500">
            Select categories...
          </span>
          <span
            v-for="category in productCategory"
            :key="category.id"
            class="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-700"
          >
            <p>{{ category.name }}</p>
            <button
              @click.stop="removeCategory(category.id)"
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
            v-for="category in categories"
            :key="category.id"
            @click.prevent="addCategory(category.id)"
            class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            <!-- <component :is="category.icon" class="w-5 h-5 text-gray-400" /> -->
            <span>{{ category.name }}</span>
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

    <div
      v-if="showCreateCategoryDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showCreateCategoryDialog = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Create New Category
        </h3>
        <form @submit.prevent="handleCreateCategory" class="space-y-4">
          <!-- Category Name -->
          <div>
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-700"
              >Category Name</label
            >
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
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Select Icon</label
            >
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
                    : 'border-gray-200 hover:bg-gray-50',
                ]"
              >
                <component
                  :is="icon.component"
                  class="w-6 h-6"
                  :class="[
                    newCategory.icon === icon.component
                      ? 'text-blue-500'
                      : 'text-gray-400',
                  ]"
                />
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
import { ref, defineProps, onMounted } from "vue";

defineProps({
  categories: {
    required: true,
    type: Array,
  },
  productCategory: {
    required: true,
    type: Array,
  },
});

const isOpen = ref(false);
const showCreateCategoryDialog = ref(false);
const currentCategory = ref([]);

onMounted(() => {
  currentCategory.value = productCategory;
});

function removeCategory(categoryID) {
  ///
  currentCategory.value.filter((cat) => cat.id !== categoryID);
}
function addCategory(categoryID) {
  ///
}

function handleCreateCategory(){
  ///
}
</script>

<style lang="scss" scoped></style>
