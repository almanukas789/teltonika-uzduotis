<template>
  <div id="app" class="container is-max-desktop">
    <Style />
    <br /><br />
    <div style="text-align: center">
      <input
        class="input"
        style="text-align: center"
        v-model="filter"
        placeholder="Paieska"
      />
      <notification v-if="isShowing">{{ not_body }}</notification>
      <br /><br />
      <div style="text-align: center">
        <button class="button is-info" @click="addNew">Prideti nauja straipsni</button>
      </div>
    </div>
    <div class="card text-center m-3">
      <div style="text-align: center">
        <h1 v-if="errored == true">Neprisijungia prie duomenu</h1>
        <div v-for="item in pageOfItems" :key="item.id">
          <router-link
            :to="{
              name: 'Details',
              params: item,
            }"
          >
            <h3>{{ item.title }}</h3>
          </router-link>
          <p>Autorius: {{ item.author }}</p>
          <p v-if="item.updated_at == ''">Sukurta: {{ item.created_at }}</p>
          <p v-if="item.updated_at != ''">Atnaujinta: {{ item.updated_at }}</p>
          <button class="button is-info is-light" @click="updatePost(item)">
            Redaguoti
          </button>
          <button
            class="button is-info is-light"
            @click="deletealert(item)"
            :key="item.id"
          >
            X
          </button>
          <hr />
        </div>
      </div>
      <Pagination
        :perPage="4"
        :posts="Posts"
        :filter="filter"
        @onPageChange="pageChange"
      ></Pagination>
    </div>

    <delete_alert :tempData="tempData" :applied="deleteModal" @renew="close_alert">
    </delete_alert>
    <UpdateForm
      :tempData="tempData"
      :applied="editModal"
      @renew="closeEditModal"
    ></UpdateForm>
    <PostForm :applied="modalForAddAlert" @renew="closeNew"></PostForm>
  </div>
</template>

<script>
import axios from "axios";
import Style from "@/components/Style.vue";
import Delete_alert from "@/components/Delete_alert.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import PostForm from "@/components/PostForm.vue";
import Pagination from "@/components/Pagination.vue";
import Notification from "@/components/Notification.vue";
import notification from "@/mixin/notification.js";
export default {
  mixins: [notification],
  components: {
    Style,
    Delete_alert,
    UpdateForm,
    PostForm,
    Pagination,
    Notification,
  },
  data() {
    return {
      Posts: [],
      pageOfItems: [],
      errored: false,
      filter: "",
      modalForAddAlert: false,
      deleteModal: false,
      tempData: null,
      editModal: false,
    };
  },
  mounted() {
    axios
      .get(this.$jsonServer + "/posts")
      .then((response) => (this.Posts = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },

  methods: {
    close_alert() {
      this.deleteModal = false;
    },
    deletealert(item) {
      this.deleteModal = true;
      this.tempData = item;
    },
    addNew() {
      this.modalForAddAlert = true;
    },
    pageChange(item) {
      this.pageOfItems = item;
    },
    closeNew() {
      this.modalForAddAlert = false;
    },
    updatePost(item) {
      this.editModal = true;
      this.tempData = item;
    },
    closeEditModal() {
      this.editModal = false;
    },
    toast(item) {
      this.toast(item);
    },
  },
};
</script>
