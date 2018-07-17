import { check, validationResult } from "express-validator/check";
import { matchedData, sanitize } from "express-validator/filter";

export const addUniValidator = [
  check('universityName', 'University name can not be empty.').isLength({min : 1}).withMessage('Name is required.'),
  check('address', 'Address is required.').isLength({min : 1 }).isLength({max : 10}).withMessage('Max length is 10.'),
  check('city', 'City is required').isLength({min : 1}),
  check('country', 'Country is required.').isLength({min : 1}),
  check('contact', 'Contact is required.').isLength({min : 1})
];

export const signupValidator = [
  check('firstName').isLength({min : 1}).withMessage('First name is required.'),
  check('lastName').isLength({min : 1}).withMessage('Last name is required.'),
  check('username').isLength({min : 6}).withMessage('Username should be at least 6 characters long.'),
  check('password').isLength({min : 6}).withMessage('Password should be at least 6 characters long.')
]

export const signinValidator = [
  check('username').isLength({ min : 1 }).withMessage('Username is required.'),
  check('password').isLength({ min : 1 }).withMessage('Password is required.')
]

export const forgotPasswordValidator = [
  check('username').isLength({ min : 1 }).withMessage('Username is required.'),
  check('password', 'Password is required.').isLength({ min : 1 }),
  // check('confirmPassword').equals('password').withMessage('Password doesnt match.')
]

export const programValidator = [
  check('programName').isLength({ min : 1 }).withMessage('Program name is required.'),
  check('departmentName').isLength({ min : 1 }).withMessage('Department name is required.'),
  check('degree').isLength({ min : 1 }).withMessage('Degree is required.'),
  check('duration').isLength({ min : 1 }).withMessage('Duration is required.'),
  check('entryRequirement').isLength({ min : 1 }).withMessage('Entry requirement is required.'),
  check('totalFee').isLength({ min : 1 }).withMessage('Fee is required.'),
  check('programType').isLength({ min : 1 }).withMessage('Program type is required.'),
  check('creditHours').isLength({ min : 1 }).withMessage('Credit hours are required.'),
]

// check if user is logged in
export const checkAuth = (req, res, next) => {
  if(!req.session.user){
    req.flash('success', 'Please log in to continue.')
    res.redirect('/signin')
  }else{
    next();
  }
}

