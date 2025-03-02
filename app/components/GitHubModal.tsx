import { Modal, Button, FormControl, ListGroup, Spinner, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { createStackBlitzUrl } from '~/utils/utils'

interface GitHubModalProps {
    show: boolean
    handleClose: () => void
}

export function GitHubModal({ show, handleClose }: GitHubModalProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [repositories, setRepositories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedRepo, setSelectedRepo] = useState<any>(null)
    const [path, setPath] = useState('')
    const [contents, setContents] = useState<any[]>([])

    const handleSearch = async () => {
        setLoading(true)
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
        const data = await response.json()
        setRepositories(data.items)
        setLoading(false)
    }

    const handleSelectRepository = async (repo: any) => {
        setSelectedRepo(repo)
        await fetchContents(repo.full_name, '')
    }

    const fetchContents = async (repoFullName: string, path: string) => {
        setLoading(true)
        const response = await fetch(`https://api.github.com/repos/${repoFullName}/contents/${path}`)
        const data = await response.json()
        setContents(data)
        setLoading(false)
    }

    const handleSelectPath = (item: any) => {
        if (item.type === 'dir') {
            fetchContents(selectedRepo.full_name, item.path)
            setPath(item.path)
        } else {
            const url = `https://github.com/${selectedRepo.full_name}/tree/main/${item.path}`
            window.open(createStackBlitzUrl(url))
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Open GitHub Repository</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!selectedRepo ? (
                    <>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search GitHub repositories..."
                                aria-label="Search GitHub repositories"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={handleSearch}
                                disabled={loading || !searchTerm}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                            </Button>
                        </InputGroup>
                        <ListGroup className="mt-3">
                            {repositories.map((repo) => (
                                <ListGroup.Item key={repo.id} action onClick={() => handleSelectRepository(repo)}>
                                    {repo.full_name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                ) : (
                    <>
                        <Button variant="outline-secondary" onClick={() => setSelectedRepo(null)}>
                            Back to search
                        </Button>
                        <ListGroup className="mt-3">
                            {contents.map((item) => (
                                <ListGroup.Item key={item.path} action onClick={() => handleSelectPath(item)}>
                                    {item.type === 'dir' ? '📁' : '📄'} {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
