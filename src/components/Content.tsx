import "../styles/content.scss";

export function Content({ title, movies }: { title: string; movies: JSX.Element[] }) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">{movies}</div>
      </main>
    </div>
  );
}
