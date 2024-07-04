// import './App.css'

import Hello from "./components/Hello"

function App() {
  const name = 'Muhammad Waseem';
  return (
    <>
      <div>
        <Hello name={name} />
        <h1 className="text-7xl text-blue-400 text-center underline ">Hello, waseem saleem!</h1>;
        <h1 className="text-3xl font-bold underline text-red-400 text-center">
          Hello world!
        </h1>

      </div>
    </>
  )
}

export default App
