$("#signupForm").validate({
  rules: {
    completeName: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    username: {
      required: true,
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
    password: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    }

  }
});