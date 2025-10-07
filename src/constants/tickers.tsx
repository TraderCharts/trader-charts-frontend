import AgroIcon from '../resources/ticker-icons/AgroIcon';
import TranIcon from '../resources/ticker-icons/TranIcon';

export interface Ticker {
    code: string;
    name: string;
    icon: React.ReactNode;
}

export const tickerList: Ticker[] = [
    {
        code: "AGRO",
        name: "(AGRO) ADECOAGRO S.A.",
        icon: <AgroIcon/>
    },
    {
        code: "TRAN",
        name: "(TRAN) CIA DE TRANSP DE ENERGIA ELECTRICA",
        icon: <TranIcon/>
    }
];