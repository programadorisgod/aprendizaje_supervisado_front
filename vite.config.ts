import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve:{
		alias:{
			'$components': '/src/lib/components',
			'$lib': '/src/lib/',
			'$stores': '/src/lib/stores'
		}
	}
});
