export default {
    data(){
        return {
            isShowing: false,
            not_body: "",
        }
    },
    methods: {
      toast(text) {
        this.isShowing = !this.isShowing
        this.not_body=text;
        setTimeout(() => {
            this.isShowing = !this.isShowing;
            this.$router.go();
        }, 1000);
      }
    }
  };