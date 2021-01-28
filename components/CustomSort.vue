<template>
  <div :class="$style['custom-select']" @blur="open = false">
    <div
      :class="[{ [$style.open]: open }, $style.selected]"
      @click="open = !open"
    >
      {{ label }} <span :class="$style.selectedOption">{{ selected }}</span>
    </div>
    <div :class="[{ [$style.selectHide]: !open }, $style.items]">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="chooseOption(option)"
      >
        По {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Сортировать по: ',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      selected: this.options[0],
    };
  },
  methods: {
    chooseOption(option) {
      this.selected = option;
      this.open = false;
      this.$emit('input', option);
    },
  },
};
</script>

<style lang="scss" module>
.custom-select {
  position: relative;
  text-align: left;
  outline: none;
}

.selectedOption {
  color: $gray-color;
}

.custom-select .selected {
  color: $black-color;
  padding-left: 1em;
  padding-right: 2em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 8px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: $gray-color transparent transparent transparent;
}

.custom-select .items {
  color: $black-color;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  background-color: $white-color;
  margin-top: 6px;
  //   left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: $grey-light-color;
  padding: 4px 2em 4px 1em;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.custom-select .items div:hover {
  background-color: $grey-extra-light-color;
  color: $black-color;
}

.selectHide {
  display: none;
}
</style>
