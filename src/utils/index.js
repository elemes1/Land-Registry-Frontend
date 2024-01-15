import lodash from './lodash'
import helpers from './helper'

export default (app) => {
  app.use(helpers)
  app.use(lodash)
}
