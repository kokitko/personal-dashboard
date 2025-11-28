export type TabType = 'weather' | 'crypto' | 'todo' | 'currency' | 'news';

export interface Tab {
    id: TabType;
    label: string;
};

export const tabs: Tab[] = [
    { id: 'weather', label: "Weather" },
    { id: 'crypto', label: "Crypto" },
    { id: 'todo', label: "Todo" },
    { id: 'currency', label: "Currency" },
    { id: 'news', label: "News" }
];