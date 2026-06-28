import { LegalPage, legalMeta } from '../pages/LegalPage';
export const meta = () => legalMeta('privacy');
export default function Privacy() { return <LegalPage doc="privacy" />; }
