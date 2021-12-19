const DataSource = require("./DataSource");

module.exports = class TestDataSource extends DataSource {

    constructor() {
        super();
    }

    getFrameDuration() {
        return 1000;
    }

    getFrameSkip() {
        return 0;
    }

    getFrames() {
        return [
            ["","","",this.spaces(14)+"Welcome to animatext!"],
            ["","",this.spaces(14)+"Welcome to animatext!",""],
            ["",this.spaces(14)+"Welcome to animatext!","",this.spaces(13)+"ASCII animation library"],
            [this.spaces(14)+"Welcome to animatext!","",this.spaces(13)+"ASCII animation library",""],
            ["",this.spaces(14)+"ASCII animation library","",this.spaces(15)+"by Redguys with love"],
            [this.spaces(14)+"ASCII animation library","",this.spaces(15)+"by Redguys with love",this.spaces(24)+":3"],
            ["",this.spaces(15)+"by Redguys with love",this.spaces(24)+":3",""],
            [this.spaces(15)+"by Redguys with love",this.spaces(24)+":3","",""],
            [this.spaces(24)+":3","","",""],["","","",""],["",this.spaces(21)+"The end.","",""]
        ];
    }

    getFrameWidth() {
        return 50;
    }

    setFrames(frames) {}
}