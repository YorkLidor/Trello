import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'
export const LOGIN_USER = 'LOGIN_USER'



const initialState = {
    user: userService.getLoggedinUser(),
    users: [
        {
            "_id": "u101",
            "fullname": "Gal Zohar",
            "username": "galzo@ggmail.com",
            "password": "aBambi123",
            "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg",
            "mentions": [{ //optional
                "id": "m101",
                "boardId": "m101",
                "taskId": "t101"
            }]
        },
        {
            "_id": "u102",
            "fullname": "Abi Abambi",
            "username": "abi@ababmi.com",
            "password": "aBambi123",
            "imgUrl": "http://some-img.jpg",
            "mentions": [{ //optional
                "id": "m101",
                "boardId": "m101",
                "taskId": "t101"
            }]
        },
        {
            "fullname": "Kochava Shavit",
            "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1674765132/latest_c40bvk.png",
            "mentions": [],
            "password": "123",
            "username": "kocavha",
            "_id": "2OQJU"
        }],
    userAction: null
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case LOGIN_USER:
            return { ...state, user: action.user }
        default:
            return state
    }
}


