<template>
  <div class="container is-max-desktop">
    <div>
      <div class="offset">
        <!--  -->
        <div style="text-align: center">
          <div v-for="item in displayedPosts" :key="item.id"></div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <div class="columns is-mobile">
          <div class="column">
            <button
              type="button"
              class="button is-link is-outlined"
              v-if="page != 1"
              @click="page--"
            >
              Previous
            </button>
          </div>
          <div class="column">
            <button
              type="button"
              class="button is-link is-outlined"
              v-for="pageNumber in pages.slice(page - 1, page + 5)"
              @click="page = pageNumber"
            >
              {{ pageNumber }}
            </button>
          </div>
          <div class="column">
            <button
              type="button"
              @click="page++"
              v-if="page < pages.length"
              class="button is-link is-outlined"
            >
              Next
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["perPage", "posts", "filter"],

  data() {
    return {
      page: 1,
      pages: [],
    };
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.filteredList.length / this.perPage);
      this.pages = [];
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(filteredList) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.$emit("onPageChange", filteredList.slice(from, to));
      return filteredList.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.filteredList);
    },
    filteredList() {
      return this.posts
        .slice()
        .reverse()
        .filter((data) => {
          return data.title.toLowerCase().includes(this.filter.toLowerCase());
        });
    },
  },
  watch: {
    filteredList() {
      this.setPages();
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>
