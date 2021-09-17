<template>
  <div id="app">
    <Sidebar />
    <main>
        <div class="container">
            <Nuxt />
        </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
    components: {
        Sidebar
    }
}
</script>