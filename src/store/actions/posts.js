import { addNewPost, addNewComment} from "../reducers/posts";

export const addPost = post => addNewPost(post);
export const addComment = comment => addNewComment(comment);