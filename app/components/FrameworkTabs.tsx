import { Container, Nav, Tab } from 'react-bootstrap'
import { useState, useMemo } from 'react'
import FrameworkGrid from './FrameworkGrid'
import { NavigationBar } from './NavigationBar'
import frontend from '../../data/frontend.json'
import backend from '../../data/backend.json'
import docs from '../../data/docs.json'
import fullstack from '../../data/fullstack.json'
import mobileVr from '../../data/mobile-vr.json'
import nativeLanguages from '../../data/native-languages.json'
import popular from '../../data/popular.json'
import vanilla from '../../data/vanilla.json'

const data = {
    Frontend: frontend,
    Backend: backend,
    Documentation: docs,
    'Full Stack': fullstack,
    'Mobile & VR': mobileVr,
    'Native Languages': nativeLanguages,
    Popular: popular,
    Vanilla: vanilla
}

export function FrameworkTabs() {
    const [searchTerm, setSearchTerm] = useState('')
    const [languageFilter, setLanguageFilter] = useState('')

    // Get unique languages from all frameworks
    const languages = useMemo(() => {
        const languageSet = new Set<string>()
        Object.values(data).forEach((frameworks) => {
            frameworks.forEach((framework) => {
                languageSet.add(framework.language)
            })
        })
        return Array.from(languageSet).sort()
    }, [])

    // Filter frameworks based on search term and language
    const filteredData = useMemo(() => {
        const filtered: Record<string, any> = {}
        Object.entries(data).forEach(([key, frameworks]) => {
            filtered[key] = frameworks.filter((framework) => {
                const matchesSearch =
                    searchTerm === '' ||
                    framework.framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    framework.language.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesLanguage = languageFilter === '' || framework.language === languageFilter
                return matchesSearch && matchesLanguage
            })
        })
        return filtered
    }, [searchTerm, languageFilter])

    return (
        <>
            <NavigationBar onSearch={setSearchTerm} onLanguageFilter={setLanguageFilter} languages={languages} />
            <Container>
                <Tab.Container defaultActiveKey="Frontend">
                    <Nav variant="tabs" className="mb-3">
                        {Object.keys(data).map((key) => (
                            <Nav.Item key={key}>
                                <Nav.Link eventKey={key}>{key}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Tab.Content>
                        {Object.entries(filteredData).map(([key, frameworks]) => (
                            <Tab.Pane key={key} eventKey={key}>
                                <FrameworkGrid data={frameworks} />
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </>
    )
}
