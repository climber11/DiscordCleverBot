const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const getRandomInt = require('../src/util/getRandomInt.js');
var data = require('../src/db/settings.js');
var tmpDataPath = path.join('test','data');

function generateString(){
  return getRandomInt(1, 999999999).toString();
}

function generateDataFilePath(){
  return path.join(tmpDataPath, generateString());
}

before(function() {
  if (!fs.existsSync(tmpDataPath)){
    fs.mkdirSync(tmpDataPath);
  }
});

describe('Settings', function(){
	describe('constructor', function(){
		it('should create an object', function() {
	      var db = new data(generateDataFilePath());
	      assert.ok(db);
	    });
		it('should name the file properly', function(){
      var randomName = generateString();
      var randomPath = path.join(tmpDataPath, randomName);
			var db = new data(randomPath);
			assert.equal(path.basename(db.path), randomName);
		});
    it('should call the callback', function(done){
      new data(generateDataFilePath(), done);
    });
	});
});