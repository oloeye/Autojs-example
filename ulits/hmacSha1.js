/*
 * @Author: your name
 * @Date: 2021-06-06 00:43:10
 * @LastEditTime: 2021-06-06 23:19:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\ulits\hmacSha1.js
 */
const DEFAULT_INTERVAL = 30
const DEFAULT_DIGITS = 6

// base32
var BaseCls = function (options) {
    var construct,

        // options
        pad, dataBits, codeBits, keyString, arrayData,

        // private instance variables
        mask, group, max,

        // private methods
        gcd, translate,

        // public methods
        encode, decode;

    // pseudo-constructor
    construct = function () {
        var i, mag, prev;

        // options
        pad = options.pad || '';
        dataBits = options.dataBits;
        codeBits = options.codeBits;
        keyString = options.keyString;
        arrayData = options.arrayData;

        // bitmasks
        mag = Math.max(dataBits, codeBits);
        prev = 0;
        mask = [];
        for (i = 0; i < mag; i += 1) {
            mask.push(prev);
            prev += prev + 1;
        }
        max = prev;

        // ouput code characters in multiples of this number
        group = dataBits / gcd(dataBits, codeBits);
    };

    // greatest common divisor
    gcd = function (a, b) {
        var t;
        while (b !== 0) {
            t = b;
            b = a % b;
            a = t;
        }
        return a;
    };

    // the re-coder
    translate = function (input, bitsIn, bitsOut, decoding) {
        var i, len, chr, byteIn,
            buffer, size, output,
            write;

        // append a byte to the output
        write = function (n) {
            if (!decoding) {
                output.push(keyString.charAt(n));
            } else if (arrayData) {
                output.push(n);
            } else {
                output.push(String.fromCharCode(n));
            }
        };

        buffer = 0;
        size = 0;
        output = [];

        len = input.length;
        for (i = 0; i < len; i += 1) {
            // the new size the buffer will be after adding these bits
            size += bitsIn;

            // read a character
            if (decoding) {
                // decode it
                chr = input.charAt(i);
                byteIn = keyString.indexOf(chr);
                if (chr === pad) {
                    break;
                } else if (byteIn < 0) {
                    throw 'the character "' + chr + '" is not a member of ' + keyString;
                }
            } else {
                if (arrayData) {
                    byteIn = input[i];
                } else {
                    byteIn = input.charCodeAt(i);
                }
                if ((byteIn | max) !== max) {
                    throw byteIn + " is outside the range 0-" + max;
                }
            }

            // shift the buffer to the left and add the new bits
            buffer = (buffer << bitsIn) | byteIn;

            // as long as there's enough in the buffer for another output...
            while (size >= bitsOut) {
                // the new size the buffer will be after an output
                size -= bitsOut;

                // output the part that lies to the left of that number of bits
                // by shifting the them to the right
                write(buffer >> size);

                // remove the bits we wrote from the buffer
                // by applying a mask with the new size
                buffer &= mask[size];
            }
        }

        // If we're encoding and there's input left over, pad the output.
        // Otherwise, leave the extra bits off, 'cause they themselves are padding
        if (!decoding && size > 0) {

            // flush the buffer
            write(buffer << (bitsOut - size));

            // add padding keyString for the remainder of the group
            len = output.length % group;
            for (i = 0; i < len; i += 1) {
                output.push(pad);
            }
        }

        // string!
        return (arrayData && decoding) ? output : output.join('');
    };

    /**
     * Encode.  Input and output are strings.
     */
    encode = function (input) {
        return translate(input, dataBits, codeBits, false);
    };

    /**
     * Decode.  Input and output are strings.
     */
    decode = function (input) {
        return translate(input, codeBits, dataBits, true);
    };

    this.encode = encode;
    this.decode = decode;
    construct();
};


