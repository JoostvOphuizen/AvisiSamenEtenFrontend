<script lang="ts">
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'buttonPrimary',
        },
    },
    methods: {
        onClick() {
            console.log('button clicked');
        },
    },
}

</script>

<style>

.buttonClass {
    background-color: #333333;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    margin: 0 4px;
}

.buttonPrimary {
    background-color: #1199BB;
    color: white;
}

.buttonSecondary {
    background-color: #EEEEEE;
    color: #333333;
}

</style>

<template>

<button :class="['buttonClass', type]" @click="onClick">
    {{ label }}
</button>

</template>

