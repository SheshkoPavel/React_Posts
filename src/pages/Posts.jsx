import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../components/hooks/usePosts";
import {useFetching} from "../components/hooks/useFetching";
import {getPageCount} from "../utils/pages";
import PostService from "../API/PostService";
import Counter from "../components/Counter";
import ClassCounter from "../components/ClassCounter";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


function Posts() {

    // const [likes, setLikes] = useState(5)
    // const [value, setValue] = useState('ТЕКСТ В ИНПУТЕ')
    const [posts, setPosts] = useState([
        {id: 1, title: "Javascript", body: "Description"},
        {id: 2, title: "Pyton", body: "Popular"},
        {id: 3, title: "C#", body: "Jaguar"},
        {id: 4, title: "Ajax", body: "Abcd"},

    ])

    const bodyInputRef = useRef();

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);



    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [] )

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            Это функциональные компоненты <br/><br/>
            <Counter/> <br/>
            <Counter/>

            <br/>
            Это классовый компонент
            <ClassCounter/>


            <br/><br/><br/>

            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 50 }}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про языки программирования"/>
            }
            <Pagination page={page}
                        changePage={changePage}
                        totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
