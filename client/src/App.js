import './App.css';
import Chatbot from './components/Chatbot/chatbot';
import Routes from "./Routes";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes />
      <Chatbot />
    </div>
  );
}

export default App;
