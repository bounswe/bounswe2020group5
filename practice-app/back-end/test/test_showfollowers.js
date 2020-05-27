const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe("Unit test for showfollowers endpoint", () => {
    describe("GET /showfollowers", () => {
        it("Response should return the number of followers of the user", (done) => {
            chai.request(server)
                .get("/showfollowers?name=mansuryavas06")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.have.property('ok').eq(true);
                    response.should.have.property('error').eq(false);
                    response.should.have.property('badRequest').eq(false);
                    response.should.have.property('unauthorized').eq(false);
                    response.should.have.property('notFound').eq(false);
                    response.body.should.be.a('string');
                    chai.expect(response.status).to.equal(200);
                    done();
                });
        });
    });

});