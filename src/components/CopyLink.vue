<template>
    <div class="copy-link">
      <span class="copy-link__text" @click="copyLink">{{ link }}</span>
      <button class="copy-link__button" @click="copyLink">
        <img src="@/assets/copy.png" alt="copy" class="copy-link__icon" />
        Kopieer
      </button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      link: {
        type: String,
        required: true,
      },
    },
    methods: {
      copyLink() {
        navigator.clipboard.writeText(this.link)
          .then(() => {
            console.log('Link gekopieerd naar klembord:', this.link);
          })
          .catch((error) => {
            console.error('Fout bij kopiëren naar klembord:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .copy-link {
    display: flex;
    align-items: center;
  }
  
  .copy-link__text {
    width: 100%;
    padding: 10px;
    border-radius: 9px 0 0 9px;
    background-color: #f2f2f2;
    color: #333;
    cursor: pointer;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .copy-link__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 0 9px 9px 0;
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white);
    border: none;
    cursor: pointer;
  }
  
  .copy-link__icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  
  .copy-link__button:hover {
    background-color: #0e819e;
  }
  
  .copy-link__button:active {
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
  }
  
  .copy-link__text::selection {
    background-color: #0e819e;
    color: var(--vt-c-white);
  }
  </style>
  