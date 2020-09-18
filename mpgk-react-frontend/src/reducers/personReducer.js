import { 
    GET_PERSONS,  
    ADD_PERSON,
    UPDATE_PERSON
} from "../actions/types";

const initialState = {
    persons: [],
    person: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PERSONS:
            return {
                ...state,
                persons: action.payload
            };

        case UPDATE_PERSON:
            return {
                ...state,
                persons: state.persons.map((person) => {
                    if (person.personId === action.payload.personId) {
                        return {
                             ...person,
                            ...action.payload
                        };
                    } else {
                        return person;
                    }
                })
            };
        case ADD_PERSON:
            return {
                ...state,
                persons: [action.payload, ...state.persons]
            };

        default:
            return state;
    }
}