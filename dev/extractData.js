const extractFrameworkInfo = () => {
    const buttons = document.querySelectorAll('._button_ez8dz_1')
    const frameworkInfo = []

    buttons.forEach((button) => {
        const link = button.href
        const title = button.querySelector('._title_ez8dz_84').textContent
        const subtitle = button.querySelector('._subtitle_ez8dz_106').textContent
        const svgElement = button.querySelector('svg')
        const svg = svgElement ? svgElement.outerHTML : null

        frameworkInfo.push({
            link,
            framework: title,
            language: subtitle,
            svg
        })
    })

    return JSON.stringify(frameworkInfo, null, 2)
}

console.log(extractFrameworkInfo())
