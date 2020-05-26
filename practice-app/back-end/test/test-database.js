
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');

// assertion style
chai.should();

chai.use(chaiHttp);

describe("db api", () => {
    // test root

    // test list

    // test new product

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

