// generates a random integer
var random = function(max, min){
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// return true or false
// 50-50 chance (unless override)
var coinflip = function(chance) {
    if (!chance) { chance = 0.5; }
    return (Math.random() < chance);
};


var InitialSpaces = function(cfg) {

    if(!(this instanceof InitialSpaces)) {
        return new InitialSpaces(cfg);
    }

    var defaultConfig = {
        offset: 20,
        offsetVariance: 20,
        offsetProbability: 0.8
    };

    this.config = {
        offset: (cfg && cfg.offset ? cfg.offset : defaultConfig.offset),
        offsetVariance: (cfg && cfg.offsetVariance ? cfg.offsetVariance : defaultConfig.offsetVariance),
        offsetProbability: (cfg && cfg.offsetProbability ? cfg.offsetProbability : defaultConfig.offsetProbability)
    };

    this.generate = function(text) {

        var out = [];
        var lines = text.split('\n');

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.length > 0 && coinflip(this.config.offsetProbability)) {
                var variance = random(-this.config.offsetVariance, this.config.offsetVariance);
                // +1, since when you join a 1-length array, you don't get the join-character.
                var spaceCount = this.config.offset + variance + 1;
                var spaces = Array(spaceCount).join(' ');
                line = spaces + line;
            }
            out.push(line);
        }

        return out.join('\n');

    };

};


var Shortlines = function(cfg) {

    if(!(this instanceof Shortlines)) {
        return new Shortlines(cfg);
    }

    var defaultConfig = {
        newline: 0.2,
        multiple: 0.3,
        multipleRange: 3
    };

    this.config = {
        newline: (cfg && cfg.newline ? cfg.newline : defaultConfig.newline),
        multiple: (cfg && cfg.multiple ? cfg.multiple : defaultConfig.multiple),
        multipleRange: (cfg && cfg.multipleRange ? cfg.multipleRange : defaultConfig.multipleRange)
    };

    this.generate = function(text) {

        var out = [];
        var words = text.split(/\s+/);
        var line = [];
        for (var word in words) {
            line.push(words[word]);

            if (coinflip(this.config.newline)) {
                // start at 2, since when you join a 1-length array, you don't get the join-character.
                var lines = 2;
                if (coinflip(this.config.multiple)) {
                    lines += random(this.config.multipleRange);
                }
                line.push(Array(lines).join('\n'));
                out.push(line.join(' '));
                line = [];
            }
        }

        // this mean every line-break
        // IS ALWAYS FOLLOWED BY A SPACE
        // we do not like this
        return out.join('');
    };

};

var Truncater = function(cfg) {

    if(!(this instanceof Truncater)) {
        return new Truncater(cfg);
    }

    var LINE_LENGTH = -1;

    var defaultConfig = {
        // -1 for complete truncation
        max: LINE_LENGTH,
        probability: 0.2
    };

    this.config = {
        max: (cfg && cfg.max ? cfg.max : defaultConfig.max),
        probability: (cfg && cfg.probability ? cfg.probability : defaultConfig.probability)
    };

    this.generate = function(text) {

        var out = [];
        var lines = text.split('\n');

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.length > 0 && coinflip(this.config.probability)) {
                var variance = (this.config.max === LINE_LENGTH
                                ? random(line.length)
                                : random(this.config.max));
                line = line.slice(variance).trim(); // remove spaces
            }
            out.push(line);
        }

        return out.join('\n');

    };

};
