import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english';

function makeMnemonic(words: string[]) {
  return words.join(' ')
}

function parseMnemonic(mnemonic: string, wordlist: string[]): Map<number, number> {
  const words = mnemonic.split(' ')
  return new Map(words.map((word, index) => [index, wordlist.indexOf(word)]))
}

function getWildcardPositions(entries: Map<number, number>): number[] {
  return Array.from(entries.entries()).flatMap(([key, value])=> (value < 0) ? [key] : [])
}

function initState(positions: number[]): Map<number, number> {
  return new Map(positions.map((position) => [position, 0]))
}

function nextState(state: Map<number, number>, n: number): [boolean, Map<number, number>] {
  const newState = new Map<number, number>(state)
  let i = 0
  const keys = Array.from(state.keys())
  while (i < keys.length) {
    const key = keys[i]
    newState.set(key, state.get(key) + 1)
    if (newState.get(key) == n) {
      newState.set(key, 0)
      ++i
      continue
    } else {
      break
    }
  }

  if (i >= keys.length) {
    return [false, newState]
  }

  return [true, newState]
}

function buildValue(entries: Map<number, number>, state: Map<number, number>, wordlist: string[]) {
  const keys = Array.from(entries.keys())
  const words = keys
    .map((key) => state.has(key) ? state.get(key) : entries.get(key))
    .map((index) => wordlist[index])
  return words.join(' ')
}

function main() {
  const mnemonic = "used news guide * office decorate will arrive * layer hub volcano trophy * step"
  let entries = parseMnemonic(mnemonic, wordlist)
  let positions = getWildcardPositions(entries)
  let state = initState(positions)

  let go = true
  
  while (go) {
    const entry = buildValue(entries, state, wordlist)
    if (bip39.validateMnemonic(entry, wordlist)) {
      console.log(entry)
    }
    const res = nextState(state, wordlist.length)
    go = res[0]
    state = res[1]
  }
}

main();
