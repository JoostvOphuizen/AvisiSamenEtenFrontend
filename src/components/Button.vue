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
        iconLeft: {
            type: String,
        },
        iconRight: {
            type: String,
        },
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
    justify-content: center;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
}

.buttonPrimary {
    background-color: #1199BB;
    color: white;
}

.buttonSecondary {
    background-color: #EEEEEE;
    color: #333333;
}

.buttonIconLeft {
    width: 13px;
    height: 13px;
    margin-right: 8px;
}

.buttonIconRight {
    width: 13px;
    height: 13px;
    margin-left: 8px;
}

.buttonClass:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 10px;
    transform: translateY(-2px);
}

.buttonClass:active {
    box-shadow: none;
    transform: translateY(0);
}

</style>

<template>

<button :class="['buttonClass', type]">
    <img v-if="iconLeft" :src="iconLeft" alt="icon" class="buttonIconLeft" /> 
    
    <p>{{ label }}</p>
    
    <img v-if="iconRight" :src="iconRight" alt="icon" class="buttonIconRight" />
</button>

</template>

