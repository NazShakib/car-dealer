const App = Vue.createApp({
    // el: "#gallery",
    data() {
        return {
            page: 0,
            perPage: 9,
            records: []
        }
    },
    mounted() {
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        // gallery items
        axios.get('../data/car_data.json', config)
            .then(response => {
                this.records = response.data;
            })
            .catch((e) => {
                console.error(e)
            })
    },
    methods: {
        nextPage(){
            this.page++;
        },
        prevPage(){
            this.page--;
        }
    },
    computed: {
        displayedRecords() {
            const startIndex = this.perPage * this.page;
            const endIndex = startIndex + this.perPage;
            return Object.entries(this.records).slice(startIndex,endIndex).map(entry => entry[1]);
        },
        pageCount(){
            let l = Object.keys(this.records).length,
                s = this.perPage;
            console.log(l, s);
            return Math.ceil(l/s);
        }
    },

})

App.mount("#gallery");
