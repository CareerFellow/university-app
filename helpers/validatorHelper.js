import { check, validationResult } from "express-validator/check";
import { matchedData, sanitize } from "express-validator/filter";

export const addUniValidator = [
  check('universityName', 'University name can not be empty.').isLength({min : 1}).withMessage('Name is required.'),
  check('address', 'Address is required.').isLength({min : 1 }).isLength({max : 10}).withMessage('Max length is 10.'),
  check('city', 'City is required').isLength({min : 1}),
  check('country', 'Country is required.').isLength({min : 1}),
  check('contact', 'Contact is required.').isLength({min : 1})
];