
const uaMatch = (function( ua ) {
	ua = ua.toLowerCase();

	const browser = /(chrome)[ \/]([\w.]+)/               .exec( ua ) ||
				  /(webkit)[ \/]([\w.]+)/               .exec( ua ) ||
				  /(opera)(?:.*version|)[ \/]([\w.]+)/  .exec( ua ) ||
				  /(msie) ([\w.]+)/                     .exec( ua ) ||
				  ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
				  [];

	const os = /(windows) nt ([\d\.]+)?/    .exec(ua) ||
			 /(mac) os ?x? ?([\d_\.]+)?/  .exec(ua) ||
			 /(android) ?([\d\.]+)/       .exec(ua) ||
			 /(linux) ?([\d\.]+)?/        .exec(ua) ||
			 /(ipod|iphone|ipad)/		  .exec(ua) ||
			 [];

	const osVersion = (os[ 2 ]||'').replace(/_/g,'.');

	return {
		browser:        browser[ 1 ] || '',
		browserVersion: browser[ 2 ] || '',
		os:             os[ 1 ]||'',
		osVersion,
	};
})(navigator.userAgent);



for(let key in uaMatch){
	if(!uaMatch[key]) continue;
    document.documentElement.setAttribute(`data-${key.replace(/[A-Z]/g,a=>`-${a.toLocaleLowerCase()}`)}`,uaMatch[key]);
}
