const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

// assertion style
chai.should();

chai.use(chaiHttp);

describe("db api", () => {
    // test root
    describe("GET /twittercomments", () => {
        it("Root should respond in time", (done) => {
            chai.request(server)
                .get("/twittercomments?product=iphone8")
                .end((err, response) => {
                    response.should.have.status(200);

                    
                done();
                });
        });
        it("first check if twits matches", (done) => {
            chai.request(server)
                .get("/twittercomments?product=iphone8")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("Demek ki iphone11 ile 3 saat video izleyebiliyoruz");

                done();
                });
        });
        it("second check if twits matches", (done) => {
            chai.request(server)
                .get("/twittercomments?product=iphone8")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("neden hedef iphone8");

                done();
                });
        });
        it("third check if twits matches", (done) => {
            chai.request(server)
                .get("/twittercomments?product=iphone8")
                .end((err, response) => {
                    response.body = JSON.parse(response.text);
                    response.body.should.includes("2.5 sene oldu iphone8 plus kullanıyorum");

                done();
                });
        });

    });

});

