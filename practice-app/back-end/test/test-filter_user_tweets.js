const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe("Unit testing filter_user_tweets", () => {    
    describe("GET /filter_user_tweets", () => {
        it("Should return mentioned tweets of a vendor by the user", (done) => {
            chai.request(server)
                .get("/filter_user_tweets")
                .query({user: 'ARealityEvent', mentioned: 'Samsung', count:10})
                .end((err, response) => {

                    //test response properties
                    response.should.have.status(200);
                    response.should.have.property('ok').eq(true);
                    response.should.have.property('error').eq(false);
                    response.should.have.property('badRequest').eq(false);
                    response.should.have.property('unauthorized').eq(false);
                    response.should.have.property('notFound').eq(false);
                    response.body.should.be.a('string');

                    //parse JSON response into an array
                    var outputList = JSON.parse(response.body);

                    //twitter search results
                    var expectedTweets = ["RT @MSFTVolumetric: @anshelsag @ARealityEvent @metastageXR @Microsoft @Samsung @vraccelerator If anyone has questions about capturing human…","RT @anshelsag: Watching #AWE2020 stream 2 with @metastageXR, @Microsoft, @Samsung and @vraccelerator about volumetric video capture and del…","Next up on #AWEOnline #AWE2020 Livestream 2 is a panel on #VolumetricVideo Capture and Delivery with @Microsoft… https://t.co/IL1WolSATP"];

                    //test if expected tweets are returned
                    for(var i=0; i<outputList.length; i++) {
                        outputList.should.include(expectedTweets[i])
                    }
                done();
                });
        });
    });

});
