const helpers = {
  generatePassword: () => {
    let pass = '';
    const str = `${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}${'abcdefghijklmnopqrstuvwxyz0123456789@#$'}`;

    for (let i = 1; i <= 8; i += 1) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    return pass;
  },
  filterObj: (obj, allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  },
};

module.exports = helpers;
