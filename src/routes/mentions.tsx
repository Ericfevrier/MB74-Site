import { LegalPage, legalMeta } from '../pages/LegalPage';
export const meta = () => legalMeta('mentions');
export default function Mentions() { return <LegalPage doc="mentions" />; }
