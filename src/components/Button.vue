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
        icon: {
            type: String,
        }
    },
}

</script>

<style>

.buttonClass {
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    margin: 4px;
    display: flex;
    align-items: center;
}

.buttonPrimary {
    background-color: #1199BB;
    color: white;
}

.buttonSecondary {
    background-color: #EEEEEE;
    color: #333333;
}

.buttonIcon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

</style>

<template>

<button :class="['buttonClass', type]">
    <img v-if="icon" :src="icon" alt="icon" class="buttonIcon" /> {{ label }}
</button>

</template>

