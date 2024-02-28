var pp = require("preprocess");
var path = require("path");
var through = require('through2');

module.exports = function (options) {
  var opts = Object.assign({}, options);
  var context = Object.assign({}, process.env, opts.context);

  function ppStream(file, encoding, callback) {
    var contents, extension;

    // TODO: support streaming files
    if (file.isNull()) return callback(null, file); // pass along
    if (file.isStream())
      return callback(new Error("gulp-preprocess: Streaming not supported"));

    context.src = file.path;
    context.srcDir = opts.includeBase || path.dirname(file.path);
    context.NODE_ENV = context.NODE_ENV || "development";

    extension = opts.extension ?? getExtension(context.src);

    contents = file.contents.toString("utf8");
    contents = pp.preprocess(contents, context, extension);
    file.contents = Buffer.from(contents);

    callback(null, file);
  }

  return through.obj(ppStream);
};

function getExtension(filename) {
  var ext = path.extname(filename || "").split(".");
  return ext[ext.length - 1];
}
