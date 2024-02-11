import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../stories-hub/stories-page.css';
import axios from 'axios';
import CharacterAnnotation from '../../../../components/stories/character-annotation-box/CharacterAnnotation';

function StoryViewPage() {
    const location = useLocation();
    const { state: storyState } = location;
    const [story, setStory] = useState<storyRow>();
    const [showTranslation, setShowTranslation] = useState<boolean>(false);

    useEffect(() => {
        setStory(storyState.story);
    }, [storyState]);

    return (
        <div className="article-wrapper">
            <div className="article-title-div">
                <h1 className="article-title">{story?.title.translatedTitle}</h1>
                <h3 className="article-subtitle-div">{story?.title.title}</h3>
            </div>
            <div className="article-main-contents">
                <div className="table-of-contents-wrapper">
                    <div className="table-of-contents">
                        <p className="article-tab-header">Details</p>
                        <p>tags: {story?.tags.join(', ') ?? 'none'}</p>
                    </div>
                </div>
                <div className="article-body-wrapper">
                    <div className="article-body article-body-story-font">
                        <CharacterAnnotation chineseWords={story?.contents.story ?? ''} />
                        <button className="translation-button" onClick={() => setShowTranslation(!showTranslation)}>
                            Show translation
                        </button>
                        <div className="translated-contents">{showTranslation && story?.contents.translation}</div>
                    </div>
                </div>
                <div className="article-ads-wrapper">
                    <div className="article-ads"></div>
                </div>
            </div>
        </div>
    );
}

export default StoryViewPage;
