import axios from 'axios';
import { set } from 'react-native-reanimated';

interface BookmarkManagerProps {
    userId: number;
}

interface BookmarkManagerState {
    userBookmarkedCharacters?: Set<string>;
    onCooldown?: boolean;
    userId?: number;
}

export class BookmarkManager {
    private state: BookmarkManagerState = {};

    constructor(props: BookmarkManagerProps) {
        this.getUserBookmarks(props.userId);
        this.setUserId(props.userId);
    }

    setBookmark = async (hanzis: HanziRow[] | HanziRow) => {
        const characters = Array.isArray(hanzis) ? hanzis.map((obj) => obj.simplified) : [hanzis.simplified];
        let wasAdded = false;

        if (!this.state.onCooldown) {
            const searchVals = {
                id: this.state.userId,
                characters: characters,
            };

            await axios.post('http://localhost:3001/api/stats/bookmark', searchVals).then((response) => {
                if (!response.data.error) {
                    wasAdded = response.data.bookmarks.includes(characters[0]);

                    this.setUserBookmarkedCharacters(new Set<string>(response.data.bookmarks));

                    this.setOnCooldown(true);
                    setTimeout(() => {
                        this.setOnCooldown(false);
                    }, 1000);
                }
            });
        }

        return wasAdded;
    };

    getIsHanziBookmarked = (hanzi: HanziRow): boolean => {
        return this.state.userBookmarkedCharacters?.has(hanzi.simplified) ?? false;
    };

    private getUserBookmarks = (userId: number): Set<string> => {
        axios.get(`http://localhost:3001/api/stats/${userId}`).then((response) => {
            if (response.data) {
                let bookmarkedCharacters: Set<string> = new Set(JSON.parse(response.data.bookmarkedCharacters));

                if (!bookmarkedCharacters) {
                    bookmarkedCharacters = new Set();
                }

                this.setUserBookmarkedCharacters(bookmarkedCharacters);

                return bookmarkedCharacters;
            }
        });

        return new Set<string>();
    };

    private setUserBookmarkedCharacters(bookmarkedCharacters: Set<string>): void {
        this.setState({ userBookmarkedCharacters: bookmarkedCharacters });
    }

    private setOnCooldown(onCooldown: boolean): void {
        this.setState({ onCooldown: onCooldown });
    }

    private setUserId(userId: number): void {
        this.setState({ userId: userId });
    }

    private setState(newState: Partial<BookmarkManagerState>): void {
        this.state = { ...this.state, ...newState };
    }
}
