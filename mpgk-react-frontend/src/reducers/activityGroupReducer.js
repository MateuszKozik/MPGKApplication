import { 
    GET_GROUPS, 
    DELETE_GROUP,
    ADD_GROUP, 
    UPDATE_GROUP
} from "../actions/types";

const initialState = {
    groups: [],
    group: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };

        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map((group) => {
                    if (group.groupId === action.payload.groupId) {
                        return {
                            ...group,
                            ...action.payload
                        };
                    } else {
                        return group;
                    }
                })
            };
        case ADD_GROUP:
        return {
            ...state,
            groups: [action.payload, ...state.groups]
        };

        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(
                    (group) => group.groupId !== action.payload
                )
            };

        default:
            return state;
    }
}
