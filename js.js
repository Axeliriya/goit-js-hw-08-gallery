// class User {
//   email;

//   constructor(email) {
//     this.email = email;
//   }

//   get email() {
//     return this.email;
//   }

//   set email(newEmail) {
//     this.email = newEmail;
//   }
// }
// class Admin extends User {
//   // Пиши код ниже этой строки
//   blacklistedEmails = '';
//   static AccessLevel = {
//     BASIC: 'basic',
//     SUPERUSER: 'superuser',
//   };
//   accessLevel;
//   constructor({ email, accessLevel }) {
//     super(email);
//     this.accessLevel = accessLevel;
//   }
//   blacklist(email) {
//     this.blacklistedEmails += email;
//   }
//   isBlacklisted(email) {
//     if (this.blacklistedEmails.indexOf(email) !== -1) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   // Пиши код выше этой строки
// }

// const mango2 = new Admin({
//   email: 'mango@mail.com',
//   accessLevel: Admin.AccessLevel.SUPERUSER,
// });

// console.log(mango2.email); // mango@mail.com
// console.log(mango2.accessLevel); // superuser
// mango2.blacklist('poly@mail.com');
// console.log(mango2.blacklistedEmails); // 'poly@mail.com'
// console.log(mango2.isBlacklisted('mango@mail.com')); //  false
// console.log(mango2.isBlacklisted('poly@mail.com')); // true

class User {
  email;

  constructor(email) {
    this.email = email;
  }

  get email() {
    return this.email;
  }

  set email(newEmail) {
    this.email = newEmail;
  }
}
class Admin extends User {
  // Пиши код ниже этой строки
  blacklistedEmails = [];
  static AccessLevel = {
    BASIC: 'basic',
    SUPERUSER: 'superuser',
  };
  accessLevel;
  constructor({ email, accessLevel }) {
    super(email);
    this.accessLevel = accessLevel;
  }
  blacklist(email) {
    this.blacklistedEmails.push(email);
  }
  isBlacklisted(email) {
    const result = this.blacklistedEmails.includes(email);
    return result;
  }
  // Пиши код выше этой строки
}

const mango2 = new Admin({
  email: 'mango@mail.com',
  accessLevel: Admin.AccessLevel.SUPERUSER,
});

console.log(mango2.email); // mango@mail.com
console.log(mango2.accessLevel); // superuser
mango2.blacklist('poly@mail.com');
console.log(mango2.blacklistedEmails); // 'poly@mail.com'
console.log(mango2.isBlacklisted('mango@mail.com')); //  false
console.log(mango2.isBlacklisted('poly@mail.com')); // true
