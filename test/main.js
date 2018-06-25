var should = require("should");
var File = require("vinyl");
var preprocess = require("../");
var fs = require("fs");

require("mocha");

function fixtureFile(fileName) {
  return new File({
    base: "test/fixtures",
    cwd: "test/",
    path: "test/fixtures/" + fileName,
    contents: fs.readFileSync("test/fixtures/" + fileName)
  });
}

process.env["FAKEHOME"] = "/Users/jas";

describe("gulp-preprocess", function() {
  describe("preprocess()", function() {
    it("should preprocess html", function(done) {
      var stream = preprocess({
        context: {
          firstOption: "bar",
          secondOption: "foo"
        }
      });

      var fakeFile = fixtureFile("test.html");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test.html", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });

    it("should preprocess javascript", function(done) {
      var stream = preprocess({
        context: {
          firstOption: "bar",
          secondOption: "foo"
        }
      });

      var fakeFile = fixtureFile("test.js");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test.js", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });

    it("should preprocess coffeescript", function(done) {
      var stream = preprocess({
        context: {
          firstOption: "bar",
          secondOption: "foo"
        }
      });

      var fakeFile = fixtureFile("test.coffee");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test.coffee", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });

    it("should preprocess without options object", function(done) {
      var stream = preprocess();

      var fakeFile = fixtureFile("test.coffee");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test.coffee", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });

    it("should preprocess html with custom base", function(done) {
      var stream = preprocess({
        includeBase: "test/fixtures/base",
        context: {
          firstOption: "bar",
          secondOption: "foo"
        }
      });

      var fakeFile = fixtureFile("test.html");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test-base.html", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });

    it("should allow custom extension", function(done) {
      var stream = preprocess({
        extension: "html",
        context: {
          firstOption: "bar",
          secondOption: "foo"
        }
      });

      var fakeFile = fixtureFile("test.php");

      stream.once("data", function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(
          fs.readFileSync("test/expected/test.html", "utf8")
        );
        done();
      });
      stream.write(fakeFile);
    });
  });
});
