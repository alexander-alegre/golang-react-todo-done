import "./App.css";
import CreateTodoForm from "./components/CreateTodoForm";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">TODO App</a>
      </div>
      <div className="mb-10">
        <CreateTodoForm />
      </div>
      <TodoContainer />
    </>
  );
}

export default App;
