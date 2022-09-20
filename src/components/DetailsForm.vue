<template>
    <div id="app" class="container is-max-desktop">
      <article class="message is-info">
        <div style="background-color: LightBlue; border-radius: 25px">
          <slot name="title"></slot>
        </div>
        <div class="message-body">
          <slot></slot>
        </div>
      </article>
    </div>
  </template>
  <script>
  export default {};
  </script>
  