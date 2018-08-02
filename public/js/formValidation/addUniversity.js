$("#addUniversityForm").validate({
  rules: {
    universityName: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    universityLogo: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    website: {
      required: true,
      url: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    email: {
      required: true,
      email: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    about: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    address: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    city: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    country: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    contact: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    }
  }
});