// https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = "238d25d65d5f4cde903e8bbc7fd4fb6d";

function buildUrl (url) {
    return NYTBaseUrl + url + ".json?api-key=" + ApiKey;
}

const vm = new Vue({
    el: '#app',
    data: {
      results: []
    },
    mounted() {
      this.getPosts('home');
    },
    methods: {
        getPosts(section) {
            let url = buildUrl(section);
            axios.get(url).then((response) => {
                this.results = response.data.results;
            }).catch(error => {console.log(error)})
        }
    },
    computed: {
        processedPosts() {
            let posts = this.results;
            
            //add image_url
            posts.map(post => {
                let imgObj = post.multimedia.find(media => media.format === "superJumbo");
                post.image_url = imgObj ? imgObj.url : "http://via.placeholder.com/300x200";
            });

            //put into chunks
            let i, j, chunkedArray = [], chunk = 4;
            for (i=0, j=0; i<posts.length; i+=chunk, j++) {
                chunkedArray[j] = posts.slice(i, i+chunk);
            }
            return chunkedArray;
        }
    }
  });