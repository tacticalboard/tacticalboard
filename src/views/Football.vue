<template>
  <div class="bg-gray-800">
    <board
      field="football.svg"
      v_field="football-v.svg"
      :field_length="1060"
      :field_width="700"
    >
      <!-- <players :n="11" :scale="0.7" ball="soccer.svg" /> -->
      <panel :n_player="11" :scale="0.7" svg_ball="soccer.svg" />
    </board>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from "../components/Board.vue";
// import Players from "../components/Players.vue";
import Panel from "../components/Panel.vue";
import { useHead } from "@vueuse/head";

export default {
  name: "Home",
  setup: function () {
    useHead({
      // Can be static or computed
      title: "Football Tactical Board",
    });
  },
  metaInfo: {
    title: "Football",
  },
  components: {
    Board,
    // Players,
    Panel,
  },
};
</script>
