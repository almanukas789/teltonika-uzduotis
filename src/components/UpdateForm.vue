<template>
  <form action="#">
    <Notification v-if="isShowing">{{ not_body }}</Notification>
    <div class="modal is-active" v-if="(is_showing = this.applied)">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Redaguoti straipsni</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal(tempData)"
          ></button>
        </header>
        <section class="modal-card-body">
          <caption>
            Pavadinimas
          </caption>
          <input class="input" v-model="tempData.title" required />
          <caption>
            Turinys
          </caption>
          <textarea class="textarea" v-model="tempData.body"></textarea>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateData(tempData)" type="submit">
            Redaguoti
          </button>
          <button class="button" @click="closeModal(tempData)">X</button>
        </footer>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import Notification from "@/components/Notification.vue";
import notification from "@/mixin/notification.js";
export default {
  props: ["applied", "tempData"],
  mixins: [notification],
  components: {
    Notification,
  },
  data() {
    return {
      is_showing: false,
      date: this.currentDate(),
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    closeModal(item) {
      if (item.title != "" && item.body != "") {
        this.is_showing = false;
        this.$emit("renew");
      }
    },
    updateData(item) {
      item.updated_at = this.date;

      if (item.title != "" && item.body != "") {
        axios
          .put(this.$jsonServer + "/posts/" + item.id, item)
          .then((response) => (this.articleId = response.data.id))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("ERRORAS!", error);
          });
        this.is_showing = false;
        this.$emit("renew");
        this.toast("Sekmingai paredeguota");
      }
    },
  },
};
</script>
