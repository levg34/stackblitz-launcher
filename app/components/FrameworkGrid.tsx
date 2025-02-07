import { Container, Row, Col, Card, Button } from 'react-bootstrap'

interface FrameworkCardProps {
    framework: string
    language: string
    svg: string
    link: string
}

const FrameworkCard = ({ framework, language, svg, link }: FrameworkCardProps) => (
    <Card className="h-100">
        <Card.Body className="d-flex flex-column">
            <div className="text-center mb-3" dangerouslySetInnerHTML={{ __html: svg }} />
            <Card.Title>{framework}</Card.Title>
            <Card.Text>Language: {language}</Card.Text>
            <Button variant="primary" href={link} className="mt-auto">
                Open in StackBlitz
            </Button>
        </Card.Body>
    </Card>
)

interface FrameworkGridProps {
    data: FrameworkCardProps[]
}

const FrameworkGrid = ({ data }: FrameworkGridProps) => (
    <Container className="my-4">
        <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((item, index) => (
                <Col key={index}>
                    <FrameworkCard {...item} />
                </Col>
            ))}
        </Row>
    </Container>
)

export default FrameworkGrid
