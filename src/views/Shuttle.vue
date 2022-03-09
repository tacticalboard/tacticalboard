<template>
  <div class="bg-gray-800">
    <board field="shuttle.svg" v_field="shuttle-v.svg">
      <panel :n_player="2" :scale="1." svg_ball="shuttlecock.svg" />
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
  name: "Shuttle",
  setup: function () {
    useHead({
      title: "Badminton Tactical Board",
    });
  },
  components: {
    Board,
    // Players,
    Panel
  },
  mounted: function () {
  },
};
</script>