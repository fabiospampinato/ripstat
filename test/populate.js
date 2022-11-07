
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';

/* MAIN */

const populate = () => {

  /* ROOT */

  const rootPath = path.join ( process.cwd (), 'test', 'dump' );

  fs.mkdirSync ( rootPath, { recursive: true } );

  /* FILES */

  const files = [];
  const filesPaths = [];
  const filesContents = [];

  /* SMALL FILES */

  for ( let i = 0; i < 50000; i++ ) {

    const filePath = path.join ( rootPath, `${i}.txt` );
    const fileContent = 'a'.repeat ( 100 );
    const file = {filePath, fileContent};

    if ( !fs.existsSync ( filePath ) ) {

      fs.writeFileSync ( filePath, fileContent );

    }

    files.push ( file );
    filesPaths.push ( filePath );
    filesContents.push ( fileContent );

  }

  /* DISPOSE */

  const dispose = () => {

    fs.rmSync ( rootPath, { recursive: true } );

  };

  /* RETURN */

  return {rootPath, files, filesPaths, filesContents, dispose};

};

/* EXPORT */

export default populate;
