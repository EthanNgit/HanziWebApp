interface storyRow {
    id: number;
    category: string;
    cover?: string;
    series?: string;
    title?: { title: string; translatedTitle: string };
    contents: { story: string; pinyin?: string; translation: string };
    hskLevel: number;
    tags?: string[];
}
