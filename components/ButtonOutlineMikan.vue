<template>
  <button
    class="outline-button--colored">
    <slot>Text</slot>
  </button>
</template>

<style scopend lang=scss>
@import "../assets/styles/ui.scss";
@import "../assets/styles/colors.scss";

.outline-button--colored {
  @include outline-button($mikan);
}
.outline-button--colored:hover {
  @include outline-button-hover($mikan);
}
</style>
