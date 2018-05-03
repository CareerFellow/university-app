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
    let url = req.header('Referer') || '/';
      if(result.error) {
        req.flash('detailed_msg' , result.value)
        res.redirect(url);
        return;
      }
    next();
    }catch(error){
      next(error);
    }
    }
  },

  schemas : {
    validateUniversity : Joi.object().options({ abortEarly : false }).keys({
      universityName : Joi.string().required().error(new Error('University name is required.')),
      address : Joi.string().required().error(new Error('Address is required.')),
      city : Joi.string().required().error(new Error('City is required.')),
      country : Joi.string().required().error(new Error('Country is required.')),
      contact : Joi.string().required().error(new Error('Contact  is required.'))
    }),

    paramsSchema : Joi.object().keys({
      param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })    
  }
};