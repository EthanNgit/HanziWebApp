import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { Validator } from '../../../scripts/Validator';
import { EN_UP_ADD_BOOKMARK, EN_UP_REMOVE_BOOKMARK } from '../../../global/Strings';

interface AnnotationBoxProps {
    annotationData: HanziRow | null;
    isBookmarked: boolean | null;
    position: { top: number; left: number };
}

const AnnotationBox: React.FC<AnnotationBoxProps> = ({ annotationData, isBookmarked, position }) => {
    const validator = new Validator();

    return (
        <>
            {annotationData && (
                <div
                    className="annotation-tooltip"
                    style={{
                        top: position.top,
                        left: position.left,
                    }}>
                    <div className="annotation-top-info">
                        <p>
                            {annotationData.simplified} ({annotationData.pinyin})
                        </p>
                        <p>HSK: {annotationData.hskLevel}</p>
                    </div>

                    <p>{validator.formatDefinition(annotationData.definition)}</p>
                    <div className="annotation-bottom-info">
                        {!isBookmarked ? (
                            <>
                                <FontAwesomeIcon icon={faBookmarkEmpty} className="annotation-icon" />
                                <p>{EN_UP_ADD_BOOKMARK}</p>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faBookmarkSolid} className="annotation-icon" />
                                <p>{EN_UP_REMOVE_BOOKMARK}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AnnotationBox;
