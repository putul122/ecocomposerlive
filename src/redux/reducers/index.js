import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import registerProcessReducer from './registerProcessReducer/registerProcessReducerReducer'
import componentTypeReducer from './componentTypeReducer/componentTypeReducerReducer'
import applicationDetailReducer from './applicationDetailReducer/applicationDetailReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import componentTypeComponentReducer from './componentTypeComponentReducer/componentTypeComponentReducerReducer'
import signUpReducer from './signUpReducer/signUpReducerReducer'
import discussionReducer from './discussionReducer/discussionReducerReducer'
import newDiscussionReducer from './newDiscussionReducer/newDiscussionReducerReducer'
import tasksReducer from './tasksReducer/tasksReducerReducer'
import explorerReducer from './explorerReducer/explorerReducerReducer'
import usersReducer from './usersReducer/usersReducerReducer'
import sheetsReducer from './sheetsReducer/sheetsReducerReducer'

export default combineReducers({
    basicReducer,
    loginReducer,
    registerProcessReducer,
    componentTypeReducer,
    applicationDetailReducer,
    applicationActivityReducer,
    componentTypeComponentReducer,
    signUpReducer,
    discussionReducer,
    newDiscussionReducer,
    tasksReducer,
    explorerReducer,
    usersReducer,
    sheetsReducer
})
