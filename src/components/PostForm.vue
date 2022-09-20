<template>
  <form action="#">
    <div class="modal is-active" v-if="(is_showing = this.applied)">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Prideti nauja straipsni</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <caption>
            Pavadinimas
          </caption>
          <input class="input" v-model="title" required />
          <p style="text-align: center; margin-top: 10px">Autorius</p>
          <div class="select">
            <select v-model="author" required>
              <option v-for="item in Authors" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <caption>
            Turinys
          </caption>
          <textarea class="textarea" v-model="body" required></textarea>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="add_new_data()" type="submit">
            Prideti
          </button>
          <button class="button" @click="closeModal">X</button>
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
      author: "",
      title: "",
      body: "",
      Authors: [],
      createdDate: this.currentDate(),
    };
  },
  mounted() {
    axios
      .get(this.$jsonServer + "/authors")
      .then((response) => (this.Authors = response.data))
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    closeModal() {
      this.is_showing = false;
      this.$emit("renew");
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    add_new_data() {
      if (this.title != "" && this.author != "" && this.body != "") {
        const tempData = {
          title: this.title,
          author: this.author,
          body: this.body,
          created_at: this.createdDate,
          updated_at: "",
        };
        axios
          .post(this.$jsonServer + "/posts", tempData)
          .then((response) => (this.articleId = response.data.id))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("ERRORAS!", error);
          });
        this.$emit("renew");
        this.$router.go();
        this.title = "";
        this.body = "";
        this.author = "";
      }
    },
  },
};
</script>
