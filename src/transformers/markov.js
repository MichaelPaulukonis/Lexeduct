var Markov = function(order) {

    if (!(this instanceof Markov)) {
        return new Markov(order);
    }

    this.originalText = '';
    this.order = order || 2; // ergh
    this.ngrams = {};
    this.keys = []; // will store the keys of ngram

    var pick = function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    };

    this.randomNGram = function() {
        var key = this.keys[this.keys.length * Math.random() << 0];
        return this.ngrams[key];
    };

    // start with the dumbest possible algorithm
    this.splitter = function(text) {
        var atoms = text.split(' ');
        return atoms;
    };

    this.clean = function(text) {
        return text.replace(/\s+/g, ' ');
    };

    this.init = function(text) {
        this.originalText = text;
        var ngrams = this.ngrams;
        var atoms = this.splitter(this.clean(text));

        for (var i = 0; i < atoms.length; i++) {
            var key = atoms.slice(i, i + this.order).join(' ');
            if (!ngrams[key]) {
                ngrams[key] = {
                    key: { raw: key, atoms: atoms.slice(i, i + this.order) },
                    followers: []
                };

            }
            if (i + this.order < atoms.length) {
                ngrams[key].followers.push(atoms[i + this.order]);
            }
        }
        this.keys = Object.keys(ngrams);
        return true;
    };

    // doesn't need to be exposed
    // but... I'm debugging it...
    this.getNextKey = function(ngram) {
        var key = '';

        if (ngram.key.atoms.length > 1) {
            key = ngram.key.atoms.slice(1,ngram.key.atoms.length) + ' ';
        }
        key += pick(ngram.followers);

        return key;
    };

    this.generate = function(len) {
        var words = [];
        len = len || 10;
        var ngram = this.randomNGram();
        // ouch. that ain't right. how many atoms?
        // gotta a slice now, right?
        var curKey = this.getNextKey(ngram);

        // console.log('ngram: ' + ngram, 'curKey: ' + curKey);
        words.push(ngram.key.atoms[0]);

        // start at 1, since we already have one word....
        for (var i = 1; i < len; i ++) {
            if (!this.ngrams[curKey]) {
                console.log('key "' + curKey + '" not found; getting random');
                ngram = this.randomNGram();
                // aaaand... WHAT?
            } else {
                ngram = this.ngrams[curKey];
            }
            words.push(ngram.key.atoms[0]);
            curKey = this.getNextKey(ngram);
        }

        return words.join(' ');
    };

};

module.exports = {
    // the trouble is, lexeduct (in this state)
    // processes everything LINE BY LINE (as noted somewhere in the README)
    // which means fulll-body xforms, like Markov, don't work well
    makeTransformer: function(cfg) {
        cfg.order = parseInt(cfg.order || 2, 10);
        cfg.count = parseInt(cfg.count || 200, 10);
        return function(str, state) {
            var m = new Markov(cfg.order);
            m.init(str);
            return m.generate(cfg.count);
        };
    },
    parameters: {
        'count':['number of words to output', 200],
        'order': ['order', 2]
    },
    description: 'ngrams in theory and practice'
};
