<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [""],
      page: 1,
      perPage: 5,
      pages: [],
    };
  },
  mounted() {
    axios
      .get(this.$jsonServer + "/posts")
      .then((response) => (this.posts = response.data))
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
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
<template>
  <div class="container is-max-desktop">
    <div class="card text-center m-3">
      <div class="offset">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in displayedPosts">
              <td>{{ p.title }}</td>
              <td>{{ p.author }}</td>
              <td>{{ p.created_at }}</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button type="button" class="page-link" v-if="page != 1" @click="page--">
                Previous
              </button>
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                v-for="pageNumber in pages.slice(page - 1, page + 5)"
                @click="page = pageNumber"
              >
                {{ pageNumber }}
              </button>
            </li>
            <li class="page-item">
              <button
                type="button"
                @click="page++"
                v-if="page < pages.length"
                class="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
