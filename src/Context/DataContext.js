import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../custom_hooks/useWindowSize";
import useAxiosFetch from "../custom_hooks/useAxiosFetch";
import api from "../api/posts"

const DataContext = createContext({});

export const DataProvider = ({children}) => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );


  useEffect(() => {
    setPosts(data || JSON.parse(localStorage.getItem('userData')));
  }, [data]);

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        (post.body?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (post.title?.toLowerCase() || "").includes(search.toLowerCase())
    );
    setSearchResult(filterResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      localStorage.setItem('userData',JSON.stringify(allPosts))
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      const newData =  posts.map((post) => (post.id === id ? { ...response.data } : post))
      setPosts(newData);
      localStorage.setItem('userData',JSON.stringify(newData))
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      localStorage.setItem('userData',JSON.stringify(postsList))
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResult,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleDelete,
        editTitle,
        editBody,
        setEditTitle,
        setEditBody,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
