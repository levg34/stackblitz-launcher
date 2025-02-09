import { Modal, Button, FormControl } from 'react-bootstrap'
import { useState } from 'react'

interface GitHubModalProps {
    show: boolean
    handleClose: () => void
}

export function GitHubModal({ show, handleClose }: GitHubModalProps) {
    const [githubUrl, setGithubUrl] = useState('')

    const handleOpenGithub = () => {
        window.open(githubUrl, '_blank')
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Open GitHub Repository</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    type="url"
                    placeholder="Enter GitHub repository URL..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleOpenGithub} disabled={!githubUrl}>
                    Open
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
