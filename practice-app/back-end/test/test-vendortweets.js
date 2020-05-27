const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

// assertion style
chai.should();

chai.use(chaiHttp);

describe("vendor the most favorite tweets", () => {
    // test root
    describe("GET /vendortweets", () => {
        it("Root should respond in time", (done) => {
            chai.request(server)
                .get("/vendortweets?vendor_name=nike")
                .end((err, response) => {
                    response.should.have.status(200);

                    
                done();
                });
        });
        it("first check if twits matches", (done) => {
            chai.request(server)
                .get("/vendortweets?vendor_name=nike")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("No matter what we’re up against, we are never too far down to come back.");

                done();
                });
        });
        it("second check if twits matches", (done) => {
            chai.request(server)
                .get("/vendortweets?vendor_name=nike")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("Welcome to the family");

                done();
                });
        });
        it("third check if twits matches", (done) => {
            chai.request(server)
                .get("/vendortweets?vendor_name=nike")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("We are continuing to pay employees impacted by the temporary closure of our stores");

                done();
                });
        });

    });

});