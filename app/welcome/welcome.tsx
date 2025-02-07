import { Container } from 'react-bootstrap'
import FrameworkGrid from '~/components/FrameworkGrid'
import frontend from '../../data/frontend.json'

export function Welcome() {
    return (
        <Container>
            <FrameworkGrid data={frontend}/>
        </Container>
    )
}
