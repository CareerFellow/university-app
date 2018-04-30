import Joi from 'joi';


module.exports = {

  validateParams : (schema) => {
    ( req, res, next ) => {
      const result = Joi.validate(req.param , schema);
      if(result.error){
        req.flash('error', result.error.message);
      }else{
        next();
      }
    }
  },

  validateBody : (schema) => {
    return (req, res, next) => {
    try{
    const result = Joi.validate(req.body, schema);
      if(result.error) {
        console.log(result)
        req.flash('error' , result.error.message);
        res.redirect('/university/add');
        return;
      }
    next();
    }catch(error){
      next(error);
    }
    }
  },

  schemas : {
    addUniversity : Joi.object().keys({
      universityName : Joi.string().required().error(new Error('University name is required.')),
      address : Joi.string().required().error(new Error('Address is required.')),
      city : Joi.string().required().error(new Error('City is required.')),
      country : Joi.string().required().error(new Error('Country is required.')),
      contact : Joi.string().required().error(new Error('Contact number is required.'))
    }),

    updateUniversity : Joi.object().keys({
      universityName : Joi.string(),
      address : Joi.string(),
      city : Joi.string(),
      country : Joi.string(),
      contact : Joi.string()
    }),

    replaceUniversity : Joi.object().keys({
      universityName : Joi.string().required(),
      address : Joi.string().required(),
      city : Joi.string().required(),
      country : Joi.string().required(),
      contact : Joi.string().required()
    }),

    paramsSchema : Joi.object().keys({
      param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })    
  }
};