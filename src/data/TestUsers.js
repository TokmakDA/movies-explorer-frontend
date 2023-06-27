const TESTdata = [
  {
    name: 'test@test.com',
    email: 'test@test.com',
    password: 'test@test.com',
  },
  {
    name: 'test@test.by',
    email: 'test@test.by',
    password: 'test@test.by',
  },
  {
    name: 'qwerty@qwerty.com',
    email: 'qwerty@qwerty.com',
    password: 'qwerty@qwerty.com',
  },
  {
    name: 'test@test.ru',
    email: 'qwerty@qwerty.ru',
    password: 'qwerty@qwerty.ru',
  },
];

const source = {
  name: 'fffggfg',
  surname: 'fhfhfhfg',
  about: 'kdfkdfk',
};

console.log(
  Object.keys(source)
    .filter((key) => key !== 'about')
    .reduce((res, key) => {
      res[key] = source[key];
      return res;
    }, {}),
);

console.log(
  source
    .filter((key) => key !== 'about')
    .reduce((res, key) => {
      res[key] = source[key];
      return res;
    }, {}),
);
