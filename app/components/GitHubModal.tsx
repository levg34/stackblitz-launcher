import { Modal, Button, FormControl } from 'react-bootstrap'
import { useState } from 'react'
import { createBoltUrl, createGithubUrl, createStackBlitzUrl } from '~/utils/utils'
import type { TargetSite } from '~/utils/targets'

interface GitHubModalProps {
    show: boolean
    handleClose: () => void
    target: TargetSite
}

export function GitHubModal({ show, handleClose, target }: GitHubModalProps) {
    const [githubUrl, setGithubUrl] = useState('')

    const handleOpenGithub = () => {
        const stackBlitzUrl = createStackBlitzUrl(githubUrl)
        const openUrl =
            target === 'StackBlitz'
                ? stackBlitzUrl
                : target === 'Bolt.new'
                ? createBoltUrl(stackBlitzUrl)
                : createGithubUrl(stackBlitzUrl)
        window.open(openUrl)
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
                    Open in {target}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
