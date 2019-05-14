import * as config from '../config/config';
import { verify } from '../utils/slackVerification';

/**
 * Validate slack request.
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
export function verifySlackRequest(req, res, next) {
  if (!config.get().notifications.slack.enabled) {
    return res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
  }

  return verify(req)
    .then(() => next())
    .catch(err => {
      res.sendStatus(err);
    });
}
