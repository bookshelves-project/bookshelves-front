<template>
  <div class="bg-gradient-to-r from-primary-300 to-primary-500 py-16 px-8">
    <div class="max-w-7xl mx-auto">
      <app-tabs>
        <app-tab name="Books" :selected="true">
          <div>A lot of books.</div>
        </app-tab>
        <app-tab name="Authors">
          <div>Amazing authors.</div>
        </app-tab>
        <app-tab name="Series">
          <div>So much books into series.</div>
        </app-tab>
      </app-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTabsExample',
}
</script>
