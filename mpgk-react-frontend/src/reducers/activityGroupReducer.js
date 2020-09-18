import { 
    GET_GROUPS, 
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

        default:
            return state;
    }
}
