<template>
  <div :class="optieClass" @click="checkCheckbox($event)">
    <div v-if="restaurant" class="restaurant">
      <img v-if="icon" :src="icon" alt="icon" class="restaurantPictures" />
      <span style="margin-right:10px" class="optieLabel">{{ label }}</span>
      <span style="margin-right:10px" class="optieLabel">{{ adres }}</span>
    </div>
    <div v-else class="optieTitle">
      <img v-if="icon" :src="icon" alt="icon" class="optieIcon" />
        <span style="margin-right:10px" class="optieLabel">{{ label }}</span>
      <div class="optiePicturesWrapper">
        <img v-if="pictures" v-for="picture in pictures.slice(0,4)" :src="picture" alt="icon" class="optiePictures" />
        <span v-if="pictures&&pictures.length>4">En {{pictures.length-4}} meer...</span>
      </div>
    </div>
    <div v-if="!restaurant" class="checkbox-wrapper-46">
      <input class="inp-cbx" :id="label" type="checkbox" :checked="value" @change="onCheckboxChange" />
      <label class="cbx" :for="label"><span>
            <svg width="12px" height="10px" viewbox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg></span><span></span>
      </label>
    </div>
    <div v-else class="checkbox-wrapper-restaurant">
      <input class="inp-cbx" :id="label" type="checkbox" :checked="value" @change="onCheckboxChange" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseCheckBoxInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    restaurant: {
      type: Boolean,
      default: false,
    },
    adres: {
      type: String,
      default: '',
    },
    pictures: {
      type: Array as () => Array<string> | undefined,
      default: undefined,
    }
  },
  methods: {
    onCheckboxChange(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      const parentElement = checkbox.closest('.optieClass');

      if (parentElement) {
        if (checkbox.checked) {
          parentElement.classList.add('checked');
        } else {
          parentElement.classList.remove('checked');
        }
      }

      this.$emit('update:modelValue', checkbox.checked);
    },
    checkCheckbox(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('cbx') || target.closest('.cbx')) {
          // If the target is the label with the class 'cbx' or its child elements, stop the event propagation
          event.stopPropagation();
          return;
        }

        const checkbox = this.$el.querySelector('.inp-cbx') as HTMLInputElement;
        checkbox.click();
    },
  },
  computed: {
    optieClass() {
      return this.value ? 'optieClass checked' : 'optieClass';
    },
  },
};
</script>

<style scoped>

.optiePicturesWrapper {
  display: flex;
  align-items: center;
}

.optiePictures {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  border-radius: 50%;
}

.restaurantPictures {
  height: 3em;
  width: 3em;
  margin-right: 4px;
  border-radius: 33%;
  float: left;
}

.restaurant > span {
  margin-left: 4em;
}

.optieClass {
  background-color: var(--vt-c-black-soft);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin: 3px 4px;
  display: flex;
  justify-content: space-between;
}


.optieLabel {
  color: var(--vt-c-white);
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  display: flex;
}

.optieTitle {
  display: flex;
  align-items: center;
}

.optieIcon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
}

.checkbox-wrapper-restaurant {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-46 input[type="checkbox"] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-46 .cbx {
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}

.checkbox-wrapper-46 .cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}

.checkbox-wrapper-46 .cbx span:first-child {
    /* shadow inside the checkbox */
    box-shadow: inset 0 0 5px 3px #26282b60;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    transform: scale(1);
    vertical-align: middle;
    border: 1px solid #9098A9;
    transition: all 0.2s ease;
  }
  .checkbox-wrapper-46 .cbx span:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-46 .cbx span:first-child:before {
    content: "";
    width: 100%;
    height: 100%;
    background: var(--vt-c-indigo);
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
  }
  .checkbox-wrapper-46 .cbx span:last-child {
    padding-left: 8px;
  }
  .checkbox-wrapper-46 .cbx:hover span:first-child {
    border-color:  var(--vt-c-indigo);
  }

  .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child {
    background:  var(--vt-c-indigo);
    border-color:  var(--vt-c-indigo);
    animation: wave-46 0.4s ease;
  }
  .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }
  .checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child:before {
    transform: scale(3.5);
    opacity: 0;
    transition: all 0.6s ease;
  }

  @keyframes wave-46 {
    50% {
      transform: scale(0.9);
    }
  }

  .optieClass.checked {
    background-color: var(--vt-c-indigo);
  }

  .optieClass {
    padding: 2px 5px 2px 5px;
    margin: 2px;
  }

  .checkbox-wrapper-46 {
    margin-top: -2px;
  }





</style>
