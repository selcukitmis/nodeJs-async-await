const users = [
  {
    id: 1,
    name: "Selçuk",
    schoolId: 101
  },
  {
    id: 2,
    name: "Ebru",
    schoolId: 999
  }
];
const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject("Unable to find user with id of " + id);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = userId => {
  var user;
  return getUser(userId).then(tempUser => {
    user = tempUser;
    return getGrades(user.schoolId).then(grades => {
      let average = 0;
      if (grades.length > 0) {
        average = grades.map(grade => grade.grade).reduce((a, b) => {
          return a + b;
        });
        average = average / grades.length;
        return `${user.name} has a ${average}% in the class`;
      }
    });
  });
};

const getStatusAlt = async userId => {
  //   throw new Error("this is an error");
  //   return "Mike";
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average = grades.map(grade => grade.grade).reduce((a, b) => {
      return a + b;
    });
    average = average / grades.length;
    return `${user.name} has a ${average}% in the class`;
  }
  throw new Error("this is an error");
};

getStatusAlt(1)
  .then(status => {
    console.log(status);
  })
  .catch(err => {
    console.log(err);
  });

// getUser(1)
//   .then(user => {
//     console.log(user);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// getGrades(101)
//   .then(grades => {
//     console.log(grades);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// getStatus(4)
//   .then(grades => {
//     console.log(grades);
//   })
//   .catch(err => {
//     console.log(err);
//   });
