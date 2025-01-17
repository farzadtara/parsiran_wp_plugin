<script setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const emit = defineEmits(['update:order'])

const data = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', order: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', order: 2 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', order: 3 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', order: 4 },
])

const draggedItem = ref(null)
const draggedOverIndex = ref(null)

function handleDragStart(item) {
  draggedItem.value = item
}

function handleDragOver(index) {
  draggedOverIndex.value = index
}

function handleDrop(index) {
  if (!draggedItem.value) return

  const fromIndex = data.value.findIndex(item => item.id === draggedItem.value?.id)
  const toIndex = index

  // Remove the item from its original position
  const [removed] = data.value.splice(fromIndex, 1)
  // Insert it at the new position
  data.value.splice(toIndex, 0, removed)

  // Update order numbers and emit the new list
  const updatedRows = data.value.map((row, index) => ({
    ...row,
    order: index + 1
  }))
  data.value = updatedRows
  emit('update:order', updatedRows)

  draggedItem.value = null
  draggedOverIndex.value = null
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, index) in data"
          :key="row.id"
          draggable="true"
          @dragstart="handleDragStart(row)"
          @dragover.prevent="handleDragOver(index)"
          @drop.prevent="handleDrop(index)"
          :class="{
            'bg-gray-50': draggedOverIndex === index,
            'cursor-move hover:bg-gray-50 transition-colors': true
          }"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ row.order }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ row.name }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ row.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ row.role }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>