// Common
export const EN_UC_WEBSITE_NAME = 'Hanzi site';
export const EN_UC_ABOUT_HEADER = 'About';
export const EN_UC_DETAILS_HEADER = 'Details';
export const EN_UC_HSK_HEADER = 'HSK';
export const EN_UC_LOGIN_HEADER = 'Login';
export const EN_UC_REGISTER_HEADER = 'Register';
export const EN_UC_REVIEW_HEADER = 'Review';
export const EN_UC_CONFIRM_HEADER = 'Confirm';
export const EN_UC_HINT_HEADER = 'Hint';
export const EN_UC_SUBMIT_HEADER = 'Submit';
export const EN_UC_LEAVE_HEADER = 'Leave';
export const EN_UC_START_HEADER = 'Start';
export const EN_UC_STOP_HEADER = 'Stay';
export const EN_UC_YES_HEADER = 'Yes';
export const EN_UC_NO_HEADER = 'No';
export const EN_UC_OPTIONS_HEADER = 'Options';
export const EN_LC_LOADING_TEXT = 'loading...';
export const EN_UC_TRADITIONAL_TEXT = 'Traditional';
export const EN_UC_SIMPLIFIED_TEXT = 'Simplified';
export const EN_UC_LEVEL_OF_MASTERY = (hskLevel: number) => {
    switch (hskLevel) {
        case 1:
            return 'Novice';
        case 2:
            return 'Intermediate';
        case 3:
            return 'Proficient';
        case 4:
            return 'Advanced';
        case 5:
            return 'Scholar';
        case 6:
            return 'Master';
        default:
            if (hskLevel >= 7) {
                return 'Grandmaster';
            }
            return 'None';
    }
};

// Page not found page
export const EN_UC_PNC_HEADER = 'Page not found';
export const EN_UC_PNC_DESCRIPTION = 'You may have mistyped the address or the page may have moved.';
export const EN_UC_PNC_RETURN = 'Return home';

// Intro page
export const EN_UC_INTRO_CALL_TO_ACTION_1 = 'Start your hanzi adventure today.';
export const EN_UC_INTRO_CALL_TO_ACTION_2 = 'Hanzi made easy.';
export const EN_UC_INTRO_SIGN_UP = 'Sign up free';

// Nav bar
export const EN_UC_SETTINGS = 'Settings';
export const EN_UC_LOGOUT = 'Logout';
export const EN_UC_SIGN_UP = 'Sign up';
export const EN_UC_LEARN = 'Learn';
export const EN_UC_PRACTICE = 'Practice';

// Login & Register page
export const EN_UC_REMEMBER_ME = 'Remember me?';
export const EN_UC_FORGOT_PASSWORD = 'Forgot password?';
export const EN_UC_RESET_PASSWORD = 'Reset password';
export const EN_UC_NO_ACCOUNT = "Don't have an account?";
export const EN_UC_YES_ACCOUNT = 'Already have an account?';
export const EN_UC_SEND_CODE = 'Send code';
export const EN_UC_RESEND_CODE = 'Resend code?';
export const EN_UC_KNOW_PASSWORD = 'Already know your password?';
export const EN_UC_I_AGREE_START = 'I agree to the';
export const EN_UC_I_AGREE_END = 'Terms of Service';

// Dashboard page

// Learn page
export const EN_UC_MAIN_LESSON_HEADER = 'Main Course';
export const EN_UC_LEARN_HANZI_HEADER = 'Learn hanzi';
export const EN_UC_LEARN_HANZI_DYNAMIC_DESCRIPTION = (hskLevel: number) => {
    return `Learn all HSK ${hskLevel} words and vocabulary. This is recommended to take prior to taking other lessons.`;
};
export const EN_UC_LEARN_HSK_HEADER = 'Learn HSK';
export const EN_UC_REVIEW_HANZI_HEADER = 'Review hanzi';
export const EN_UC_REVIEW_HANZI_DYNAMIC_HEADER = (reviewItems: number) => {
    return `Review ${reviewItems} hanzi`;
};
export const EN_UC_HANZI_DYNAMIC_HEADER = (reviewItems: number) => {
    return `${reviewItems} hanzi`;
};
export const EN_UC_REVIEW_HANZI_EMPTY_HEADER = 'No hanzi to review';
export const EN_UC_LEARN_HANZI_DYNAMIC_HEADER = (hskLevel: number) => {
    return `Learn HSK ${hskLevel}`;
};
export const EN_UC_REVIEW_HANZI_DESCRIPTION = 'Reviews words that you have not mastered yet. Review works on spaced repitition.';
export const EN_UC_ALL_LESSONS_HEADER = 'All lessons';
export const EN_UC_LESSONS_DYNAMIC_HEADER = (hskLevel: number) => {
    return `HSK ${hskLevel} lessons`;
};

// Hanzi page
export const EN_UC_HSK_LEVEL_HEADER = 'HSK level';
export const EN_UC_SPEECH_TYPE_HEADER = 'Part of speech';
export const EN_UC_PRIMARY_RADICAL_HEADER = 'Primary radical';
export const EN_UC_COMMON_WORDS_HEADER = 'Common words';
export const EN_UC_OTHER_PRONUNCIATIONS_HEADER = 'Other pronunciations';
export const EN_UC_STROKE_ORDER_HEADER_HEADER = 'Stroke order of';
export const EN_UC_SENTENCES_HEADER = 'Sentences with';
export const EN_LC_STROKES_HEADER = 'strokes';

