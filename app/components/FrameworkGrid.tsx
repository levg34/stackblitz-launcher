import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import type { TargetSite } from '~/utils/targets'
import { createBoltUrl, createGithubUrl } from '~/utils/utils'

interface WithTarget {
    target: TargetSite
}

interface FrameworkCardProps {
    framework: string
    language: string
    svg: string
    link: string
}

const FrameworkCard = ({ framework, language, svg, link, target }: FrameworkCardProps & WithTarget) => (
    <Card className="h-100">
        <Card.Body className="d-flex flex-column">
            <div className="text-center mb-3" dangerouslySetInnerHTML={{ __html: svg }} />
            <Card.Title>{framework}</Card.Title>
            <Card.Text>Language: {language}</Card.Text>
            <Button
                variant="primary"
                href={
                    target === 'StackBlitz' ? link : target === 'Bolt.new' ? createBoltUrl(link) : createGithubUrl(link)
                }
                className="mt-auto"
            >
                Open in {target}
            </Button>
        </Card.Body>
    </Card>
)

interface FrameworkGridProps extends WithTarget {
    data: FrameworkCardProps[]
}

const FrameworkGrid = ({ data, target }: FrameworkGridProps) => (
    <Container className="my-4">
        <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((item, index) => (
                <Col key={index}>
                    <FrameworkCard {...item} target={target} />
                </Col>
            ))}
        </Row>
    </Container>
)

export default FrameworkGrid
