

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">مدیریت دسته بندی </h2>
    
    <!-- Add New Item Form -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-3">ایجاد دسته بندی </h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="newItem.name"
          placeholder="نام"
          class="border rounded-md px-3 py-2"
        />
        <!-- <input
          v-model="newItem.email"
          placeholder="Email"
          class="border rounded-md px-3 py-2"
        /> -->
        <!-- <input
          v-model="newItem.role"
          placeholder="Role"
          class="border rounded-md px-3 py-2"
        /> -->
        <button
          @click="addItem"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          افزودن
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">نام </th>
            <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th> -->
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">عملیات</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4 whitespace-nowrap text-center" v-if="editingItem?.id !== category.id">
              {{ category.name }}
            </td>
            <!-- <td class="px-6 py-4 whitespace-nowrap" v-if="editingItem?.id !== item.id">
              {{ item.email }}
            </td> -->
            <!-- <td class="px-6 py-4 whitespace-nowrap" v-if="editingItem?.id !== item.id">
              {{ item.role }}
            </td> -->
            <td class="px-6 py-4 whitespace-nowrap" v-if="editingItem?.id === category.id">
              <input
                v-model="editingItem.name"
                class="border rounded px-2 py-1 w-full"
              />
            </td>
            <!-- <td class="px-6 py-4 whitespace-nowrap" v-if="editingItem?.id === item.id">
              <input
                v-model="editingItem.email"
                class="border rounded px-2 py-1 w-full"
              />
            </td> -->
            <!-- <td class="px-6 py-4 whitespace-nowrap" v-if="editingItem?.id === category.id">
              <input
                v-model="editingItem.role"
                class="border rounded px-2 py-1 w-full"
              />
            </td> -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex justify-center space-x-2">
                <template v-if="editingItem?.id === category.id">
                  <button
                    @click="saveEdit"
                    class="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="startEdit(category)"
                    class="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    Edit
                  </button>
                </template>
                <button
                  @click="deleteItem(category.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { refDebounced } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import AJAX from '../Bits/AJAX'

const categories = ref([])



const items = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith'  },
])

const newItem = ref({
  name: '',
})

const editingItem = ref(null)

onMounted(async ()=>{
    await fetchCategory()
})


async function fetchCategory(){
    const data = await AJAX.get("category/all");

    categories.value = data;
}

async function addItem(){
  if ( newItem.value.name ) {
    await AJAX.post("category", {...newItem.value } );
    newItem.value = { name: ''}
    await fetchCategory()
  }
}

const startEdit = (item) => {
  editingItem.value = { ...item }
}

async function saveEdit(){
  if (editingItem.value) {
    await AJAX.patch(`category/${editingItem.value.id}`, { ...editingItem.value })
    editingItem.value = null
    await fetchCategory()

  }
}

async function deleteItem(id){
  await AJAX.delete(`category/${id}`)
  await fetchCategory()

}
</script>