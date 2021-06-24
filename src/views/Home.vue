<template>
  <div class="bg-gray-800">
    <SandTable />
  </div>
</template>

<script>
// @ is an alias to /src
import SandTable from '@/components/SandTable.vue'

export default {
  name: 'Home',
  components: {
    SandTable
  }
}
</script>
