<template>
  <div class="Flexbox">
    <div :class="{'highlight': highlight}" class="borderBox">
      <div class="RoundedColorBox" :style="{ backgroundColor: color } ">
        <img class="ChipIconLeft" v-if="icon" :src="icon" />
        <p class="ChipNumber" :style="{ backgroundColor: numberColor }" v-if="number">{{ number }}</p>
        <div class="ChipLabel" :class="{ 'TruncatedLabel': shouldTruncateLabel }">{{ truncatedLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseChip',
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'var(--vt-c-black-soft)',
    },
    number: {
      type: String,
    },
    numberColor: {
      type: String,
      default: 'var(--vt-c-indigo)',
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      truncatedLabel: '',
      shouldTruncateLabel: false,
    };
  },
  mounted() {
    this.truncateLabel();
    window.addEventListener('resize', this.truncateLabel);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.truncateLabel);
  },
  methods: {
    truncateLabel() {
      const labelElement = this.$el.querySelector('.ChipLabel');
      if (labelElement) {
        const maxWidth = labelElement.offsetWidth;
        const label = this.label;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          return;
        }
        context.font = getComputedStyle(labelElement).font;
        const truncatedLabel = label.substring(0, 23) + '...';
        const labelWidth = context.measureText(label).width;
        const truncatedLabelWidth = context.measureText(truncatedLabel).width;
        this.shouldTruncateLabel = labelWidth > maxWidth;
        this.truncatedLabel = this.shouldTruncateLabel ? truncatedLabel : label;
      }
    },
  },
};
</script>

<style scoped>

.highlight {
  background-color: var(--vt-c-indigo);
  border-radius: 10px;
  border: 1px solid var(--vt-c-indigo);
  box-sizing: border-box;
  padding-right: 7px;
}

.borderBox{
  width: 100%;
  height: 100%;
}

.Flexbox {
  display: flex;
  align-items: center;
  width: 100%;
}

.ChipIconLeft {
  width: 25px;
  height: 25px;
  margin-right: 8px;
  margin-left: 2px;
  position: absolute;
  left: 2px;
  border-radius: 50%;
}

.RoundedColorBox {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 16px 6px 16px 18px;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  margin: 4px;
  max-height: 10px;
  width: 100%;
}

.ChipLabel {
  color: var(--vt-c-white);
  font-size: 13px;
  line-height: 24px;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  padding-left: 17px;
  flex-grow: 1; 
}

.TruncatedLabel {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ChipNumber {
  color: var(--vt-c-white);
  font-size: 13px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 2px;
  border-radius: 50%;
  background-color: var(--vt-c-indigo);
  width: 25px;
  height: 25px;
  margin-left: 2px;
}

</style>
