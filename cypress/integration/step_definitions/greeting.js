const assert = require('assert')
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')

const Greeter = require('../../src/app')

const greeter = new Greeter();

Given('日本に住んでいる', function (message) {
  console.log("Background function")
  console.log(message)
});

Given('現在の時刻は{int}時', function (time) {
  greeter.meetAt(time)
});

When('同僚(達)に挨拶する', function () {
  this.whatIHeard = greeter.sayHello()
});

Then('{string}と返された の/よ', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse)
});
