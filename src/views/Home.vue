<template>
  <div class="bg-gray-800 min-h-screen text-white">
    <div>
      <div class="absolute top-5 right-5">
        <github-button
          href="https://github.com/tacticalboard/tacticalboard"
          data-show-count="true"
          aria-label="Star tacticalboard/tacticalboard on GitHub"
          >Star</github-button
        >
      </div>
      <div class="absolute mx-auto bottom-5 left-0 right-0 text-center">
        <p class="text-sm text-gray-400">
          Developed by <a href="https://github.com/hughplay">@hughplay</a>
        </p>
      </div>
    </div>
    <div class="pt-10 text-center">
      <p class="text-5xl mr-2">Tactical Board</p>
      <p class="mt-6 text-xl text-gray-400">Make tactical communication convenient.</p>
    </div>
    <div class="px-2 mx-auto max-w-3xl mt-16">
      <div class="flex items-end justify-around text-center flex-wrap">
        <card route="/shuttle" screenshot="screenshot/shuttle.jpg">Badminton</card>
        <card route="/football" screenshot="screenshot/football.jpg">Football</card>
        <card route="/basketball" screenshot="screenshot/basketball.jpg">Basketball</card>
      </div>
    </div>
    <div>
      <p class="text-center text-xs mt-5 text-gray-400">
        *Double click the ball to enter/exit the full screen mode.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useHead } from "@vueuse/head";
import GithubButton from "vue-github-button";
import Card from "../components/Card.vue"

export default {
  name: "Home",
  components: {
    GithubButton,
    Card
  },
  setup: function () {
    useHead({
      title: "Tactical Board",
    });
  },
};
</script>