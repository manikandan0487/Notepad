import { useContext } from 'react';
import Post from './Post';
import DataContext from '../Context/DataContext';

const Feed = () => {
    const {searchResult} = useContext(DataContext)
    return (
        <>
            {searchResult.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}

export default Feed