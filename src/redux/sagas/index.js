import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchLoginUser, {actionCreators as loginActions} from './login/loginSaga'
import watchCreateUser, {actionCreators as signUpActions} from './signUp/signUpSaga'
import watchRegisterProcess, {actionCreators as registerProcessActions} from './registerProcess/registerProcessSaga'
import watchComponentType, {actionCreators as componentTypeActions} from './componentType/componentTypeSaga'
import watchApplicationDetail, {actionCreators as applicationDetailActions} from './applicationDetail/applicationDetailSaga'
import watchApplicationActivity, {actionCreators as applicationActivityActions} from './applicationActivity/applicationActivitySaga'
import watchComponentTypeComponent, {actionCreators as componentTypeComponentActions} from './componentTypeComponent/componentTypeComponentSaga'
import watchDiscussions, {actionCreators as discussionActions} from './discussion/discussionSaga'

export const actions = {
  basicActions,
  loginActions,
  signUpActions,
  registerProcessActions,
  componentTypeActions,
  applicationDetailActions,
  applicationActivityActions,
  componentTypeComponentActions,
  discussionActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchCreateUser(),
    watchLoginUser(),
    watchRegisterProcess(),
    watchComponentType(),
    watchApplicationDetail(),
    watchApplicationActivity(),
    watchComponentTypeComponent(),
    watchDiscussions()
  ]
}
