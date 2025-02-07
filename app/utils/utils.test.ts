import { expect, test, describe } from 'bun:test'
import { createStackBlitzUrl, createBoltUrl, createGithubUrl } from './utils'

describe('URL creation functions', () => {
    test('createStackBlitzUrl', () => {
        const githubUrl = 'https://github.com/solidjs/templates/tree/master/js'
        const result = createStackBlitzUrl(githubUrl)
        expect(result).toBe('https://stackblitz.com/fork/github/solidjs/templates/tree/master/js')
    })

    test('createBoltUrl', () => {
        const stackBlitzUrl = 'https://stackblitz.com/fork/github/solidjs/templates/tree/master/js'
        const result = createBoltUrl(stackBlitzUrl)
        expect(result).toBe('https://bolt.new/~/github/solidjs/templates/tree/master/js')
    })

    test('createGithubUrl', () => {
        const stackBlitzUrl = 'https://stackblitz.com/fork/github/solidjs/templates/tree/master/js'
        const result = createGithubUrl(stackBlitzUrl)
        expect(result).toBe('https://github.com/solidjs/templates/tree/master/js')
    })
})
