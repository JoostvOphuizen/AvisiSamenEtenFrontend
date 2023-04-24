<template>
    <div class="glass">
        <span>
            <h1 class="h1text">{{ label }}</h1>
            <h1 class="blueText">{{ blueText }}</h1>
        </span>
        <AppButton :label="buttonLabel" class="button" @click="$emit('click')" :iconRight="icon"></AppButton>
    </div>
</template>
<style scoped>

.glass {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    padding: 5px 10px 10px 10px;
    margin: 20px 0;
    display: flex;
    width: fit-content;
    height: fit-content;
}

.h1text {
    color: var(--vt-c-white);
    margin: 0;
    display: inline;
    font-weight: 600;
}

.blueText {
    color: var(--vt-c-blue);
    margin: 0;
    display: inline;
    font-weight: 600;
}


</style>

<script lang="ts">
import AppButton from '@/components/Button.vue'
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        blueText: {
            type: String,
        },
        buttonLabel: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
    },
    components: {
        AppButton
    }
}
</script>

