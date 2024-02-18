import { searchEngine, proxy } from "./state";
var search: string | null;
var proxy_: string | null;

searchEngine.subscribe(v => search = v);
proxy.subscribe(v => proxy_ = v);

function searchurl(url: string) {
	switch (search) {
		case "ddg":
			return `https://duckduckgo.com/?q=${url}`;
		case "brave":
			return `https://search.brave.com/search?q=${url}`;
		default:
		case "google":
			return `https://www.google.com/search?q=${url}`;
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
}

export default function resolveURL(query: string) {
	const url = !isUrl(query) ?
		searchurl(query) :
		(!(query.startsWith("https://") || query.startsWith("http://")) ? "http://" + query : query);
	switch(proxy_) {
		case "dy":
			// @ts-ignore
			return "/dynamic~service/" + Ultraviolet.codec.xor.encode(url);
		default:
		case "uv":
			// @ts-ignore
			return  __uv$config.prefix + __uv$config.encodeUrl(url);
	}
}