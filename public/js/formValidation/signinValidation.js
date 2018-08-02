$("#siginForm").validate({
  rules: {
    username: {
      required: true,
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