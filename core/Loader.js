// Load a script from given `url`
const LoadScript = function(url) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = url;

        script.addEventListener('load', function() {
            // The script is loaded completely
            resolve(true);
        });

        document.head.appendChild(script);
    });
};

// Perform all promises in the order
const Waterfall = function(promises) {
    return promises.reduce(
        function(p, c) {
            // Waiting for `p` completed
            return p.then(function() {
                // and then `c`
                return c().then(function(result) {
                    return true;
                });
            });
        },
        // The initial value passed to the reduce method
        Promise.resolve([])
    );
};

// Load an array of scripts in order
function LoadScriptInOrder(arrayOfJs) {
    const promises = arrayOfJs.map(function(url) {
        return LoadScript(url);
    });
    return Waterfall(promises);
};
