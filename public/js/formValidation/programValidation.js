$("#addProgramForm").validate({
  rules: {
    programName: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    universityName: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    departmentName: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    degree: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    duration: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    entryRequirement: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    totalFee: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    creditHours: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    programType: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    entryTestDate: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    applicationDate: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    documentSubmissionDate: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    admissionDecisionDate: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
  }
});