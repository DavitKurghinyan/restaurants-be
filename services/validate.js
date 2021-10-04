import { Validator } from 'node-input-validator';
import httpErrors from 'http-errors';
import _ from 'lodash';

async function Validate(inputs, rules, regex, customError, messages, manyErr) {
  const menuErrors = {};
  if (manyErr) {
    for (const e in inputs) {
      if (e) {
        const v = new Validator(inputs[e], rules, messages);
        if (!(await v.check())) {
          menuErrors[e] = v.errors;
        }
      }
    }
    if (_.isEmpty(menuErrors)) {
      throw httpErrors(422, { errors: menuErrors });
    }
  }
  let v = new Validator(inputs, rules, messages);
  if (!(await v.check())) {
    const errors = {};
    _.forEach(regex, (value, key) => {
      if (
        key === 'phone' &&
        !/^(374|\+374|0|)?(\d{2})(\d{2})(\d{2})(\d{2})$/.test(value)
      ) {
        errors.phone =
          'Please enter a valid phone number (+374|374|0)+8 numbers';
      }
      if (
        key === 'timing' &&
        !/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d)-(?:([01]?\d|2[0-3]):)?([0-5]?\d))$/.test(
          value,
        )
      ) {
        errors.timing = 'Please enter a valid timing(00:00-00:00)';
      }
    });
    _.forEach(v.errors, (e, k) => {
      errors[k] = e.message || e;
    });
    v.errors = errors;
    if (customError) {
      v = customError(v);
    }
    if (v) {
      throw httpErrors(422, v);
    }
  }
}

export default Validate;
