/** Tests for the command line parser, which was a bit annoying */

'use strict'

import Action from './../bin/action'
import parse from './../bin/parse'

describe('parse', function () {
  it('helps', function () {
    expect(parse(['--help'])).toEqual({action: Action.help, ignoreGarbage: false, fileName: undefined})
  })
  it('versions', function () {
    expect(parse(['--version'])).toEqual({action: Action.version, ignoreGarbage: false, fileName: undefined})
  })
  it('encodes', function () {
    expect(parse([])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['fileName'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['-'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['--'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['--', 'fileName'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['--', '-'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: '-'})
    expect(parse(['--', '--'])).toEqual({action: Action.encode, ignoreGarbage: false, fileName: '--'})
  })
  it('decodes', function () {
    expect(parse(['-d'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['-d', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['-d', '-'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['-d', '--'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['-d', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['-d', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: '-'})
    expect(parse(['-d', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: '--'})
    expect(parse(['--decode'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['--decode', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['--decode', '-'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['--decode', '--'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: undefined})
    expect(parse(['--decode', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: 'fileName'})
    expect(parse(['--decode', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: '-'})
    expect(parse(['--decode', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: false, fileName: '--'})
  })
  it('ignores garbage', function () {
    expect(parse(['-d', '-i'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '-i', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['-d', '-i', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '-i', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '-i', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['-d', '-i', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '-'})
    expect(parse(['-d', '-i', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '--'})
    expect(parse(['--decode', '-i'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '-i', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['--decode', '-i', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '-i', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '-i', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['--decode', '-i', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '-'})
    expect(parse(['--decode', '-i', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '--'})
    expect(parse(['-d', '--ignore-garbage'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '--ignore-garbage', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['-d', '--ignore-garbage', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '--ignore-garbage', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['-d', '--ignore-garbage', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['-d', '--ignore-garbage', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '-'})
    expect(parse(['-d', '--ignore-garbage', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '--'})
    expect(parse(['--decode', '--ignore-garbage'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '--ignore-garbage', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['--decode', '--ignore-garbage', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '--ignore-garbage', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: undefined})
    expect(parse(['--decode', '--ignore-garbage', '--', 'fileName'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: 'fileName'})
    expect(parse(['--decode', '--ignore-garbage', '--', '-'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '-'})
    expect(parse(['--decode', '--ignore-garbage', '--', '--'])).toEqual({action: Action.decode, ignoreGarbage: true, fileName: '--'})
  })
  it('throws', function () {
    expect(() => parse(['--help', '-'])).toThrow()
    expect(() => parse(['--help', '--decode'])).toThrow()
    expect(() => parse(['--help', '--help'])).toThrow()
    expect(() => parse(['--help', '--ignore-garbage'])).toThrow()
    expect(() => parse(['--help', '--version'])).toThrow()
    expect(() => parse(['--help', '-d'])).toThrow()
    expect(() => parse(['--help', '-i'])).toThrow()
    expect(() => parse(['--help', 'fileName'])).toThrow()
    expect(() => parse(['--version', '-'])).toThrow()
    expect(() => parse(['--version', '--decode'])).toThrow()
    expect(() => parse(['--version', '--help'])).toThrow()
    expect(() => parse(['--version', '--ignore-garbage'])).toThrow()
    expect(() => parse(['--version', '--version'])).toThrow()
    expect(() => parse(['--version', '-d'])).toThrow()
    expect(() => parse(['--version', '-i'])).toThrow()
    expect(() => parse(['--version', 'fileName'])).toThrow()
    expect(() => parse(['-d', '--help'])).toThrow()
    expect(() => parse(['-d', '--version'])).toThrow()
    expect(() => parse(['-d', '-d'])).toThrow()
    expect(() => parse(['-d', '--decode'])).toThrow()
    expect(() => parse(['-d', '-i', '-i'])).toThrow()
    expect(() => parse(['-d', '-i', '--ignore-garbage'])).toThrow()
    expect(() => parse(['-d', '--ignore-garbage', '-i'])).toThrow()
    expect(() => parse(['-d', '--ignore-garbage', '--ignore-garbage'])).toThrow()
    expect(() => parse(['--decode', '--help'])).toThrow()
    expect(() => parse(['--decode', '--version'])).toThrow()
    expect(() => parse(['--decode', '-d'])).toThrow()
    expect(() => parse(['--decode', '--decode'])).toThrow()
    expect(() => parse(['--decode', '-i', '-i'])).toThrow()
    expect(() => parse(['--decode', '-i', '--ignore-garbage'])).toThrow()
    expect(() => parse(['--decode', '--ignore-garbage', '-i'])).toThrow()
    expect(() => parse(['--decode', '--ignore-garbage', '--ignore-garbage'])).toThrow()
    expect(() => parse(['-i'])).toThrow()
    expect(() => parse(['--ignore-garbage'])).toThrow()
    expect(() => parse(['fileName', '--help'])).toThrow()
    expect(() => parse(['fileName', '--version'])).toThrow()
    expect(() => parse(['fileName', '-d'])).toThrow()
    expect(() => parse(['fileName', '--decode'])).toThrow()
    expect(() => parse(['fileName', '-i'])).toThrow()
    expect(() => parse(['fileName', '--ignore-garbage'])).toThrow()
    expect(() => parse(['fileName', '--'])).toThrow()
    expect(() => parse(['fileName', 'fileName'])).toThrow()
    expect(() => parse(['-d', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['-d', '-i', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['-d', '--ignore-garbage', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['--decode', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['--decode', '-i', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['--decode', '--ignore-garbage', 'fileName', 'fileName'])).toThrow()
    expect(() => parse(['--', 'fileName', 'fileName'])).toThrow()
  })
})
