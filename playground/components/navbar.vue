<template>
  <ul
    class="container py-10 d-flex gap-8 j-content-center list-style-none text-110"
    _="(li a) text-c-invert ts-300 (li a:hover) text-c:-20"
  >
    <li>
      <NuxtLink href="/">
        Home
      </NuxtLink>
    </li>
    <li>
      <NuxtLink href="/about">
        About
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavbarComponent"
}
</script>

<style scoped>

</style>
