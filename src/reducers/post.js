import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    GET_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_LIKES,
    REMOVE_COMMENT
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, actions) {
    const {
        type,
        payload
    } = actions;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                    loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                    loading: false
            }
            case ADD_POST:
                return {
                    ...state,
                    posts: [payload, ...state.posts],
                        loading: false
                };
            case UPDATE_LIKES:
                return {
                    ...state,
                    post: {
                            ...state.post,
                            likes: [...state.post.likes, payload.likes]
                        },
                        loading: false
                }
                case REMOVE_LIKES:
                    return {
                        ...state,
                        post: {
                                ...state.post,
                                likes: state.post.likes.filter(
                                    like => like._id.toString() !== payload.likes._id.toString()
                                )

                            },
                            loading: false
                    }
                    case DELETE_POST:
                        return {
                            ...state,
                            posts: state.posts.filter(post => post._id !== payload),
                                loading: false
                        }
                        case ADD_COMMENT:
                            return {
                                ...state,
                                post: {
                                        ...state.post,
                                        comments: payload
                                    },
                                    loading: false
                            }
                            case REMOVE_COMMENT:
                                return {
                                    ...state,
                                    post: {
                                        ...state.post,
                                        comments: state.post.comments.filter(
                                            comment => comment._id !== payload
                                        )
                                    }
                                }
                                case POST_ERROR:
                                    return {
                                        ...state,
                                        error: payload,
                                            loading: false
                                    }
                                    default:
                                        return state;
    }

}