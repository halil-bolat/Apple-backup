import * as vikimap from '../services/vikimap';
import * as ovp from '../services/ovp';
import * as queryParser from '../services/ovp/queryParser';
import * as configuration from '../services/configuration/configuration';
import * as status from '../services/status/status';

// Collect services to provide to the store
export default {
  vikimap,
  ovp,
  queryParser,
  configuration,
  status
};
