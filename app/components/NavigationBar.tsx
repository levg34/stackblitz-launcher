import { Container, Navbar, Form, FormControl, Dropdown, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { GitHubModal } from './GitHubModal'

interface NavigationBarProps {
    onSearch: (term: string) => void
    onLanguageFilter: (language: string) => void
    languages: string[]
}

export function NavigationBar({ onSearch, onLanguageFilter, languages }: NavigationBarProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('All Languages')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        onSearch(searchTerm)
    }, [searchTerm, onSearch])

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language)
        onLanguageFilter(language === 'All Languages' ? '' : language)
    }

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand>StackBlitz Launcher</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleOpenModal}>Open GitHub repository</Nav.Link>
                        </Nav>
                        <Form className="d-flex align-items-center gap-2 ms-auto">
                            <FormControl
                                type="search"
                                placeholder="Search frameworks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary">{selectedLanguage}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleLanguageSelect('All Languages')}
                                        active={selectedLanguage === 'All Languages'}
                                    >
                                        All Languages
                                    </Dropdown.Item>
                                    {languages.map((lang) => (
                                        <Dropdown.Item
                                            key={lang}
                                            onClick={() => handleLanguageSelect(lang)}
                                            active={selectedLanguage === lang}
                                        >
                                            {lang}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <GitHubModal show={showModal} handleClose={handleCloseModal} />
        </>
    )
}