// Util 类
var base32map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function stringToBytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
function bytesToString(bytes) {
    const str = [];
    for (let i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
    }
    return str.join('');
}
function stringToWords(str) {
    const words = [];
    for (let c = 0, b = 0; c < str.length; c++, b += 8) {
        words[b >>> 5] |= str.charCodeAt(c) << (24 - b % 32);
    }
    return words;
}
function bytesToWords(bytes) {
    const words = [];
    for (let i = 0, b = 0; i < bytes.length; i++, b += 8) {
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
    }
    return words;
}
function wordsToBytes(words) {
    const bytes = [];
    for (let b = 0; b < words.length * 32; b += 8) {
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
    }
    return bytes;
}
function intToBytes(n) {
    const bytes = [];
    let num = n;
    for (let i = 7; i >= 0; --i) {
        bytes[i] = num & 255;
        num = num >> 8;
    }
    return bytes;
}
function bytesToHex(bytes) {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join('');
}
function hexToBytes(hex) {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}
function bytesToBase32(bytes) {
    const base32 = [];
    let overflow;
    for (let i = 0; i < bytes.length; i++) {
        switch (i % 5) {
            case 0:
                base32.push(base32map.charAt(bytes[i] >>> 3));
                overflow = (bytes[i] & 0x7) << 2;
                break;
            case 1:
                base32.push(base32map.charAt(overflow | (bytes[i] >>> 6)));
                base32.push(base32map.charAt((bytes[i] >>> 1) & 0x1F));
                overflow = (bytes[i] & 0x1) << 4;
                break;
            case 2:
                base32.push(base32map.charAt(overflow | (bytes[i] >>> 4)));
                overflow = (bytes[i] & 0xF) << 1;
                break;
            case 3:
                base32.push(base32map.charAt(overflow | (bytes[i] >>> 7)));
                base32.push(base32map.charAt((bytes[i] >>> 2) & 0x1F));
                overflow = (bytes[i] & 0x3) << 3;
                break;
            case 4:
                base32.push(base32map.charAt(overflow | (bytes[i] >>> 5)));
                base32.push(base32map.charAt(bytes[i] & 0x1F));
                overflow = -1;
                break;
        }
    }
    if (overflow !== void 0 && overflow !== -1) {
        base32.push(base32map.charAt(overflow));
    }
    while (base32.length % 8 != 0) {
        base32.push('=');
    }
    return base32.join('');
}
// Cypto 类
var blocksize = 16;
function sha1(message) {
    const m = bytesToWords(message);
    const l = message.length * 8;
    const w = [];
    let H0 = 1732584193;
    let H1 = -271733879;
    let H2 = -1732584194;
    let H3 = 271733878;
    let H4 = -1009589776;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;
    for (let i = 0; i < m.length; i += 16) {
        let a = H0;
        let b = H1;
        let c = H2;
        let d = H3;
        let e = H4;
        for (let j = 0; j < 80; j++) {
            if (j < 16)
                w[j] = m[i + j];
            else {
                const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
                w[j] = (n << 1) | (n >>> 31);
            }
            const t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                    j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                        (H1 ^ H2 ^ H3) - 899497514);
            H4 = H3;
            H3 = H2;
            H2 = (H1 << 30) | (H1 >>> 2);
            H1 = H0;
            H0 = t;
        }
        H0 += a;
        H1 += b;
        H2 += c;
        H3 += d;
        H4 += e;
    }
    return wordsToBytes([H0, H1, H2, H3, H4]);
}
function hmac(m, k) {
    let message;
    let key;
    if (typeof m === 'string') {
        message = stringToBytes(m);
    }
    else if (typeof m === 'number') {
        message = intToBytes(m);
    }
    else if (Array.isArray(message)) {
        message = m;
    }
    if (typeof k === 'string') {
        key = stringToBytes(k);
    }
    else if (Array.isArray(message)) {
        key = k;
    }
    key = key.length > blocksize * 4 ? sha1(key) : key;
    var okey = key, ikey = key.slice(0);  // 选择从 0 到数组结束
    for (var i = 0; i < blocksize * 4; i++) {
        okey[i] ^= 0x5C;
        ikey[i] ^= 0x36;
    }
    return sha1(okey.concat(sha1(ikey.concat(message))));
}
// Topt 类
function hotp(key, count) {
    // 出现hmac 一直不变
    const hmac_result = hmac(count, key);
    const offset = hmac_result[19] & 15;
    const p = (hmac_result[offset] & 127) << 24 |
        (hmac_result[offset + 1] & 255) << 16 |
        (hmac_result[offset + 2] & 255) << 8 |
        (hmac_result[offset + 3] & 255);
    const _otp = (p % Math.pow(10, DEFAULT_DIGITS)).toString();
    while (_otp.length < DEFAULT_DIGITS) {
        _otp = '0' + _otp;
    }
    return _otp;
}

