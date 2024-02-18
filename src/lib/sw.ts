export async function registerSW(scriptURL: string, options: RegistrationOptions) {
	try {
		const worker = await navigator.serviceWorker.getRegistration(scriptURL);
		if(!worker) await navigator.serviceWorker.register(scriptURL, options);
	} catch(error) {
		console.error("Failed to register service worker \"%s\": ", scriptURL, error);
	}
}
