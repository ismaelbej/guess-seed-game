"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeMnemonic(words) {
    return words.join(' ');
}
function parseMnemonic(mnemonic, wordlist) {
    var words = mnemonic.split(' ');
    var entries = words.map(function (word, index) { return [index, wordlist.indexOf(word)]; });
    return Object.fromEntries(entries);
}
function main() {
    var yo = parseMnemonic("3 1 2 3 *", ["1", "2", "3"]);
    console.log(yo);
}
main();