//Truncate 截断函数
// function truncate(hmac_result) {
//     const offset = hmac_result[hmac_result.length - 1].charCodeAt() & 0xf;
//     const bin_code = (hmac_result[offset].charCodeAt() & 0x7f) << 24
//         | (hmac_result[offset + 1].charCodeAt() & 0xff) << 16
//         | (hmac_result[offset + 2].charCodeAt() & 0xff) << 8
//         | (hmac_result[offset + 3].charCodeAt() & 0xff);
//     // var _otp = (bin_code % 10 ** DEFAULT_DIGITS).toString();
//     let _otp = (bin_code % Math.pow(10, DEFAULT_DIGITS)).toString()
//     while (_otp.length < DEFAULT_DIGITS) {
//         _otp = '0' + _otp;
//     }
//     return _otp;

// let offset = hmac_a[hmac_a.length - 1].charCodeAt() & 0xf
// // 计算数字
// let code = (
//     (hmac_a[offset].charCodeAt() & 0x7f) << 24 |
//     (hmac_a[offset + 1].charCodeAt() & 0xff) << 16 |
//     (hmac_a[offset + 2].charCodeAt() & 0xff) << 8 |
//     (hmac_a[offset + 3].charCodeAt() & 0xff)
// )
// let digits = DEFAULT_DIGITS
// let str_code = (code % Math.pow(10, digits)).toString()
// str_code = rjust(str_code, digits)
// return str_code
// }

function totp(key) {
    var count = "54097207";
    var code = hotp(key, count);
    return code;
}

function getCount() {
    const time = Date.now();
    const windowTime = 30;
    return Math.floor((time / 1000) / windowTime);
}

// 根据计步器格式化时间戳
function timecode() {
    let time_str = Date.parse(new Date()).toString();
    let format_time = time_str.substring(0, time_str.length - 3);
    let interval = DEFAULT_INTERVAL;
    return parseInt(parseInt(format_time) / interval);
}



// 设置密钥
const testKey = 'HLKJZPNLCFNKG3HI';

// 获取6位动态密码
log(totp(testKey));

// 54097207   160557
// [ 184,228,138,143,65,109,19,23,109,34,182,224,228,154,46,88,152,58,187,210 ]



// ======================================================================================


function sha_one(sIn) {
    function add(x, y) {
        return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
    }

    function sha1hex(num) {
        var sHEXChars = "0123456789abcdef";
        var str = "";
        for (var j = 7; j >= 0; j--)
            str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
        return str;
    }

    function alignSHA1(sIn) {
        var nblk = ((sIn.length + 8) >> 6) + 1;
        var blks = new Array(nblk * 16);
        for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (i = 0; i < sIn.length; i++)
            blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);

        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
        blks[nblk * 16 - 1] = sIn.length * 8;
        return blks;
    }

    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function ft(t, b, c, d) {
        if (t < 20) return (b & c) | ((~b) & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }

    function kt(t) {
        return (t < 20) ? 1518500249 :
            (t < 40) ? 1859775393 :
                (t < 60) ? -1894007588 : -899497514;
    }

    var x = alignSHA1(sIn);
    var w = new Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
        e = add(e, olde);
    }
    return sha1hex(a) + sha1hex(b) + sha1hex(c) + sha1hex(d) + sha1hex(e);
}


function byteLength(str) {  // 一个字符串的长度仅为1字节。非常类似于oneByteChar()
    // 为了清晰起见，我做了两个函数
    var len = str.length;
    var i = 0;
    var byteLen = 0;
    for (i; i < len; i++) {
        var code = str.charCodeAt(i);
        if (code >= 0x0 && code <= 0xff) byteLen++;
        else {
            throw new Error("More the 1 byte code detected, byteLength functon aborted.");
            return;
        }
    }
    return byteLen;
}

