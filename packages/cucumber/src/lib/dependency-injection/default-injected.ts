import {registerProvider} from '@jest-automation/shared-utilities'
import {Store, World} from '@jest-automation/store'

registerProvider({
    World: World,
    Store: Store
})