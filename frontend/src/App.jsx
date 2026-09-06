import Todo from './components/Todo'

function App() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
            Daily focus
          </p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Make space for what matters.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
            A quiet place to capture the next useful thing and keep moving.
          </p>
        </header>
        <Todo />
      </div>
    </main>
  )
}

export default App
