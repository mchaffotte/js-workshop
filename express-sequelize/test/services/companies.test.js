const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const sinon = require("sinon");

const companyService = require("../../src/services/companies.js");
const db = require("../../src/repository");

describe("Company service", () => {
  describe("create", () => {
    it("should throw an error if the company name is empty.", () => {
      const company = { title: "World company" };

      expect(() => {
        companyService.create(company);
      }).to.throw("The company name cannot be empty");
    });
  });

  describe("findOne", () => {
    let findByPkStub;

    beforeEach(() => {
      findByPkStub = sinon.stub(db.companies, "findByPk");
    });

    afterEach(() => {
      findByPkStub.restore();
    });

    it("should return the company according to its id.", async () => {
      //Given
      const expected = { id: 123, name: "ABC" };
      findByPkStub.returns(expected);
      //When
      const actual = await companyService.findOne(123);
      //Then
      expect(actual).to.be.equal(expected);
    });

    it("should throw an error if the company does not exist.", () => {
      findByPkStub.returns(undefined);

      expect(companyService.findOne(123)).to.be.rejectedWith(
        "The company was not found"
      );
    });
  });
});
