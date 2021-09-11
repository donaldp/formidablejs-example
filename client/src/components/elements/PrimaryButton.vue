<template>
  <a
    :href="href"
    class="
      ml-8
      whitespace-nowrap
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      border border-transparent
      rounded-md
      shadow-sm
      text-sm
      font-bold
      text-white
      bg-gray-800
      hover:bg-gray-600
      transition-colors
    "
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['href'],
};
</script>
