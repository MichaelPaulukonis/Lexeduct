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
    description: "Remove all occurrences of the specified characters"
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
