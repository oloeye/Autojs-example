/*
 * @Author: your name
 * @Date: 2021-06-06 23:35:31
 * @LastEditTime: 2021-06-06 23:43:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\ulits\test.js
 */
function generateCode(e) {
	function r(e) {
		function r(e, r) {
			return e << r | e >>> 32 - r
		}
		function t(e) {
			var t = r(l, 5) + h + b + g + i[e];
			b = C,
				C = d,
				d = r(p, 30),
				p = l,
				l = t
		}
		var o = e.length,
			n = e.concat([1 << 31]),
			a = 1732584193,
			c = 2290649224,
			s = 271733878,
			u = s ^ c,
			f = 3285377520;
		c ^= a;
		do n.push(0);
		while (n.length + 1 & 15);
		for (n.push(32 * o); n.length;) {
			for (var h, g, i = n.splice(0, 16), l = a, p = c, d = u, C = s, b = f, v = 12; ++v < 77;) i.push(r(i[v] ^ i[v - 5] ^ i[v - 11] ^ i[v - 13], 1));
			for (g = 1518500249, v = 0; 20 > v; t(v++)) h = p & d | ~p & C;
			for (g = 1859775393; 40 > v; t(v++)) h = p ^ d ^ C;
			for (g = 2400959708; 60 > v; t(v++)) h = p & d | p & C | d & C;
			for (g = 3395469782; 80 > v; t(v++)) h = p ^ d ^ C;
			a += l,
				c += p,
				u += d,
				s += C,
				f += b
		}
		return [a, c, u, s, f]
	}
	for (var t = Math.floor((new Date).getTime() / 1e3), o = Math.floor(t / 30), n = [], a = [], c = 0, s = 0, u = 0; c < e.length;) u = 32 * u + "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(e.charAt(c++).toUpperCase()),
		(s += 5) > 31 && (n.push(Math.floor(u / (1 << (s -= 32)))), u &= 31);
	for (s && n.push(u << 32 - s), c = 0; 16 > c; ++c) a.push(1785358954 ^ (n[c] = 1549556828 ^ n[c]));
	var f = r(n.concat(r(a.concat([0, o])))),
		h = 15 & f[4];
	return ((f[h >> 2] << 8 * (3 & h) | (3 & h ? f[(h >> 2) + 1] >>> 8 * (4 - h & 3) : 0)) & -1 >>> 1) % 1e6
}
function getCode(e) {
	var r = generateCode(e).toString();
	switch (r.length) {
		case 5:
			r = "0" + r;
			break;
		case 4:
			r = "00" + r;
			break;
		case 3:
			r = "000" + r;
			break;
		case 2:
			r = "0000" + r;
			break;
		case 1:
			r = "00000" + r
	}
	return r = r.substr(0, 3) + r.substr(3, 6)
}

log(getCode("HLKJZPNLCFNKG3HI=="))