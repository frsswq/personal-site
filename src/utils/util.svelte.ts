let pathname: string = window.location.pathname;

window.addEventListener('popstate', () => {
	pathname = window.location.pathname;
});
