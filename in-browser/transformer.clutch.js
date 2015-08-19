// generates a random number
var random = function(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
};

// return true or false
// 50-50 chance (unless override)
var coinflip = function(chance) {
    if (!chance) { chance = 0.5; }
    return (Math.random() < chance);
};


var Shortlines = function(probs) {

    if(!(this instanceof Shortlines)) {
        return new Shortlines(probs);
    }

    var defaultProbabilities = {
        newline: 0.2,
        multiple: 0.3,
        multipleRange: 3 // yeah, this isn't a probability
    };

    this.probabilities = {
        newline: (probs && probs.newline ? probs.newline : defaultProbabilities.newline),
        multiple: (probs && probs.multiple ? probs.multiple : defaultProbabilities.multiple),
        multipleRange: (probs && probs.multipleRange ? probs.multipleRange : defaultProbabilities.multipleRange)
    };

    this.generate = function(text) {

        var out = [];
        var words = text.split(/\s+/);

        for (var word in words) {
            out.push(words[word]);

            if (coinflip(this.probabilities.newline)) {
                // start at 2, since when you join a 1-length array, you don't get the join-character.
                var lines = 2;
                if (coinflip(this.probabilities.multiple)) {
                    lines += random(this.probabilities.multipleRange);
                }
                out.push(Array(lines).join('\n'));
            }
        }

        return out.join(' ');

    };

};
