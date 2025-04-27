import type { Component } from 'svelte';

const paths = import.meta.glob('../components/design/design_item/*.svelte', {
	eager: true
}) as Record<string, { default: Component }>;

const initialItems: Component[] = Object.values(paths).map((path) => path.default);

class DesignStore {
	designItems = $state<Component[]>([...initialItems]);

	shuffle() {
		const temp = [...this.designItems];

		for (let i = temp.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[temp[i], temp[j]] = [temp[j], temp[i]];
		}

		this.designItems = temp;
	}
}

export const designStore = new DesignStore();
