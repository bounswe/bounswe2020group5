
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

// assertion style
chai.should();

chai.use(chaiHttp);

describe("db api", () => {
    // test root
    describe("GET /database", () => {
        it("Root should respond", (done) => {
            chai.request(server)
                .get("/database")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });


    // test list
    describe("GET /database/thelist", () => {
        it("It should get all products", (done) => {
            chai.request(server)
                .get("/database/thelist")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });

    // test new product
    describe("GET /database/newproduct", () => {
        it("It should render an html form", (done) => {
            chai.request(server)
                .get("/database/newproduct")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.html;
                done();
                });
        });
    });
    
    // test add product
    describe("GET /database/addproduct", () => {
        it("It should add a new product to products db", (done) => {
            chai.request(server)
                .post("/database/addproduct")
                .type('form')
                .send({
                    '_method': 'post',
                    "name":"DUMMY",
                    "price":"DUMMY",
                    "color":"DUMMY",
                    "rating":"DUMMY",
                    "size":"DUMMY",
                    "comments":"DUMMY"
                     })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('result');
                    response.body.should.have.property('connection');
                    response.body.should.have.property('ops');
                    response.body.should.have.property('insertedCount').eq(1);
                    response.body.should.have.property('insertedId');
                    response.body.should.have.property('n').eq(1);
                    response.body.should.have.property('ok').eq(1);
                done();
                });
        });
    });

});

