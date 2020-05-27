const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe("Unit testing exchangerates", () => {    
    describe("GET /exchangerates", () => {
        it("Should return exchange rates based on the Turkish lira", (done) => {
            chai.request(server)
                .get("/exchangerates")
                .end((err, response) => {

                    //test response properties
                    response.should.have.status(200);
                    response.should.have.property('ok').eq(true);
                    response.should.have.property('error').eq(false);
                    response.should.have.property('badRequest').eq(false);
                    response.should.have.property('unauthorized').eq(false);
                    response.should.have.property('notFound').eq(false);
                    response.body.should.have.property('rates');
                    response.body.should.have.property('base');
                    response.body.should.have.property('date');
                    chai.expect(response.body.status.code).to.equal(200);
                done();
                });
        });
    });

});
