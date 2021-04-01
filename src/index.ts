
/* IMPORT */

import afs from 'atomically/dist/utils/fs';
import {toNamespacedPath} from 'path';
import {RETRY_TIMEOUT} from './consts';
import Stats from './stats';

/* HELPERS */

const {stat, FSReqCallback} = process['binding']( 'fs' );

/* RIPSTAT */

const ripstat = ( filePath: string, timeout?: number ): Promise<Stats> => {

  return new Promise<Stats> ( ( resolve, reject ) => {

    const req = new FSReqCallback ( true );

    req.oncomplete = ( error: NodeJS.ErrnoException, statsdata: bigint[] ): void => {

      if ( error ) {

        const {code} = error;

        if ( code === 'EMFILE' || code === 'ENFILE' || code === 'EAGAIN' || code === 'EBUSY' || code === 'EACCESS' || code === 'EACCS' || code === 'EPERM' ) { // Retriable error

          afs.statRetry ( timeout || RETRY_TIMEOUT )( filePath, { bigint: true } ).then ( nstats => {

            const statsdata = [nstats.dev, nstats.mode, nstats.nlink, nstats.uid, nstats.gid, nstats.rdev, nstats.blksize, nstats.ino, nstats.size, nstats.blocks, 0n, nstats.atimeNs, 0n, nstats.mtimeNs, 0n, nstats.ctimeNs, 0n, nstats.birthtimeNs];

            const stats = new Stats ( statsdata );

            resolve ( stats );

          }, reject );

        } else {

          reject ( error );

        }

      } else {

        const stats = new Stats ( statsdata );

        resolve ( stats );

      }

    };

    stat ( toNamespacedPath ( filePath ), true, req );

  });

};

/* EXPORT */

export default ripstat;
export {Stats};
