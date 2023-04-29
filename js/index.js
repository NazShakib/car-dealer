const App = Vue.createApp({
    data() {
        return {
            gallery_items :[],
            total: 0,
            happyCustomer: [
                "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
                "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
                "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
                "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"
            ],
            current: 0,
            slides: [],
            speed: 3000,
            timer: null
        }
    },
    methods: {
        startRotation: function () {
            this.timer = setInterval(this.next, this.speed);
        },
        stopRotation: function () {
            clearTimeout(this.timer);
            this.timer = null;
        },
        next: function () {
            var current = this.current;
            var next = current + 1;

            if (next > this.slides.length - 1) {
                next = 0;
            }
            this.current = next;
            this.setActive(this.current);
        },
        prev: function () {
            var current = this.current;
            var prev = current - 1;

            if (prev < 0) {
                prev = this.slides.length -1;
            }

            this.current = prev;
            this.setActive(this.current);
        },
        isActive: function (slide) {
            return this.current === slide;
        },
        setActive: function (slide) {
            this.current = slide;
        },
    },
    mounted() {
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        // gallery items
        axios.get('../data/car_data.json', config)
            .then(response => {
                this.gallery_items = response.data;
                this.total = Object.keys(this.gallery_items).length
                // random = randomIntFromInterval(1, this.total-5);
                // this.gallery_items= Object.entries(this.records).slice(random,random+6).map(entry => entry[1]);
            })
            .catch((e) => {
                console.error(e)
            })
        // happy customer
        this.startRotation();
    },
    created: function () {
        axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4723/slides.json')
            .then(function (response) {
                this.slides = response.data.slides
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    },

})
App.mount("#app");

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



