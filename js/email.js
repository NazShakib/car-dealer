import { Email } from "@../smtp/smtp.js";
// https://www.youtube.com/watch?v=5EZsRnJpUNU

const App =  Vue.createApp({

    data(){
        return {
            name: "",
            email: "",
            message: ""
        }
    },
    methods:{
        prepareMessageBody(){
          return "";
        },
        sentEmail(){
            Email.send({
                SecureToken : "",
                To : this.email,
                From : "",
                Subject : "New Notification From Contact Box!",
                Body : this.prepareMessageBody()
            }).then(
                message => alert(message)
            );
        }

    }

})

App.mount("#send_email");