import University from "./../models/university";

import flash from 'connect-flash';
import {
  check,
  validationResult
} from "express-validator/check";
import {
  matchedData
} from "express-validator/filter";
import paginate from 'express-paginate';

const universities = {};

universities.index = async (req, res) => {
  res.render('signup');
}

universities.addUniversity = async (req, res) => {
  res.render('pages/university/addUniversity')
}

universities.storeUniversity = async (req, res, next) => {
  const errors = await validationResult(req);
  const university = matchedData(req);
  if (!errors.isEmpty()) {
    return res.render('pages/university/addUniversity', {
      errors: errors.mapped(),
      university: university
    });
  } else {
    try {
      if (Object.keys(req.files).length === 0 && req.files.constructor === Object) {
        return res.render('pages/university/addUniversity', {
          logoError: 'Logo is required.',
          university: university
        })
      }
      let myfile = req.files.universityLogo;
      let type = req.files.universityLogo.mimetype;
      type = type.split("/")
      let ext = type[1].toLowerCase();
      if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
        let newName = req.body.universityName + '_logo.' + ext;
        let path = `./public/images/${newName}`;
        const newUniversity = new University(req.body);
        newUniversity.logo = path;
        await newUniversity.save(req.body);
        await myfile.mv(path);
        req.flash('success', 'University is successfully saved.')
      } else {
        return res.render('pages/university/addUniversity', {
          logoError: 'Upload a valid image.',
          university: university
        })
      }
    } catch (error) {
      req.flash('error', error.message);
    }
  }
  res.redirect('/admin/university/add');
}

universities.getUniversities = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      University.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      University.countDocuments({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);
    res.render('pages/university/universities', {
      allUniversities: results,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });

  } catch (error) {
    throw Error(error.message)
    res.redirect('/admin/');
  }
}

universities.showUniversity = async (req, res) => {
  let {
    universityId
  } = req.params;
  let university = await University.findById(universityId);
  if (!university) {
    req.flash('error', 'No record found against the given id.')
    return res.redirect('/university');
  }
  res.render('pages/university/updateUniversity', {
    universityData: university
  });
}

universities.updateUniversity = async (req, res) => {
  let {
    universityId
  } = req.params;
  let isUpdated = await University.findByIdAndUpdate(universityId, req.body);
  if (!isUpdated) {
    req.flash('error', 'Couldnt update successfully.');
    res.redirect(`/admin/university/update/${universityId}`);
  }
  req.flash('success', 'Successfully updated.');
  res.redirect(`/admin/university/update/${universityId}`);
}


universities.deleteUniversity = async (req, res) => {
  let {
    universityId
  } = req.params;
  let isDeleted = await University.findByIdAndRemove(universityId);
  if (!isDeleted) {
    req.flash('error', 'Couldnt delete record.');
    res.redirect('/admin/university/manage');
  }
  req.flash('success', 'Record is successfully deleted.');
  res.redirect('/admin/university/manage');
}

universities.findByName = async (req, res) => {
  let {
    universityName
  } = req.body;
  let university = await University.find({
    universityName
  });
  if (university.length < 1) {
    return res.render('adminViews/universityViews/universities', {
      noRecord: 'No record found.'
    })
  }
  res.render('adminViews/universityViews/universities', {
    allUniversities: university
  });
}

universities.getUniversityById = async (req, res) => {
  let {
    universityId
  } = req.params;
  let university = await University.findOne({
    _id: universityId
  });
  res.render('adminViews/universityViews/universityDetail', {
    university: university
  })
}


// Public Routes Functions


export default universities;