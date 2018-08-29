import University from '../models/university';
import {
  check,
  validationResult
} from "express-validator/check";
import {
  matchedData
} from 'express-validator/filter';
import paginate from 'express-paginate';

const programs = {};

programs.addProgram = async (req, res) => {
  const universities = await University.find({}, {
    "universityName": 1
  })
  res.render('pages/program/addProgram', {
    universities: universities
  })
}

programs.storeProgram = async (req, res, next) => {
  try {
    let universityId = req.body.universityName;

    const universities = await University.find({}, {
      "universityName": 1
    })

    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const program = matchedData(req);
      return res.render('adminViews/programViews/addProgram', {
        program: program,
        errors: errors.mapped(),
        universities: universities,
        universityId: universityId
      })
    } else {
      const universityId = req.body.universityName;
      let programs = {
        "programName": req.body.programName,
        "departmentName": req.body.departmentName,
        "degree": req.body.degree,
        "duration": req.body.duration,
        "entryRequirement": req.body.entryRequirement,
        "totalFee": req.body.totalFee,
        "programType": req.body.programType,
        "creditHours": req.body.creditHours,
        "entryTestDate": req.body.entryTestDate,
        "applicationDate": req.body.applicationDate,
        "documentSubmissionDate": req.body.documentSubmissionDate,
        "admissionDecisionDate": req.body.admissionDecisionDate,
        "financialAid": req.body.financialAid
      };
      const isUpdated = await University.findOneAndUpdate({
        _id: universityId
      }, {
        $push: {
          programs: programs
        }
      })
      if (isUpdated) {
        req.flash('success', 'Program successfully added.')
        res.redirect('/admin/program/add');
      }
    }
  } catch (error) {
    next(error);
  }
}

programs.getProgramById = async (req, res) => {
  let {
    universityId
  } = req.params;
  let {
    programId
  } = req.params;

  const program = await University.findOne({
    '_id': universityId,
    'programs._id': programId
  }, {
    'programs.$': 1
  })
  // res.send(program)
  res.render('adminViews/programViews/programDetail', {
    program: program
  });
}

programs.showProgram = async (req, res) => {
  let {
    universityId
  } = req.params;
  let {
    programId
  } = req.params;
  const universities = await University.find({}, {
    "universityName": 1
  })

  const program = await University.findOne({
    '_id': universityId,
    'programs._id': programId
  }, {
    'programs.$': 1
  })
  res.render('pages/program/updateProgram', {
    program: program,
    universities: universities,
    universityId: universityId
  });
}

programs.updateProgram = async (req, res) => {
  console.log(req.body)
}

programs.getPrograms = async (req, res) => {

  try {
    const [results, itemCount] = await Promise.all([
      University.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      University.countDocuments({})
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.render('pages/program/manageProgram', {
      universities: results,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    })
  } catch (error) {
    throw Error(error.message)
  }
}

programs.deleteProgram = async (req, res) => {
  let {
    universityId,
    programId
  } = req.params;

  const isDeleted = await University.update({
    _id: universityId
  }, {
    $pull: {
      programs: {
        _id: programId
      }
    }
  });
  if (isDeleted) {
    req.flash('success', 'Record is successfully deleted.')
    res.redirect('/admin/program/manage');
  }
}


// Publics routes

programs.getAll = async (req, res) => {
  const programs = await University.find({}, {
    'universityName': 1,
    'city': 1,
    'logo': 1,
    'programs': 1
  });

  res.render('pages/program/programs', {
    programs: programs
  })
}

programs.getProgramByKeywords = async (req, res) => {
  const programToFind = req.body.programSearch;
  const filteredPrograms = await University.aggregate([{
    $project: {
      universityName: 1,
      city: 1,
      logo: 1,
      programs: {
        $filter: {
          input: "$programs",
          as: "program",
          cond: {
            $gt: [{
                $indexOfCP: [{
                  $toLower: "$$program.programName"
                }, programToFind]
              },
              -1
            ]
          }
        }
      }
    }
  }]);
  // res.send(fPrograms);
  res.render('pages/program/programs', {
    programs: filteredPrograms
  })
};

export default programs;