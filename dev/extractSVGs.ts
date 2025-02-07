import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises'

const dataDir = './data'
const svgDir = './svg'

async function extractSVGs() {
    try {
        // Ensure SVG directory exists
        await fs.mkdir(svgDir, { recursive: true })

        const files = await readdir(dataDir)
        const jsonFiles = files.filter((file) => path.extname(file) === '.json')

        const extractedSVGs: { [framework: string]: string } = {} // Use an object to track extracted SVGs by framework

        for (const file of jsonFiles) {
            const filePath = path.join(dataDir, file)
            const fileContent = await readFile(filePath, 'utf-8')
            const jsonData = JSON.parse(fileContent) as {
                link: string
                framework: string
                language: string
                svg: string
            }[]

            for (const item of jsonData) {
                const framework = item.framework
                const svgContent = item.svg

                if (!extractedSVGs[framework]) {
                    extractedSVGs[framework] = svgContent // Save the SVG content
                    const svgFileName = `${framework.toLowerCase()}.svg` // change filename to lowercase to not cause issues
                    const svgFilePath = path.join(svgDir, svgFileName)
                    await writeFile(svgFilePath, svgContent)
                    console.log(`Extracted SVG for ${framework} to ${svgFilePath}`)
                } else {
                    console.log(`SVG for ${framework} already extracted, skipping duplicate.`)
                }
            }
        }

        console.log('SVG extraction complete.')
    } catch (error) {
        console.error('Error during SVG extraction:', error)
    }
}

extractSVGs()
