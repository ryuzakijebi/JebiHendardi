// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStory from './Pages/AddStory';
import Test from './Pages/Home';
import AddChapter from './Pages/AddChapter';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/add-story" element={<AddStory />} />
            <Route path="/AddChapter" element={<AddChapter />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
