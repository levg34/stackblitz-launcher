import type { Route } from './+types/home'
import { Welcome } from '../welcome/welcome'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'StackBlitz launcher' },
        { name: 'description', content: 'StackBlitz laucher to launch starters (Solid, Svelte, etc).' }
    ]
}

export default function Home() {
    return <Welcome />
}
