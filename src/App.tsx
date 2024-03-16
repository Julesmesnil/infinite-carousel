import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  const items = [
    "https://unsplash.com/photos/ZNkiEWL02mI/download?force=true&w=640",
    "https://unsplash.com/photos/DDIjEwrtAJM/download?force=true&w=640",
    "https://unsplash.com/photos/XfG3mtbC3ns/download?force=true&w=640",
  ];

  return (
      <div className="container">
        <h1>Period Carousel</h1>
        <Carousel slides={items} />
      </div>
  );
}

export default App;
