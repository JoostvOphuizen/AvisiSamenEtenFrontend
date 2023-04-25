<script lang="ts">
export default {
    name: 'Notificatie',
    props: {
        label: {
            type: String,
            required: true,
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

.notificatie {
    background-color: var(--vt-c-white);
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    margin: 4px;
    display: flex;
    align-items: center;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    max-height: 5px;
}

.notificatieIconLeft {
    width: 13px;
    height: 13px;
    margin-right: 8px;
    margin-left: 0;

}

.notificatieIconRight {
    width: 13px;
    height: 13px;
    margin-left: 8px;
}

.notificatieLabel {
    color: var(--vt-c-indigo);
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
    margin: 0 100px 0 0;
    display: flex;
}


</style>

<template>

<div class="notificatie">
    <img class="notificatieIconLeft" v-if="iconLeft" :src="iconLeft" />
    <p class="notificatieLabel">{{ label }}</p>
    <img class="notificatieIconRight" v-if="iconRight" :src="iconRight" />
</div>


</template>

