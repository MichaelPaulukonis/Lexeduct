
module = {};
transformer = {};
module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            return str;
        };
    },
    parameters: {},
    description: "Identity transformation: makes no changes"
};

transformer['identity'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                s += str.charAt(i);
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    s += cfg.chars.charAt(
                        Math.floor(Math.random() * cfg.chars.length)
                    );
                }
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to select from", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Insert a randomly-selected character after each character"
};

transformer['insert-chars'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    c = c.toLowerCase();
                }
                s += c;
            }
            return s;
        };
    },
    parameters: {
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Convert characters to lowercase"
};

transformer['lower'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.chars.indexOf(c) > -1 &&
                    Math.floor(Math.random() * 100) < cfg.chance) {
                    continue;
                }
                s += c;
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to remove", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Remove occurrences of the specified characters"
};

transformer['remove-chars'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.count = parseInt(cfg.count || "1", 10);
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                s += c;
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    for (var j = 0; j < cfg.count; j++) {
                        s += c;
                    }
                }
            }
            return s;
        };
    },
    parameters: {
        'count': ["How many extra occurrences of the character to insert", "1"],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Insert extra copies of the character after each character"
};

transformer['repeat-chars'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.search.indexOf(c) > -1 &&
                    Math.floor(Math.random() * 100) < cfg.chance) {
                    s += cfg.replace.charAt(
                        Math.floor(Math.random() * cfg.replace.length)
                    );
                } else {
                    s += c;
                }
            }
            return s;
        };
    },
    parameters: {
        'search': ["The set of characters to look for", ""],
        'replace': ["The set of characters to substitute in place", ""],
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Replace occurrences of the specified characters"
};

transformer['replace-chars'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            var len = str.length;
            for (var i = 0; i < len; i++) {
                var index = Math.floor(Math.random() * str.length);
                s += str.charAt(index);
                str = str.slice(0, index) + str.slice(index + 1, str.length);
            }
            return s;
        };
    },
    parameters: {},
    description: "Randomly re-order all characters found"
};

transformer['shuffle-chars'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var words = str.split(/\s+/);
            var acc = [];
            var len = words.length;
            for (var i = 0; i < len; i++) {
                var index = Math.floor(Math.random() * words.length);
                acc.push(words[index]);
                words = words.slice(0, index).concat(words.slice(index + 1, words.length));
            }
            return acc.join(' ');
        };
    },
    parameters: {},
    description: "Randomly re-order all words found"
};

transformer['shuffle-words'] = module.exports;
module.exports = {
    makeTransformer: function(cfg) {
        cfg.chance = parseInt(cfg.chance || "100", 10);
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (Math.floor(Math.random() * 100) < cfg.chance) {
                    c = c.toUpperCase();
                }
                s += c;
            }
            return s;
        };
    },
    parameters: {
        'chance': ["Probability (0-100) of applying to any individual character", "100"]
    },
    description: "Convert characters to uppercase"
};

transformer['upper'] = module.exports;


transformer['markov'] = {
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
        'count':['number of words to output', 50],
        'order': ['order', 2]
    },
    description: 'ngrams in theory and practice'
};


transformer['shortlines'] = {
    makeTransformer: function(cfg) {
        cfg.newline = parseFloat(cfg.newline || 0.2, 10);
        cfg.multiple = parseFloat(cfg.multiple || 0.3, 10);
        cfg.multipleRange = parseInt(cfg.multipleRante || 3, 10);
        return function(str, state) {
            var sl = new Shortlines(cfg);
            return sl.generate(str);
        };
},
    parameters: {
        'newline': ['probability of newline 0.0...1', 0.2],
        'multiple': ['probability of multiple newlines 0.0..1', 0.3],
        'multipleRange': ['max number of newlines', 3]
        },
    description: 'breaks text into short lines'
};
