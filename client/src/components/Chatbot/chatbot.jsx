import React from "react";
import ChatBot from "react-simple-chatbot";

function Chatbot(props) {
    const config = {
        width: "400px",
        height: "500px",
        floating: true
      };
  const steps = [
   {
     id: "Greet",
     message: "Hello, Welcome to our shop",
     trigger: "Ask Name"
   },
   {
     id: "Ask Name",
     message: "Please type your name?",
     trigger: "Waiting user input for name"
   },
   {
     id: "Waiting user input for name",
     user: true,
     trigger: "Asking options to eat",
   },
   {
     id: "Asking options to eat",
     message: "Hi {previousValue}, Glad to know you !!",
     trigger: "Waiting user for help",
   },
   {
       id: "Waiting user for help",
       user: true,
       trigger: "I need help",
   },
   {
       id: "I need help",
       message: "In what can I help you?",
       trigger: "Write your issue",
   },
   {
     id: "Write your issue",
     user: true,
     trigger: "See custome t-shirt",
   },
   {
    id: "See custome t-shirt",
    message: "Help",
    trigger: "Thank you",
   },
   {
       id: "Thank you",
       user: true,
       trigger: "Done"
   },
   {
     id: "Done",
     message: "Have a great day !!",
     end: true
   }
];

    return <ChatBot steps={steps} {...config} />;

}
export default Chatbot;