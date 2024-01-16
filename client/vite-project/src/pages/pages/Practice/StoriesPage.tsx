import React, { useEffect, useState } from 'react';
import '../../styles/Practice/StoriesPage.css';
import axios from 'axios';
import {
    EN_UC_HANZI_INPUT_HINT,
    STRING_TO_URL,
} from '../../../global/Ts/Strings';
import MultiSelectDropdownButton from '../../../components/components/Buttons/MultiSelectDropdownButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function StoriesPage() {
    const [searchValue, setSearchVal] = useState('');
    const [stories, setStories] = useState<storyRow[]>([]);

    const dropdownOptions = [
        { value: '1', label: 'HSK 1' },
        { value: '2', label: 'HSK 2' },
        { value: '3', label: 'HSK 3' },
        { value: '4', label: 'HSK 4' },
        { value: '5', label: 'HSK 5' },
        { value: '6', label: 'HSK 6' },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/blocks/stories`)
            .then((response) => {
                if (response.data) {
                    const storyRows: storyRow[] = [];

                    for (const row of response.data) {
                        const parsedContents = JSON.parse(row.contents);
                        const parsedTitle = JSON.parse(row.title);
                        const parsedTags = JSON.parse(row.tags);

                        const transformedData: storyRow = {
                            id: row.id,
                            category: row.category,
                            cover: row.cover,
                            series: row.series,
                            title: {
                                title: parsedTitle.title,
                                translatedTitle: parsedTitle.translatedTitle,
                            },
                            contents: {
                                story: parsedContents.story,
                                translation: parsedContents.translation,
                            },
                            hskLevel: row.hskLevel,
                            tags: parsedTags,
                        };

                        storyRows.push(transformedData);
                    }

                    setStories(storyRows);
                }
            });
    }, []);

    useEffect(() => {
        console.log(stories);
    }, [stories]);

    const searchStory = () => {};

    const navigateToStory = (story: storyRow) => {
        const title = story.title.translatedTitle;

        if (!title) {
            return;
        }

        navigate(`/practice/stories/${STRING_TO_URL(title)}`, {
            state: {
                story: story,
            },
        });
    };

    return (
        <div className="story-page-wrapper">
            <div className="story-page-header-wrapper">
                <h1>Reading stories</h1>
                <h4>Practice reading using these stories.</h4>
            </div>
            <div className="story-page-searching-wrapper">
                <input
                    type="text"
                    placeholder={EN_UC_HANZI_INPUT_HINT}
                    onKeyDown={searchStory}
                    onChange={(e) => {
                        setSearchVal(e.target.value);
                    }}
                />
            </div>
            <div className="story-page-contents-wrapper">
                {stories.map((item) => (
                    <div
                        key={item.id}
                        className="story-grid-container"
                        data-key={item.id}
                        onClick={() => navigateToStory(item)}>
                        <p>{'HSK ' + item.hskLevel + ' difficulty'}</p>
                        <p>{item.title.translatedTitle}</p>
                        <p>{item.title.title}</p>
                        <div className="story-read-me">
                            <p>Read story</p>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="story-read-me-icon"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoriesPage;
