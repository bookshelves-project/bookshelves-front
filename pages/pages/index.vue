<template>
  <blocks-redirection
    :to="{
      name: 'index',
    }"
  />
</template>

<script>
export default {
  name: 'PagePages',
  middleware({ params, redirect }) {
    return redirect({
      name: 'index',
    })
  },
}
</script>
