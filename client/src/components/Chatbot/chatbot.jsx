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
     id: "0",
     message: "Hello, Welcome to our shop",
     trigger: "1"
   },
   {
     id: "1",
     message: "Please type your name?",
     trigger: "2"
   },
   {
     id: "2",
     user: true,
     trigger: "3",
   },
   {
     id: "3",
     message: "Hi {previousValue}, Glad to know you !!",
     trigger: "4",
   },
   {
     id: "4",
     user: true,
     trigger: "5",
   },
   {
     id: "5",
     message: "In what can I help you?",
     trigger: "6",
   },
   {
     id: "6",
     user: true,
     trigger: "7",
   },
   {
     id: "7",
     message: "Help",
     trigger: "8",
   },
   {
     id: "8",
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