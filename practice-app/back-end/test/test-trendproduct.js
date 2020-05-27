const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe("Trend for product API", () => {
    describe("GET /searchtrendforproduct", () => {
        it("Response should be", (done) => {
            chai.request(server)
                .get("/searchtrendforproduct?query=iphone7")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.should.have.property('ok').eq(true);
                    response.should.have.property('error').eq(false);
                done();
                });
        });
    });

});