
/* IMPORT */

const {strictEqual} = require ( 'assert' ),
      fs = require ( 'fs' ),
      ripstat = require ( '../dist' ).default,
      populate = require ( './populate' );

/* TEST */

const test = async () => {

  const {filesPaths} = populate ();

  for ( const filePath of filesPaths.slice ( 0, 100 ) ) {

    const stats = fs.statSync ( filePath, { bigint: true } );
    const ripstats = await ripstat ( filePath );

    strictEqual ( true, stats.dev == ripstats.dev, 'dev' );
    strictEqual ( true, stats.mode == ripstats.mode, 'mode' );
    strictEqual ( true, stats.nlink == ripstats.nlink, 'nlink' );
    strictEqual ( true, stats.uid == ripstats.uid, 'uid' );
    strictEqual ( true, stats.gid == ripstats.gid, 'gid' );
    strictEqual ( true, stats.rdev == ripstats.rdev, 'rdev' );
    strictEqual ( true, stats.blksize == ripstats.blksize, 'blksize' );
    strictEqual ( true, stats.ino == ripstats.ino, 'ino' );
    strictEqual ( true, stats.size == ripstats.size, 'size' );
    strictEqual ( true, stats.blocks == ripstats.blocks, 'blocks' );
    strictEqual ( true, stats.atimeMs == ripstats.atimeMs, 'atimeMs' );
    strictEqual ( true, stats.mtimeMs == ripstats.mtimeMs, 'mtimeMs' );
    strictEqual ( true, stats.ctimeMs == ripstats.ctimeMs, 'ctimeMs' );
    strictEqual ( true, stats.birthtimeMs == ripstats.birthtimeMs, 'birthtimeMs' );
    strictEqual ( true, stats.isDirectory () == ripstats.isDirectory (), 'isDirectory' );
    strictEqual ( true, stats.isFile () == ripstats.isFile (), 'isFile' );
    strictEqual ( true, stats.isBlockDevice () == ripstats.isBlockDevice (), 'isBlockDevice' );
    strictEqual ( true, stats.isCharacterDevice () == ripstats.isCharacterDevice (), 'isCharacterDevice' );
    strictEqual ( true, stats.isSymbolicLink () == ripstats.isSymbolicLink (), 'isSymbolicLink' );
    strictEqual ( true, stats.isFIFO () == ripstats.isFIFO (), 'isFIFO' );
    strictEqual ( true, stats.isSocket () == ripstats.isSocket (), 'isSocket' );

  }

};

/* RUN */

test ();
