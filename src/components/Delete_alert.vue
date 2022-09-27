<template>
  <div class="modal is-active" v-if="(is_showing = this.applied)">
    <Notification v-if="isShowing">{{ not_body }}</Notification>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ar Tikrai norite istrinti?</p>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="delete_action()">Istrinti</button>
        <button class="button" @click="close_alert()">X</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Notification from "@/components/Notification.vue";
import notification from "@/mixin/notification.js";

export default {
  mixins: [notification],
  components: {
    Notification,
  },
  props: ["applied", "tempData"],
  data() {
    return {
      is_showing: false,
    };
  },
  methods: {
    close_alert() {
      this.is_showing = false;
      this.$emit("renew");
    },
    delete_action() {
      this.is_showing = false;
      axios
        .delete(this.$jsonServer + `/posts/${this.tempData.id}`)
        .then((response) => {
          console.log();
        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.$emit("renew");
      this.$emit("deleted", this.tempData);
    },
  },
};
</script>
