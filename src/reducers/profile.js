import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ADD_FOLLOW,
    REMOVE_FOLLOW,

    FIND_PEOPLE,
    ADD_FOLLOW_PEOPLE
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
        case ADD_FOLLOW:
            return {
                ...state,
                profile: payload,
                    loading: false
            }
            case GET_PROFILES:
            case FIND_PEOPLE:
                return {
                    ...state,
                    profiles: payload.profiles,
                        loading: false
                }
                case ADD_FOLLOW_PEOPLE:
                    return {
                        ...state,
                        profiles: {
                                ...state.profiles.filter(
                                    profile => profile._id !== payload._id
                                )
                            },
                            loading: false
                    }
                    case REMOVE_FOLLOW:
                        return {
                            ...state,
                            profile: {
                                    ...state.profile,
                                    followers: state.profile.followers.filter(
                                        foll => foll !== payload
                                    )

                                },
                                loading: false
                        };

                    case CLEAR_PROFILE:
                        return {
                            ...state,
                            profile: null,
                                loading: false
                        }

                        case PROFILE_ERROR:
                            return {
                                ...state,
                                error: payload,
                                    loading: false
                            };
                        default:
                            return state;
    }
}