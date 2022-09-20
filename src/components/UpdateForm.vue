<template>
  <form action="#">
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
export default {
  props: ["applied", "tempData"],
  data() {
    return {
      is_showing: false,
    };
  },
  methods: {
    closeModal(item) {
      if (item.title != "" && item.body != "") {
        this.is_showing = false;
        this.$emit("renew");
      }
    },
    updateData(item) {
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
        this.$router.go();
      }
    },
  },
};
</script>
