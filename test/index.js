
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import ripstat from '../dist/index.js';
import populate from './populate.js';

/* MAIN */

describe ( 'ripstat', it => {

  it ( 'works', async t => {

    const {filesPaths, dispose} = populate ();

    for ( const filePath of filesPaths.slice ( 0, 100 ) ) {

      const stats = fs.statSync ( filePath, { bigint: true } );
      const ripstats = await ripstat ( filePath );

      t.true ( stats.dev == ripstats.dev );
      t.true ( stats.mode == ripstats.mode );
      t.true ( stats.nlink == ripstats.nlink );
      t.true ( stats.uid == ripstats.uid );
      t.true ( stats.gid == ripstats.gid );
      t.true ( stats.rdev == ripstats.rdev );
      t.true ( stats.blksize == ripstats.blksize );
      t.true ( stats.ino == ripstats.ino );
      t.true ( stats.size == ripstats.size );
      t.true ( stats.blocks == ripstats.blocks );
      t.true ( stats.atimeMs == ripstats.atimeMs );
      t.true ( stats.mtimeMs == ripstats.mtimeMs );
      t.true ( stats.ctimeMs == ripstats.ctimeMs );
      t.true ( stats.birthtimeMs == ripstats.birthtimeMs );
      t.true ( stats.isDirectory () == ripstats.isDirectory () );
      t.true ( stats.isFile () == ripstats.isFile () );
      t.true ( stats.isBlockDevice () == ripstats.isBlockDevice () );
      t.true ( stats.isCharacterDevice () == ripstats.isCharacterDevice () );
      t.true ( stats.isSymbolicLink () == ripstats.isSymbolicLink () );
      t.true ( stats.isFIFO () == ripstats.isFIFO () );
      t.true ( stats.isSocket () == ripstats.isSocket () );

    }

    dispose ();

  });

});
