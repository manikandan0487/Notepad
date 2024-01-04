import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import EditPosts from "./components/EditPosts";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";

function App() {
  
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post">
            <Route index element={<NewPost />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<EditPosts />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
