const App = Vue.createApp({

    created(){
        const uri = window.location.search.substring(1);
        const params = new URLSearchParams(uri);
        this.details_id = params.get('item');
    },
    data() {
        return {
            details_id: 1,
            current_item : [],
        }
    },
    mounted(){
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        axios.get('../data/car_data.json', config)
            .then(response => {
                this.current_item = response.data[this.details_id];
            })
            .catch((e) => {
                console.error(e)
            })

    },
    methods:{
        viewImage (index, car, evt){
            if (index > -1){
                $('.wc-image').attr("src", car.image_list[index]);
            }
            else {
                $('.wc-image').attr("src", car.thumbnail_img);
            }
        },
    }
})

App.mount("#details");