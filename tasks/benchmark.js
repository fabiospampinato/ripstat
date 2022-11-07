
/* IMPORT */

import fs from 'node:fs';
import sfs from 'stubborn-fs';
import ripstat from '../dist/index.js';
import populate from '../test/populate.js';

/* MAIN */

const main = async () => {

  const {filesPaths, dispose} = populate ();

  console.time ( 'fs.promises.stat' );
  await Promise.all ( filesPaths.map ( filePath => {
    return fs.promises.stat ( filePath, { bigint: true } );
  }));
  console.timeEnd ( 'fs.promises.stat' );

  console.time('fs.statSync');
  filesPaths.map ( filePath => {
    return fs.statSync ( filePath, { bigint: true } );
  });
  console.timeEnd('fs.statSync');

  console.time ( 'stubborn-fs.stat' );
  await Promise.all ( filesPaths.map ( filePath => {
    return sfs.retry.stat ( 20000 )( filePath, { bigint: true } );
  }));
  console.timeEnd ( 'stubborn-fs.stat' );

  console.time ( 'ripstat' );
  await Promise.all ( filesPaths.map ( filePath => {
    return ripstat ( filePath );
  }));
  console.timeEnd ( 'ripstat' );

  dispose ();

};

/* RUNNING */

main ();
