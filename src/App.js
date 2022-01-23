import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {

  // const [likes, setLikes] = useState(5)
  // const [value, setValue] = useState('ТЕКСТ В ИНПУТЕ')

  return (
    <div className="App">
        Это функциональные компоненты
      <Counter/>
      <Counter/>

       <br/>
        Это классовый компонент
      <ClassCounter/>

    </div>
  );
}

export default App;
