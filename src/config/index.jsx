export const orderFormCfg = {
  required: "данное поле обязательно",
  address: {
    required: "данное поле обязательно",
    maxLength: { value: 100, message: "максимальное кол-во символов - 100!" },
  },
  name: {
    required: "данное поле обязательно",
    maxLength: { value: 50, message: "максимальное кол-во символов - 50!" },
  },
  phone: {
    required: "данное поле обязательно",
    pattern: {
      value: /^((\+7|7|8)+([0-9]){10})$/,
      message: "неверный формат",
    },
  },
  floor: {
    required: "данное поле обязательно",
    pattern: { value: /^\d{2}$/, message: "неверный формат" },
  },
  comment: {
    required: "данное поле обязательно",
    maxLength: { value: 150, message: "максимальное кол-во символов - 150!" },
  },
};

export const logFormValidationParams = {
  required: {
    required: "данное поле обязательно",
  },

  code: {
    required: "Данное поле обязательно",
    minLength: {
      value: 4,
      message: "неверный формат кода",
    },
    maxLength: {
      value: 4,
      message: "неверный формат кода",
    },
    pattern: { value: /^\d{4}$/, message: "неверный формат кода" },
  },

  phone: {
    required: "Данное поле обязательно",
    minLength: {
      value: 18,
      message: "неверный формат номера",
    },
  },
};

export const userFormCfg = {
  required: "данное поле обязательно",
  name: { required: "данное поле обязательно" },
  phone: {
    required: "данное поле обязательно",
    pattern: {
      value: /^((\+7)+([0-9]){10})$/,
      message: "неверный формат",
    },
  },
};
