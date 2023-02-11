
/* IMPORT */

import {toNamespacedPath} from 'node:path';
import process from 'node:process';
import fs from 'stubborn-fs';
import {RETRY_TIMEOUT} from './constants';
import Stats from './stats';

/* HELPERS */

const {stat, FSReqCallback} = process['binding']( 'fs' );

/* MAIN */

const ripstat = ( filePath: string, timeout?: number ): Promise<Stats> => {

  return new Promise<Stats> ( ( resolve, reject ) => {

    const req = new FSReqCallback ( true );

    req.oncomplete = ( error: NodeJS.ErrnoException, statsdata: bigint[] ): void => {

      if ( error ) {

        const {code} = error;

        if ( code === 'EMFILE' || code === 'ENFILE' || code === 'EAGAIN' || code === 'EBUSY' || code === 'EACCESS' || code === 'EACCS' || code === 'EPERM' ) { // Retriable error

          fs.retry.stat ( timeout || RETRY_TIMEOUT )( filePath, { bigint: true } ).then ( nstats => {

            if ( !nstats || !( 'atimeNs' in nstats ) ) return reject ();

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
export type {Stats};
