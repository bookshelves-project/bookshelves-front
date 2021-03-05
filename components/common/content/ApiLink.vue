<template>
  <a
    :href="`${apiUrl}/api/documentation`"
    target="_blank"
    rel="noopener noreferrer"
    >API documentation</a
  >
</template>

<script>
export default {
  name: 'ApiLink',
  data() {
    return {
      apiUrl: process.env.API_URL,
    }
  },
}
</script>
