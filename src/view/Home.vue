<template>
  <div id="app" class="container is-max-desktop">
    <Style />
    <br /><br />
    <Pagination></Pagination>
    <Action_alert v-if="isShowingAlert">{{ actionName }}</Action_alert>
    <div style="text-align: center">
      <input
        class="input"
        style="text-align: center"
        v-model="filter"
        placeholder="Paieska"
      />
      <br /><br />
    </div>
    <div style="text-align: center">
      <button class="button is-info" @click="addNew">Prideti nauja straipsni</button>
    </div>
    <div class="card text-center m-3">
      <h1 v-if="errored == true" style="text-align: center">
        Nenuskaito duomenu {Error}
      </h1>
      <h1 v-if="errored == false && Posts == 0" style="text-align: center">
        Nera straipsniu
      </h1>
      <div style="text-align: center">
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
        <jw-pagination
          :items="filteredList"
          @changePage="onChangePage"
          :pageSize="4"
        ></jw-pagination>
      </div>
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
import Action_alert from "@/components/Action_alert.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import PostForm from "@/components/PostForm.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Style,
    Delete_alert,
    Action_alert,
    UpdateForm,
    PostForm,
    Pagination,
  },
  data() {
    return {
      actionName: "",
      Posts: [],
      pageOfItems: [],
      errored: false,
      filter: "",
      modalForAddAlert: false,
      deleteModal: false,
      tempData: null,
      isShowingAlert: false,
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
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    addNew() {
      this.modalForAddAlert = true;
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
  },
  computed: {
    filteredList() {
      return this.Posts.slice()
        .reverse()
        .filter((pageOfItems) => {
          return pageOfItems.title.toLowerCase().includes(this.filter.toLowerCase());
        });
    },
  },
};
</script>
