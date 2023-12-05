<template>
  <div class="app">
    <Sidebar />
    <Login />
  </div>
</template>
<script setup>
import Login from "./pages/Login.vue";
import Sidebar from "./components/Sidebar.vue";
</script>
<style lang="scss">
:root {
  --primary: rgb(100, 193, 255);
  --primary-alt: rgb(75, 140, 184);
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
  width: 100vw;
  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
