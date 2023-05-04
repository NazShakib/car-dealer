const App = Vue.createApp({
    data() {
        return {
            gallery_items :[],
            total: 0,
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
                const data = response.data;
                this.total = Object.keys(data).length
                const startIndex = randomIntFromInterval(1, this.total-6);
                this.gallery_items= Object.entries(data).slice(startIndex,startIndex+7).map(entry => entry[1]);
            })
            .catch((e) => {
                console.error(e)
            })
        // happy customer
        this.startRotation();
    },
    created: function () {
        axios.get('../data/happy_customer.json')
            .then(function (response) {
                this.slides = response.data.slides
                console.log(this.slides);
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



