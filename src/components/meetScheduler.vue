<template>
  <div>
    <!-- Add any other content you want to display above the widget -->
    <iframe
      src="YOUR_CALENDLY_LINK"
      frameborder="0"
      style="min-width: 320px; height: 630px;"
    ></iframe>
    <!-- Add any other content you want to display below the widget -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Adjust the size and positioning of the iframe as needed */
iframe {
  width: 100%;
  height: 100%;
}
</style>
