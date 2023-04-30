// import { Email } from "./smtp/smtp.js";
// https://www.youtube.com/watch?v=5EZsRnJpUNU
// info@rnsautomobiles.net

const App =  Vue.createApp({

    data(){
        return {
            name: "",
            toEmail: "coder.rafi@gmail.com",
            message: "",
            fromEmail: "",
            phone:"",
            title:"New Notification From Contact Box!",
            responseMessage: ""
        }
    },
    methods:{
        sentEmail(){
            emailjs.init('KiRckaBys43aXYxQ0');
            emailjs.send("service_8e2ue89","template_mn2ouy7",{
                name: this.name,
                phone: this.phone,
                message: this.message,
                title: this.title,
                fromEmail: this.fromEmail,
                toEmail: this.toEmail,
            }).then(
                message => {
                    this.responseMessage = message
                }
            );
        }

    }

})

App.mount("#send_email");