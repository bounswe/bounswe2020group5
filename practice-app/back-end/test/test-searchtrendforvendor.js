const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

// assertion style
chai.should();

chai.use(chaiHttp);

describe("vendor-trend api", () => {

    describe("GET /searchtrendforvendor", () => {
        it("Response should be", (done) => {
            chai.request(server)
                .get("/searchtrendforvendor?vendor=apple")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                done();
                });
        });
    });

});