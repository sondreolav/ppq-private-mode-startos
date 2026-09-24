import { sdk } from '../sdk'
import { configureApiKey } from './configureApiKey'
import { showServiceUrl } from './showServiceUrl'

export const actions = sdk
  .Actions.of()
  .addAction(configureApiKey)
  .addAction(showServiceUrl)