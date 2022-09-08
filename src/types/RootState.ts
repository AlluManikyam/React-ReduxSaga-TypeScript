// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { Users } from 'store/userManagement/types'
import { CommonState } from 'store/common/types'

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  common: CommonState
  Users: Users
}
