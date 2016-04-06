'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Edible = mongoose.model('Edible'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, edible;

/**
 * Edible routes tests
 */
describe('Edible CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Edible
    user.save(function () {
      edible = {
        name: 'Edible name'
      };

      done();
    });
  });

  it('should be able to save a Edible if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Edible
        agent.post('/api/edibles')
          .send(edible)
          .expect(200)
          .end(function (edibleSaveErr, edibleSaveRes) {
            // Handle Edible save error
            if (edibleSaveErr) {
              return done(edibleSaveErr);
            }

            // Get a list of Edibles
            agent.get('/api/edibles')
              .end(function (ediblesGetErr, ediblesGetRes) {
                // Handle Edible save error
                if (ediblesGetErr) {
                  return done(ediblesGetErr);
                }

                // Get Edibles list
                var edibles = ediblesGetRes.body;

                // Set assertions
                (edibles[0].user._id).should.equal(userId);
                (edibles[0].name).should.match('Edible name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Edible if not logged in', function (done) {
    agent.post('/api/edibles')
      .send(edible)
      .expect(403)
      .end(function (edibleSaveErr, edibleSaveRes) {
        // Call the assertion callback
        done(edibleSaveErr);
      });
  });

  it('should not be able to save an Edible if no name is provided', function (done) {
    // Invalidate name field
    edible.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Edible
        agent.post('/api/edibles')
          .send(edible)
          .expect(400)
          .end(function (edibleSaveErr, edibleSaveRes) {
            // Set message assertion
            (edibleSaveRes.body.message).should.match('Please fill Edible name');

            // Handle Edible save error
            done(edibleSaveErr);
          });
      });
  });

  it('should be able to update an Edible if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Edible
        agent.post('/api/edibles')
          .send(edible)
          .expect(200)
          .end(function (edibleSaveErr, edibleSaveRes) {
            // Handle Edible save error
            if (edibleSaveErr) {
              return done(edibleSaveErr);
            }

            // Update Edible name
            edible.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Edible
            agent.put('/api/edibles/' + edibleSaveRes.body._id)
              .send(edible)
              .expect(200)
              .end(function (edibleUpdateErr, edibleUpdateRes) {
                // Handle Edible update error
                if (edibleUpdateErr) {
                  return done(edibleUpdateErr);
                }

                // Set assertions
                (edibleUpdateRes.body._id).should.equal(edibleSaveRes.body._id);
                (edibleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Edibles if not signed in', function (done) {
    // Create new Edible model instance
    var edibleObj = new Edible(edible);

    // Save the edible
    edibleObj.save(function () {
      // Request Edibles
      request(app).get('/api/edibles')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Edible if not signed in', function (done) {
    // Create new Edible model instance
    var edibleObj = new Edible(edible);

    // Save the Edible
    edibleObj.save(function () {
      request(app).get('/api/edibles/' + edibleObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', edible.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Edible with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/edibles/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Edible is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Edible which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Edible
    request(app).get('/api/edibles/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Edible with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Edible if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Edible
        agent.post('/api/edibles')
          .send(edible)
          .expect(200)
          .end(function (edibleSaveErr, edibleSaveRes) {
            // Handle Edible save error
            if (edibleSaveErr) {
              return done(edibleSaveErr);
            }

            // Delete an existing Edible
            agent.delete('/api/edibles/' + edibleSaveRes.body._id)
              .send(edible)
              .expect(200)
              .end(function (edibleDeleteErr, edibleDeleteRes) {
                // Handle edible error error
                if (edibleDeleteErr) {
                  return done(edibleDeleteErr);
                }

                // Set assertions
                (edibleDeleteRes.body._id).should.equal(edibleSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Edible if not signed in', function (done) {
    // Set Edible user
    edible.user = user;

    // Create new Edible model instance
    var edibleObj = new Edible(edible);

    // Save the Edible
    edibleObj.save(function () {
      // Try deleting Edible
      request(app).delete('/api/edibles/' + edibleObj._id)
        .expect(403)
        .end(function (edibleDeleteErr, edibleDeleteRes) {
          // Set message assertion
          (edibleDeleteRes.body.message).should.match('User is not authorized');

          // Handle Edible error error
          done(edibleDeleteErr);
        });

    });
  });

  it('should be able to get a single Edible that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Edible
          agent.post('/api/edibles')
            .send(edible)
            .expect(200)
            .end(function (edibleSaveErr, edibleSaveRes) {
              // Handle Edible save error
              if (edibleSaveErr) {
                return done(edibleSaveErr);
              }

              // Set assertions on new Edible
              (edibleSaveRes.body.name).should.equal(edible.name);
              should.exist(edibleSaveRes.body.user);
              should.equal(edibleSaveRes.body.user._id, orphanId);

              // force the Edible to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Edible
                    agent.get('/api/edibles/' + edibleSaveRes.body._id)
                      .expect(200)
                      .end(function (edibleInfoErr, edibleInfoRes) {
                        // Handle Edible error
                        if (edibleInfoErr) {
                          return done(edibleInfoErr);
                        }

                        // Set assertions
                        (edibleInfoRes.body._id).should.equal(edibleSaveRes.body._id);
                        (edibleInfoRes.body.name).should.equal(edible.name);
                        should.equal(edibleInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Edible.remove().exec(done);
    });
  });
});
