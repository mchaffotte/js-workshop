module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  const Employee = sequelize.define("employee", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Company.belongsToMany(Employee, { through: "company_employees" });
  Employee.belongsToMany(Company, { through: "company_employees" });

  return { Company, Employee };
};
