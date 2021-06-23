<template>
  <div>
    <SandTable msg="Welcome to Your Vue.js App"/>
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
