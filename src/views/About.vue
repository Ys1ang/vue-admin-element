<template>
  <div class="about">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>


<script>
  export default {
    name: "about",
    data() {
      return {
        message: 'Hello'
      }
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例

        return this.message+'12';
      }
    },
    methods: {

    }
  }
</script>
