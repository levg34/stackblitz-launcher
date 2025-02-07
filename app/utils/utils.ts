export function createStackBlitzUrl(githubUrl: string): string {
    // Remove 'https://github.com/' from the beginning of the URL
    const githubPath = githubUrl.replace(/^https?:\/\/github\.com\//, '')

    // Construct the StackBlitz URL
    return `https://stackblitz.com/fork/github/${githubPath}`
}

export function createBoltUrl(stackBlitzUrl: string): string {
    // Extract the GitHub path from the StackBlitz URL
    const githubPath = stackBlitzUrl.replace(/^https?:\/\/stackblitz\.com\/fork\/github\//, '')

    // Construct the Bolt URL
    return `https://bolt.new/~/github/${githubPath}`
}

export function createGithubUrl(stackBlitzUrl: string): string {
    // Extract the GitHub path from the StackBlitz URL
    const githubPath = stackBlitzUrl.replace(/^https?:\/\/stackblitz\.com\/fork\/github\//, '')

    // Construct the GitHub URL
    return `https://github.com/${githubPath}`
}
