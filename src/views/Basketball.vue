<template>
  <div class="bg-gray-800">
    <board field="basketball-court.svg" v_field="basketball-court-v.svg"
      :field_length="5318"
      :field_width="3314"
    >
      <players :n="5" :scale="5." ball="basketball.svg"/>
    </board>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '../components/Board.vue'
import Players from '../components/Players.vue'
import { useHead } from "@vueuse/head";

export default {
  name: 'Home',
  setup: function () {
    useHead({
      title: "Basketball Tactical Board",
    });
  },
  components: {
    Board,
    Players
  }
}
</script>
