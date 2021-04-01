
/* CONSTS */

const IS_WINDOWS = ( process.platform === 'win32' );

const {MAX_SAFE_INTEGER} = Number;

const RETRY_TIMEOUT = 5000;

const {S_IFBLK, S_IFCHR, S_IFDIR, S_IFIFO, S_IFLNK, S_IFMT, S_IFREG, S_IFSOCK} = process['binding']( 'constants' ).fs;

/* EXPORT */

export {IS_WINDOWS, MAX_SAFE_INTEGER, RETRY_TIMEOUT, S_IFBLK, S_IFCHR, S_IFDIR, S_IFIFO, S_IFLNK, S_IFMT, S_IFREG, S_IFSOCK};
