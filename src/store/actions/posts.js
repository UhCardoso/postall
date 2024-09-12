import { addNewPost, addNewComment} from "../reducers/posts";
import axios from "axios";

export const addPost = post => {
    return dispatch => {
        axios.post('/posts.json', {...post})
            .catch(err => console.log(err))
            .then(res => console.log(res.data))
    }
    
    //addNewPost(post);
}
export const addComment = comment => addNewComment(comment);