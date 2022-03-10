<script setup lang="ts">
import Game from "@/components/Game.vue";
import { provide } from "vue";

const { VITE_WORD_LENGTH_LIMIT, VITE_RETRY_LIMIT } = import.meta.env;
const wordle = {
  wordLengthLimit: Number(VITE_WORD_LENGTH_LIMIT),
  retryLimit: Number(VITE_RETRY_LIMIT),
};

provide("wordle", wordle);
</script>

<template>
  <header class="flex flex-col">
    <h2 class="text-red-600 text-size-45px">
      The Game
    </h2>
    <game></game>
  </header>

  <main>
    <div>
      Stats
    </div>
  </main>
</template>

<style>
@import "@/assets";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
