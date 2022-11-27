module.exports = class Greeter {
  constructor() {
    this.time = "不明";
  }

  sayHello() {
    let message;

    switch(this.time) {
      case "朝":
        message = "おはよう";
        break;
      case "昼":
        message = "こんにちは";
        break;
      case "夜":
        message = "こんばんは";
        break;
      default:
        message = "ごきげんよう";
        break;
    }
    return message;
  }

  /*
    * 0  -  3 時 こんばんは
    * 3  - 11 時 おはよう
    * 11 - 18 時 こんにちは
    * 18 - 24 時 こんばんは
    */
  meetAt(time) {
    if(Number.isInteger(time))
    {
      if(0 <= time && time < 3){
        this.time = "夜";
      }
      else if (3 <= time && time < 11)
      {
        this.time = "朝";
      }
      else if (11 <= time && time < 18){
        this.time = "昼";
      }
      else if(18 <= time && time < 24){
        this.time = "夜";
      }
      else{
        this.time = "不明";
      }
    }
    else{
      this.time = "不明";
    }
  }
}