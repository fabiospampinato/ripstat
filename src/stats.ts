
/* IMPORT */

import {IS_WINDOWS, MAX_SAFE_INTEGER, S_IFBLK, S_IFCHR, S_IFDIR, S_IFIFO, S_IFLNK, S_IFMT, S_IFREG, S_IFSOCK} from './consts';

/* HELPERS */

const {floor} = Math;
const toNumber = Number;

/* STATS */

class Stats {

  /* VARIABLES */

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

  /* CONSTRUCTOR */

  constructor ( stats: bigint[] ) {

    this.dev = toNumber ( stats[0] );
    this.mode = toNumber ( stats[1] );
    this.nlink = toNumber ( stats[2] );
    this.uid = toNumber ( stats[3] );
    this.gid = toNumber ( stats[4] );
    this.rdev = toNumber ( stats[5] );
    this.blksize = toNumber ( stats[6] );
    this.ino = ( stats[7] <= MAX_SAFE_INTEGER ) ? toNumber ( stats[7] ) : stats[7];
    this.size = toNumber ( stats[8] );
    this.blocks = toNumber ( stats[9] );
    this.atimeMs = ( toNumber ( stats[10] ) * 1000 ) + floor ( toNumber ( stats[11] ) / 1000000 );
    this.mtimeMs = ( toNumber ( stats[12] ) * 1000 ) + floor ( toNumber ( stats[13] ) / 1000000 );
    this.ctimeMs = ( toNumber ( stats[14] ) * 1000 ) + floor ( toNumber ( stats[15] ) / 1000000 );
    this.birthtimeMs = ( toNumber ( stats[16] ) * 1000 ) + floor ( toNumber ( stats[17] ) / 1000000 );

  }

  /* HELPERS */

  private _isMode ( mode: number ): boolean {

    return ( this.mode & S_IFMT ) === mode;

  }

  /* API */

  isDirectory (): boolean {

    return this._isMode ( S_IFDIR );

  }

  isFile (): boolean {

    return this._isMode ( S_IFREG );

  }

  isBlockDevice (): boolean {

    return !IS_WINDOWS && this._isMode ( S_IFBLK );

  }
  isCharacterDevice (): boolean {

    return this._isMode ( S_IFCHR );

  }

  isSymbolicLink (): boolean {

    return this._isMode ( S_IFLNK );

  }

  isFIFO (): boolean {

    return !IS_WINDOWS && this._isMode ( S_IFIFO );

  }

  isSocket (): boolean {

    return !IS_WINDOWS && this._isMode ( S_IFSOCK );

  }

}

/* EXPORT */

export default Stats;