// Review page
export const EN_UC_HANZI_INPUT_HINT = 'Enter pinyin or hanzi';
export const EN_UC_REVIEW_COMPLETE = 'Review complete';
export const EN_UC_REVIEW_COMPLETE_DESCRIPTION = 'The hanzi reviewed will be queued for review again.';
export const EN_UC_REVIEW_LEAVE_DESCRIPTION = 'Leaving now will reset progress and these items will not be queued for review.';
export const EN_UC_REVIEW_CONTINUE_DESCRIPTION = 'These hanzi will now show up in the review section. Continuing will start a new session with new hanzi. It is recommended to pace yourself.';
export const EN_UC_LEAVE_REVIEW = 'Leave review?';
export const EN_UC_HANZI_REDIRECTION_DESCRIPTION = 'Continue to the review? You will be questioned on the hanzi.';

// Practice page
export const EN_UC_PINYIN_PRACTICE_HEADER = 'Pinyin to hanzi practice';
export const EN_UC_CHARACTER_PRACTICE_HEADER = 'Hanzi to pinyin practice';
export const EN_UC_TRADITIONAL_PRACTICE_HEADER = 'Traditional character practice';
export const EN_UC_STORIES_PRACTICE_HEADER = 'Stories';
export const EN_UC_SENTENCES_PRACTICE_HEADER = 'Sentences';
export const EN_UC_WRITING_PRACTICE_HEADER = 'Writing';
export const EN_UC_GRAMMAR_PRACTICE_HEADER = 'Grammar';
export const EN_UC_STORIES_PRACTICE_DESCRIPTION = 'Practice reading and listening comprehension through stories.';
export const EN_UC_SENTENCES_PRACTICE_DESCRIPTION = 'Practice reading and listening comprehension with sentences.';
export const EN_UC_WRITING_PRACTICE_DESCRIPTION = 'Practice stroke order of hanzi.';
export const EN_UC_GRAMMAR_PRACTICE_DESCRIPTION = 'Review grammar rules.';

// Finish lesson button
export const EN_UC_FINISH_LESSON_HEADER = 'Finish lesson';

// HSK dropdown
export const EN_UP_HANZI_DROPDOWN_HINT = 'Options included';
export const EN_UP_HSK_TO_PRACTICE_HEADER = 'HSK to practice';
export const EN_UP_SELECT_HSK_HEADER = 'Select HSK';

// Bookmarking
export const EN_UP_ADD_BOOKMARK = 'click to add bookmark';
export const EN_UP_REMOVE_BOOKMARK = 'click to remove bookmark';

// APIS
export const API_LOGIN_URL = 'http://localhost:3001/api/login';
export const API_REGISTER_URL = 'http://localhost:3001/api/register';
export const API_PASSWORD_RESET_URL = 'http://localhost:3001/api/reset/reset-password';
export const API_PASSWORD_RESET_SEND_URL = 'http://localhost:3001/api/reset/send';
export const API_PASSWORD_RESET_VERIFY_URL = 'http://localhost:3001/api/reset/verify';
export const API_COMPLETED_LESSONS_URL = 'http://localhost:3001/api/stats/completed-lessons';
export const API_GET_LESSONS_URL = 'http://localhost:3001/api/lessons';
export const API_CALCULATE_LEVEL_URL = 'http://localhost:3001/api/stats/calculate-level';
export const API_USER_STATS_URL = (userID: number) => {
    return `http://localhost:3001/api/stats/${userID}`;
};
export const API_TTS_URL = 'http://localhost:3001/api/tts';
export const API_PRACTICE_CALCULATE_HANZI_COUNT_URL = 'http://localhost:3001/api/hanzi/get/practice-hanzi/min-weight';
export const API_PRACTICE_BOOKMARK_CALCULATE_HANZI_COUNT_URL = 'http://localhost:3001/api/hanzi/get/bookmark-practice-hanzi/min-weight';
export const API_PRACTICE_MEASURE_COUNT_URL = 'http://localhost:3001/api/hanzi/get/measure-words/min-weight';
export const API_USER_STATS_UPDATE_SRS = 'http://localhost:3001/api/stats/update-srs';
export const API_GET_HANZI_BY_IDS = 'http://localhost:3001/api/hanzi/get/find-all-by-ids';

// Nav endpoints
export const STRING_TO_URL = (urlName: string) => {
    let cleanedString = urlName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/'/g, '')
        .toLowerCase()
        .trim();

    cleanedString = cleanedString.replace(/\s+/g, '-');

    cleanedString = encodeURIComponent(cleanedString);

    return cleanedString;
};
export const NAV_HOME_URL = '/';
export const NAV_LEARN_URL = '/learn';
export const NAV_PRACTICE_URL = '/practice';
export const NAV_LOGIN_URL = '/login';
export const NAV_REGISTER_URL = '/register';
export const NAV_DASHBOARD_URL = '/dashboard';
export const NAV_REVIEW_URL = '/hanzi/review';
export const NAV_HANZI_PAGE_URL = (hanziId: number | string) => {
    return `/hanzi/${hanziId}`;
};
export const NAV_LESSON_URL = (lessonName: string) => {
    return `/learn/${STRING_TO_URL(lessonName)}`;
};
//TODO: Get NAVBAR MAIN SETUP