function stringToHex(str) {
    var len = str.length; console.log("len", len)
    var char;
    var result = "";
    for (var i = 0; i < len; i++) {
        console.log("in loop")
        char = oneByteCharAt(str, i);
        console.log("Char: " + char);
        result += char.codePointAt(0).toString(16);
    }

    return result;
}

function oneByteCharAt(str, idx) {
    var code = str.codePointAt(idx);
    if (code >= 0x00 && code <= 0xff) { // 我们只对读取一个字节感兴趣
        return str.charAt(idx); // return char.

    }
    else {
        throw new Error("More then 1byte character detected, |oneByteCharAt()| function  is aborted.")
    }

}

function hexToString(sha1Output) { // 将每一对十六进制字符转换为对应的字符
    // example1: "4e" is converted to char "N" 
    // example2: "34" is converted to char "4"

    var l;        // char at "i" place, left
    var lcode;    // code parsed from left char
    var shiftedL; // left character shifted to the left

    var r;     // char at "i+1" place, right
    var rcode; // code parsed from right char

    var bin;   // code from bitwise OR operation
    var char;  // one character
    var result = ""; // result string 

    for (var i = 0; i < sha1Output.length; i += 2) { // in steps by 2
        l = sha1Output[i]; // take "left" char

        if (typeof l === "number") lcode = parseInt(l); // parse the number
        else if (typeof l === "string") lcode = parseInt(l, 16);  // take the code if char letter is hex number (a-f)

        shiftedL = lcode << 4; // shift it to left 4 places, gets filled in with 4 zeroes from the right
        r = sha1Output[i + 1];    // take next char

        if (typeof r === "number") rcode = parseInt(r); // parse the number
        else if (typeof r === "string") rcode = parseInt(r, 16);

        bin = shiftedL | rcode; // concatenate left and right hex char, by applying bitwise OR
        char = String.fromCharCode(bin); // convert back code to char
        result += char;


    }
    // console.log("|"+result+"|", result.length); // prints info, line can be deleted

    return result;
}

function hmacSha1(key, baseString) {   // 实际的HMAC SHA1功能

    var blocksize = 64; // 64 when using these hash functions: SHA-1, MD5, RIPEMD-128/160 .
    var kLen = byteLength(key); // 密钥长度(以字节为单位);
    var opad = 0x5c; // outer padding  constant = (0x5c) . And 0x5c is just hexadecimal for backward slash "\" 
    var ipad = 0x36; // inner padding contant = (0x36). And 0x36 is hexadecimal for char "6".


    if (kLen < blocksize) {
        var diff = blocksize - kLen; // diff is how mush  blocksize is bigger then the key
    }

    if (kLen > blocksize) {
        // TODO: 需要替换
        key = hexToString(sha_one(key)); // The hash of 40 hex chars(40bytes) convert to exact char mappings, from 0x00 to 0xff,
        // 产生20个字节的字符串

        var hashedKeyLen = byteLength(key); // take the length of key
    }

    var opad_key = ""; // outer padded key
    var ipad_key = ""; // inner padded key

    (function applyXor() {  // 每次从键读取一个字符，并根据键的byteLength对其应用异或常量
        var o_zeroPaddedCode;  // 清除零字节的结果
        var i_zeroPaddedCode;  // 从iPading零字节
        var o_paddedCode;      // res from opading the char from key
        var i_paddedCode;      // res from ipading the char from key

        var char;
        var charCode;

        for (var j = 0; j < blocksize; j++) {

            if (diff && (j + diff) >= blocksize || j >= hashedKeyLen) { // if diff exists (key is shorter then blocksize) and if we are at boundry 
                // where we should be, XOR 0x00 byte with constants. Or the key was 
                // too long and was hashed, then also we need to do the same.
                o_zeroPaddedCode = 0x00 ^ opad; // XOR zero byte with opad constant  
                opad_key += String.fromCharCode(o_zeroPaddedCode); // convert result back to string 

                i_zeroPaddedCode = 0x00 ^ ipad;
                ipad_key += String.fromCharCode(i_zeroPaddedCode);
            }
            else {

                char = oneByteCharAt(key, j);     // 从键取char，只有一个字节字符
                charCode = char.codePointAt(0);  // 该字符转换为数字

                o_paddedCode = charCode ^ opad; // XOR the char code with outer padding constant (opad)
                opad_key += String.fromCharCode(o_paddedCode); // convert back code result to string

                i_paddedCode = charCode ^ ipad;  // XOR with the inner padding constant (ipad)
                ipad_key += String.fromCharCode(i_paddedCode);

            }
        }
        //  console.log("opad_key: ", "|"+opad_key+"|", "\nipad_key: ", "|"+ipad_key+"|"); // prints opad and ipad key, line can be deleted
    })()
    // TODO 需要替换
    return sha_one(opad_key + hexToString(sha_one(ipad_key + baseString)));
}

