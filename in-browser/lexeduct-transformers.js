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
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = cfg.chars.charAt(Math.floor(Math.random() * cfg.chars.length));
                s += str.charAt(i) + c;
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to select from", ""]
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
        return function(str, state) {
            var s = "";
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if (cfg.chars.indexOf(c) === -1) {
                    s += c;
                }
            }
            return s;
        };
    },
    parameters: {
        'chars': ["The set of characters to remove", ""]
    },
    description: "Remove all occurrences of the specified characters"
};

transformer['remove-chars'] = module.exports;
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
