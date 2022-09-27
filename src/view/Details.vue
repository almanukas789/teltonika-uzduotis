<template>
  <div style="margin: auto; width: 60%">
    <br /><br />
    <Style />
    <delete_alert
      :tempData="tempData"
      :applied="deleteAlert"
      @renew="closeDeleteAlert"
      @deleted="deletedPosts"
    >
    </delete_alert>
    <notification v-if="isShowing">{{ not_body }}</notification>
    <UpdateForm :tempData="tempData" :applied="editModal" @renew="closeEditModal">
    </UpdateForm>
    <details-form v-if="this.isErrored != false">Tokio iraso nera</details-form>
    <details-form v-if="this.isErrored != true">
      <template v-slot:title>{{ Posts.title }}</template>
      <h1>Turinys:{{ Posts.body }}</h1>
      <br />
      <h1>Autorius:{{ Posts.author }}</h1>
      <br />
      <h1 v-if="Posts.updated_at == ''">Sukurta:{{ Posts.created_at }}</h1>
      <h1 v-if="Posts.updated_at != ''">Atnaujinta:{{ Posts.updated_at }}</h1>
      <br />
      <button class="button is-info is-light">
        <router-link
          :to="{
            name: 'Home',
          }"
        >
          <h3>Atgal</h3>
        </router-link>
      </button>
      <button class="button is-info is-light" @click="updatePost(Posts)">
        Redaguoti
      </button>
      <button class="button is-info is-light" @click="deletealert(Posts)" :key="Posts.id">
        X
      </button>
    </details-form>
  </div>
</template>

<script>
import Style from "@/components/Style.vue";
import DetailsForm from "@/components/DetailsForm.vue";
import axios from "axios";
import Delete_alert from "@/components/Delete_alert.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import Notification from "@/components/Notification.vue";
import notification from "@/mixin/notification.js";

export default {
  data() {
    return {
      tempData: [],
      Posts: [],
      editModal: false,
      deleteAlert: false,
      isErrored: true,
      created_date: this.currentDate(),
    };
  },
  mixins: [notification],
  components: {
    Notification,
    Style,
    DetailsForm,
    Delete_alert,
    UpdateForm,
  },
  mounted() {
    axios
      .get(this.$jsonServer + "/posts/" + this.$route.params.id)
      .then((response) => ((this.Posts = response.data), (this.isErrored = false)))
      .catch((error) => {
        console.log(error);
        this.isErrored = true;
      });
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    closeEditModal() {
      this.editModal = false;
    },
    deletedPosts() {
      this.toast("Straipsnis istrintas!");
      this.deleteAlert = false;
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 900);
    },
    closeDeleteAlert() {
      this.deleteAlert = false;
    },
    deletealert(item) {
      this.deleteAlert = true;
      this.tempData = item;
    },
    updatePost(item) {
      this.editModal = true;
      this.tempData = item;
    },
  },
};
</script>
