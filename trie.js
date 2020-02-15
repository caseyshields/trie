// export default createTrie()

/** A minimal trie implementation which is compatible with D3 layouts. */
function createTrie() {

    // declare simulation dataset and root node
    let nodes = [{ symbol:'', edge:[], x:0, y:0 }];
    let edges = [];

    return {root, get, put, append, nodes, edges};

    function root() {
        return nodes[0];
    }

    /** @returns The node associated with the given word or null if it doesn't exist.
    */
    function get( node, word ) {
        let next =node;
        for (let n=0; n<word.length; n++)
            if (next.edge[word[n]])
                next = next.edge[word[n]];
            else
                return null;
        return next;
    }

    /** Adds the word to the given point in the trie.
     * @returns the last node created or traversed when adding the word.
    */
    function put( node, word ) {
        let next = node;
        for (let n=0; n<word.length; n++)
            next = append(next, word[n]);
        return next;
    }

    /** Adds a transition and node for the symbol to the given node.
     * @returns The child node associated with the symbol
    */
    function append(parent, symbol) {
        // check if the node already exists for the symbol's transition
        let node = parent.edge[symbol];
        if (!node) {
            // create the missing node
            node = {
                symbol,
                edge : [],
                x : parent.x,
                y : parent.y
            };
            parent.edge[symbol] = node;

            // create the edge to the node
            let edge = {
                source: parent,
                target: node,
                class: 'new'
            }; // this isn't really needed for the data structure, but it helps make the vizualization clear!

            // update the simulation data structures
            edges.push(edge);
            nodes.push(node);
            // todo update styling
        }
        return node;
    }

    // TODO support deletion
}
