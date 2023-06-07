<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Search..."
      />
      <button @click="handleSearchClick" class="searchButton">
        <img src="@/assets/search.png" alt="search" class="searchButtonImage" />
      </button>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: "SearchBar",
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      handleInput() {
        this.$emit("search", this.searchQuery);
      },
      handleSearchClick() {
        this.$emit("search", this.searchQuery);
      },
    },
  });
  </script>
  <style scoped>
  .search-bar {
    display: flex;
    justify-content: center;
  }
  input {
    width: 100%;
    padding: 10px;
    border-radius: 9px 0 0 9px;
    border: none;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
  }
  .searchButtonImage {
    width: 20px;
    height: 20px;
  }
  .searchButton {
    background-color: var(--vt-c-indigo);
    border-radius: 0 9px 9px 0;
    border: none;
    margin-left: 5px;
    padding: 10px;
  }
  .searchButton:hover {
    background-color: #0e819e;
  }
  .searchButton:active {
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
  }
  .searchbar[type=text] {
    border: 1px solid #ff0000;
  }
  .search-bar::selection {
    background-color: #0e819e;
    color: var(--vt-c-white);
  }
  </style>
