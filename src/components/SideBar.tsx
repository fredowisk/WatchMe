import "../styles/sidebar.scss";

export function SideBar({ genres }: {genres: JSX.Element[]}) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">{genres}</div>
    </nav>
  );
}
