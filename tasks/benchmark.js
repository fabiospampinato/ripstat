
/* IMPORT */

const afs = require ( 'atomically/dist/utils/fs' ).default,
      fs = require ( 'fs' ),
      ripstat = require ( '../dist' ).default,
      {filesPaths} = require ( '../test/populate' )();

/* BENCHMARK */

const benchmark = async () => {

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

  console.time ( 'atomically.stat' );
  await Promise.all ( filesPaths.map ( filePath => {
    return afs.statRetry ( 20000 )( filePath, { bigint: true } );
  }));
  console.timeEnd ( 'atomically.stat' );

  console.time ( 'ripstat' );
  await Promise.all ( filesPaths.map ( filePath => {
    return ripstat ( filePath );
  }));
  console.timeEnd ( 'ripstat' );

};

/* RUN */

benchmark ();
