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
import type { TargetSite } from '~/utils/targets'

const data = {
    Frontend: frontend,
    Backend: backend,
    'Full Stack': fullstack,
    Vanilla: vanilla,
    Popular: popular,
    'Mobile & VR': mobileVr,
    Documentation: docs,
    'Native Languages': nativeLanguages
}

export function FrameworkTabs() {
    const [searchTerm, setSearchTerm] = useState('')
    const [languageFilter, setLanguageFilter] = useState('')

    const [target, setTarget] = useState<TargetSite>('StackBlitz')

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
            <NavigationBar
                onSearch={setSearchTerm}
                onLanguageFilter={setLanguageFilter}
                languages={languages}
                target={target}
                setTarget={setTarget}
            />
            <Container>
                <Tab.Container defaultActiveKey="Frontend">
                    <Nav variant="tabs" className="mb-3">
                        {Object.keys(filteredData).map(
                            (key) =>
                                filteredData[key].length > 0 && (
                                    <Nav.Item key={key}>
                                        <Nav.Link eventKey={key}>{key}</Nav.Link>
                                    </Nav.Item>
                                )
                        )}
                    </Nav>
                    <Tab.Content>
                        {Object.entries(filteredData).map(
                            ([key, frameworks]) =>
                                frameworks.length > 0 && (
                                    <Tab.Pane key={key} eventKey={key}>
                                        <FrameworkGrid data={frameworks} target={target} />
                                    </Tab.Pane>
                                )
                        )}
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </>
    )
}
