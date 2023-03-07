# `ripstat`

Fetch the stats for a file as if a saber-tooth tiger is chasing you!

## Features

- **Fast**: This is designed to be as fast as possible, and it's probably at least ~2x faster than whatever you are doing currently. If you know how to speed it up further ping me.
- **Reliable**: Stats objects are read reliably, which is something especially important when you are reading thousands of them, chances are the current way you are reading files doesn't account for EMFILE errors at all for example.
- **Non-blocking**: Almost all the work is performed asynchronously, so you'll experience no freezes in the main thread.
- **Non-native**: By using native modules perhaps some more overhead could be trimmed, but native modules are a pain to work with, this uses none of them.

## Install

```sh
npm install --save ripstat
```

## Usage

The following interface is provided for stats objects:

```ts
class Stats {
  dev: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  blksize: number;
  ino: number | bigint;
  size: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  isDirectory (): boolean;
  isFile (): boolean;
  isBlockDevice (): boolean;
  isCharacterDevice (): boolean;
  isSymbolicLink (): boolean;
  isFIFO (): boolean;
  isSocket (): boolean;
}
```

This is how you use it:

```ts
import ripstat from 'ripstat';

const stats = await ripstat ( '/Users/fabio/Desktop/foo.txt' );

console.log ( stats ); // => Stats
```

## License

MIT © Fabio Spampinato