function hotp_plus(key, count) {
    // 出现hmac 一直不变
    const hmac_result = hmacSha1(key, count);
    let hmac_a = hexToBytes(hmac_result);
    const offset = hmac_a[19] & 15;
    const p = (hmac_a[offset] & 127) << 24 |
        (hmac_a[offset + 1] & 255) << 16 |
        (hmac_a[offset + 2] & 255) << 8 |
        (hmac_a[offset + 3] & 255);
    var _otp = (p % Math.pow(10, DEFAULT_DIGITS)).toString();
    while (_otp.length < DEFAULT_DIGITS) {
        _otp = '0' + _otp;
    }
    return _otp;
}

function _hexToBytes(hex) {
    var C, bytes, c;
    bytes = [];
    c = 0;
    C = hex.length;
    while (c < C) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
        c += 2;
    }
    return bytes;
}

function intToBytes(num) {
    var bytes, i;
    bytes = [];
    i = 7;
    while (i >= 0) {
        bytes[i] = num & 255;
        num = num >> 8;
        --i;
    }
    return bytes;
}

function hex2dec(s) {
    return parseInt(s, 16);
}

function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}

function dec2hex(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
}

function _truncat(key, count) {
    let hmac = hmacSha1(key, count);
    log(sha_one(hexToString (hmac)))
    // hmac = "9c552dbf3e97b518d0340ce459132f81e1633f14";
    offset = hex2dec(hmac.substring(hmac.length - 1));

    otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
    if (otp.length > 6) {
        otp = otp.substr(otp.length - 6, 6);
    } else {
        otp = leftpad(otp, 6, "0");
    }
    return otp;
}


var baseStr = timecode();

var key = "HLKJZPNLCFNKG3HI";

log(hmacSha1(key, 54097207));
log(hotp_plus(key, 54097207));
log(_truncat(key, 54097207));

// function __truncat(key, count) {
//     const hmac_result = hmac_plus(key, count);
//     // Get byte array
//     h = _hexToBytes(hmac_result);
//     // Truncate
//     offset = h[19] & 0xf;
//     v = (h[offset] & 0x7f) << 24 | (h[offset + 1] & 0xff) << 16 | (h[offset + 2] & 0xff) << 8 | h[offset + 3] & 0xff;
//     v = v + '';
//     log(v);
//     return v.substr(v.length - 6, 6);
// }


// function hmac (key, message) {
//     if (length(key) > blocksize) {
//         key = hash(key) // keys longer than blocksize are shortened
//     }
//     if (length(key) < blocksize) {
//         // keys shorter than blocksize are zero-padded (where ∥ is concatenation)
//         key = key ∥ [ 0x00 * (blocksize - length(key))] // Where * is repetition.
//     }
//     o_pad = [ 0x5c * blocksize] // Where blocksize is that of the underlying hash function
//     i_pad = [ 0x36 * blocksize]
//     o_key_pad = o_pad ⊕ key // Where ⊕ is exclusive or (XOR)
//     i_key_pad = i_pad ⊕ key
//     return hash(o_key_pad ∥ hash(i_key_pad ∥ message)) // Where ∥ is concatenation
//     }